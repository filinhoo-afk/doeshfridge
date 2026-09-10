import Ionicons from '@expo/vector-icons/Ionicons';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
  type ExpoSpeechRecognitionErrorCode,
} from 'expo-speech-recognition';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { DraftRow } from '@/components/draft-row';
import { EmptyState } from '@/components/empty-state';
import { IngredientSearch } from '@/components/ingredient-search';
import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { RECOGNITION_HINTS } from '@/lib/ingredient-index';
import { formatProducts } from '@/lib/format';
import { mergeDuplicates, parseSpeech } from '@/lib/parse-speech';
import { useFridge, type DraftItem } from '@/store/fridge';

type Phase = 'idle' | 'recording' | 'review';

/** Сколько названий отдаём распознавателю как подсказки. Больше Android игнорирует. */
const MAX_HINTS = 100;

const ERROR_MESSAGES: Partial<Record<ExpoSpeechRecognitionErrorCode, string>> = {
  'not-allowed': 'Нет доступа к микрофону. Разрешите его в настройках приложения.',
  'no-speech': 'Ничего не услышал. Попробуйте ещё раз, ближе к микрофону.',
  'audio-capture': 'Микрофон занят другим приложением.',
  'language-not-supported':
    'Русский язык не установлен в распознавании речи. Откройте «Речевые сервисы Google» и добавьте русский.',
  'service-not-allowed':
    'Распознавание речи недоступно. Проверьте, что установлены и включены «Речевые сервисы Google».',
  network: 'Нет связи с сервисом распознавания. Проверьте интернет.',
  busy: 'Распознавание уже запущено. Подождите пару секунд.',
};

function errorMessage(code: ExpoSpeechRecognitionErrorCode, fallback: string): string {
  return ERROR_MESSAGES[code] ?? fallback;
}

export default function VoiceScreen() {
  const router = useRouter();
  const theme = useTheme();
  const addItems = useFridge((state) => state.addItems);

  const [phase, setPhase] = useState<Phase>('idle');
  const [transcript, setTranscript] = useState('');
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [unrecognized, setUnrecognized] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Обработчик события `end` живёт в замыкании и не увидит свежий стейт,
  // поэтому текст дублируем в ref.
  const finalTranscript = useRef('');
  const latestTranscript = useRef('');

  const alreadyAdded = useMemo(
    () => new Set(drafts.map((draft) => draft.ingredientId)),
    [drafts],
  );

  useSpeechRecognitionEvent('start', () => setPhase('recording'));

  useSpeechRecognitionEvent('result', (event) => {
    const text = event.results[0]?.transcript ?? '';
    const combined = `${finalTranscript.current} ${text}`.trim();

    if (event.isFinal) {
      finalTranscript.current = combined;
    }
    latestTranscript.current = combined;
    setTranscript(combined);
  });

  useSpeechRecognitionEvent('error', (event) => {
    setError(errorMessage(event.error, event.message));
  });

  useSpeechRecognitionEvent('end', () => {
    const result = parseSpeech(latestTranscript.current);
    // Новый подход к микрофону дополняет список, а не заменяет его: типичный
    // сценарий — продиктовал, увидел список, вспомнил ещё продукт. Лишнее
    // убирается крестиком на карточке, а вот потерянное вернуть уже нечем.
    setDrafts((current) => mergeDuplicates([...current, ...result.items]));
    setUnrecognized((current) => [...current, ...result.unrecognized]);
    setPhase('review');
  });

  const start = useCallback(async () => {
    setError(null);
    setTranscript('');
    finalTranscript.current = '';
    latestTranscript.current = '';

    if (!ExpoSpeechRecognitionModule.isRecognitionAvailable()) {
      setError(
        'На этом устройстве нет распознавания речи. Установите «Речевые сервисы Google» — или добавьте продукты вручную.',
      );
      setPhase('review');
      return;
    }

    const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!permission.granted) {
      setError('Нужен доступ к микрофону. Разрешите его в настройках приложения.');
      setPhase('review');
      return;
    }

    // `continuous` не поддерживается на Android 12 и ниже: там распознавание
    // остановится само после первой фразы, придёт `end`, и мы просто перейдём
    // к подтверждению. Продиктованное не теряется, при необходимости
    // пользователь дописывает остальное кнопкой «Продиктовать ещё».
    ExpoSpeechRecognitionModule.start({
      lang: 'ru-RU',
      interimResults: true,
      continuous: true,
      contextualStrings: RECOGNITION_HINTS.slice(0, MAX_HINTS),
    });
  }, []);

  useEffect(() => {
    return () => {
      ExpoSpeechRecognitionModule.abort();
    };
  }, []);

  const submit = () => {
    if (drafts.length > 0) {
      addItems(drafts);
    }
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.screen, { backgroundColor: theme.background }]}>
      {phase === 'review' ? (
        <ReviewPhase
          drafts={drafts}
          unrecognized={unrecognized}
          error={error}
          alreadyAdded={alreadyAdded}
          transcript={transcript}
          onChangeDraft={(index, next) =>
            setDrafts((current) => current.map((draft, i) => (i === index ? next : draft)))
          }
          onRemoveDraft={(index) =>
            setDrafts((current) => current.filter((_, i) => i !== index))
          }
          onAddManual={(ingredientId) =>
            setDrafts((current) => [...current, { ingredientId, quantity: null, unit: null }])
          }
          onDismissUnrecognized={(index) =>
            setUnrecognized((current) => current.filter((_, i) => i !== index))
          }
          onRecordMore={start}
          onSubmit={submit}
        />
      ) : (
        <RecordPhase
          phase={phase}
          transcript={transcript}
          onStart={start}
          onStop={() => ExpoSpeechRecognitionModule.stop()}
        />
      )}
    </KeyboardAvoidingView>
  );
}

function RecordPhase({
  phase,
  transcript,
  onStart,
  onStop,
}: {
  phase: Phase;
  transcript: string;
  onStart: () => void;
  onStop: () => void;
}) {
  const theme = useTheme();
  const recording = phase === 'recording';
  // useState, а не useRef: значение анимации нужно создать один раз, но читать
  // ref во время рендера нельзя (React Compiler справедливо на это ругается).
  const [pulse] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (!recording) {
      pulse.setValue(1);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.15, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [recording, pulse]);

  return (
    <View style={styles.recordScreen}>
      <View style={styles.transcriptArea}>
        {transcript ? (
          <ThemedText type="subtitle" style={styles.transcript}>
            {transcript}
          </ThemedText>
        ) : (
          <ThemedText type="small" themeColor="textSecondary" style={styles.transcript}>
            {recording
              ? 'Слушаю…'
              : 'Перечислите продукты вслух — можно одним предложением:\n«молоко, три яйца, помидоры и куриное филе»'}
          </ThemedText>
        )}
      </View>

      <Animated.View style={{ transform: [{ scale: pulse }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={recording ? 'Остановить запись' : 'Начать запись'}
          onPress={recording ? onStop : onStart}
          style={({ pressed }) => [
            styles.micButton,
            { backgroundColor: recording ? theme.danger : theme.accent, opacity: pressed ? 0.8 : 1 },
          ]}>
          <Ionicons name={recording ? 'stop' : 'mic'} size={40} color={theme.onAccent} />
        </Pressable>
      </Animated.View>

      <ThemedText type="small" themeColor="textSecondary">
        {recording ? 'Нажмите, когда закончите' : 'Нажмите и говорите'}
      </ThemedText>
    </View>
  );
}

function ReviewPhase({
  drafts,
  unrecognized,
  error,
  alreadyAdded,
  transcript,
  onChangeDraft,
  onRemoveDraft,
  onAddManual,
  onDismissUnrecognized,
  onRecordMore,
  onSubmit,
}: {
  drafts: DraftItem[];
  unrecognized: string[];
  error: string | null;
  alreadyAdded: ReadonlySet<string>;
  transcript: string;
  onChangeDraft: (index: number, next: DraftItem) => void;
  onRemoveDraft: (index: number) => void;
  onAddManual: (ingredientId: string) => void;
  onDismissUnrecognized: (index: number) => void;
  onRecordMore: () => void;
  onSubmit: () => void;
}) {
  const theme = useTheme();

  return (
    <>
      <ScrollView contentContainerStyle={styles.reviewContent} keyboardShouldPersistTaps="handled">
        {error ? (
          <View style={[styles.banner, { backgroundColor: theme.backgroundDanger }]}>
            <Ionicons name="alert-circle" size={20} color={theme.danger} />
            <ThemedText type="small" style={[styles.bannerText, { color: theme.danger }]}>
              {error}
            </ThemedText>
          </View>
        ) : null}

        {transcript ? (
          <View style={[styles.banner, { backgroundColor: theme.backgroundElement }]}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={theme.textSecondary} />
            <ThemedText type="small" themeColor="textSecondary" style={styles.bannerText}>
              {transcript}
            </ThemedText>
          </View>
        ) : null}

        {drafts.length > 0 ? (
          <>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
              {/* Не «распознано»: в списке лежит и то, что добавлено руками. */}
              В СПИСКЕ — {formatProducts(drafts.length).toUpperCase()}
            </ThemedText>
            <View style={styles.draftList}>
              {drafts.map((draft, index) => (
                <DraftRow
                  key={draft.ingredientId}
                  draft={draft}
                  onChange={(next) => onChangeDraft(index, next)}
                  onRemove={() => onRemoveDraft(index)}
                />
              ))}
            </View>
          </>
        ) : (
          <EmptyState
            icon="help-circle-outline"
            title="Ничего не распознал"
            description="Попробуйте продиктовать ещё раз или добавьте продукты вручную через поиск ниже."
          />
        )}

        {unrecognized.length > 0 ? (
          <View style={styles.unrecognized}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
              НЕ ПОНЯЛ
            </ThemedText>
            <View style={styles.chips}>
              {unrecognized.map((phrase, index) => (
                <Pressable
                  key={phrase}
                  accessibilityRole="button"
                  accessibilityLabel={`Убрать «${phrase}»`}
                  onPress={() => onDismissUnrecognized(index)}
                  style={[styles.chip, { backgroundColor: theme.backgroundWarning }]}>
                  <ThemedText type="small" style={{ color: theme.warning }}>
                    {phrase}
                  </ThemedText>
                  <Ionicons name="close" size={14} color={theme.warning} />
                </Pressable>
              ))}
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              Найдите эти продукты в поиске ниже или уберите, нажав на них.
            </ThemedText>
          </View>
        ) : null}

        <IngredientSearch onPick={onAddManual} exclude={alreadyAdded} />
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <PrimaryButton
          title="Продиктовать ещё"
          icon="mic-outline"
          variant="outline"
          onPress={onRecordMore}
        />
        <PrimaryButton
          title={drafts.length > 0 ? `Добавить ${formatProducts(drafts.length)}` : 'Готово'}
          icon="checkmark"
          onPress={onSubmit}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  recordScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
    padding: Spacing.four,
  },
  transcriptArea: {
    minHeight: 140,
    justifyContent: 'center',
  },
  transcript: {
    textAlign: 'center',
  },
  micButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewContent: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  bannerText: {
    flex: 1,
  },
  sectionTitle: {
    letterSpacing: 0.6,
  },
  draftList: {
    gap: Spacing.two,
  },
  unrecognized: {
    gap: Spacing.two,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderRadius: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  footer: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
