import Ionicons from '@expo/vector-icons/Ionicons';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
  type ExpoSpeechRecognitionErrorCode,
} from 'expo-speech-recognition';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DraftRow } from '@/components/draft-row';
import { EmptyState } from '@/components/empty-state';
import { IngredientSearch } from '@/components/ingredient-search';
import { ListGroup } from '@/components/list-group';
import { PrimaryButton } from '@/components/primary-button';
import { Tag } from '@/components/tag';
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

/** Пример фразы на экране записи: показывает, что можно с количествами и без запятых. */
const EXAMPLE = ['молоко', 'три яйца', 'помидоры', 'куриное филе'];

const MIC_SIZE = 96;
const HALO_SIZE = 168;

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
  // «Добавить вручную» из холодильника: микрофон не нужен — сразу к списку и поиску.
  // Состояние, а не константа: передумать можно и на экране записи.
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const [manual, setManual] = useState(mode === 'manual');

  const [phase, setPhase] = useState<Phase>(manual ? 'review' : 'idle');
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
          manual={manual}
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
          onManual={() => {
            setManual(true);
            setPhase('review');
          }}
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
  onManual,
}: {
  phase: Phase;
  transcript: string;
  onStart: () => void;
  onStop: () => void;
  onManual: () => void;
}) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const recording = phase === 'recording';
  // useState, а не useRef: значение анимации нужно создать один раз, но читать
  // ref во время рендера нельзя (React Compiler справедливо на это ругается).
  const [ripple] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!recording) {
      ripple.setValue(0);
      return;
    }

    // Волна расходится от кнопки и гаснет: видно, что микрофон слушает,
    // а сама кнопка стоит на месте и в неё легко попасть.
    const animation = Animated.loop(
      Animated.timing(ripple, {
        toValue: 1,
        duration: 1400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    );
    animation.start();

    return () => animation.stop();
  }, [recording, ripple]);

  const rippleStyle = {
    opacity: ripple.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] }),
    transform: [
      { scale: ripple.interpolate({ inputRange: [0, 1], outputRange: [MIC_SIZE / HALO_SIZE, 1] }) },
    ],
  };

  return (
    <View style={[styles.recordScreen, { paddingBottom: insets.bottom + Spacing.three }]}>
      {/* Прокрутка — для длинной диктовки: иначе текст наезжает на кнопку микрофона. */}
      <ScrollView style={styles.transcriptArea} contentContainerStyle={styles.transcriptContent}>
        {transcript ? (
          <View style={[styles.transcriptCard, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="subtitle" style={styles.centered}>
              {transcript}
            </ThemedText>
          </View>
        ) : recording ? (
          <ThemedText type="subtitle" themeColor="textSecondary" style={styles.centered}>
            Слушаю…
          </ThemedText>
        ) : (
          <View style={styles.hint}>
            <ThemedText type="subtitle" style={styles.centered}>
              Перечислите продукты вслух
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.centered}>
              Одним предложением, с количеством или без. Например:
            </ThemedText>
            {/* Не TagRow: тот прижимает метки влево, а здесь всё по центру. */}
            <View style={styles.example}>
              {EXAMPLE.map((word) => (
                <Tag key={word} label={word} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.micArea}>
        <View
          style={[
            styles.halo,
            { backgroundColor: recording ? theme.backgroundDanger : theme.accentSoft },
          ]}
        />
        {recording ? (
          <Animated.View
            pointerEvents="none"
            style={[styles.halo, { backgroundColor: theme.danger }, rippleStyle]}
          />
        ) : null}
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
      </View>

      <ThemedText type="small" themeColor="textSecondary">
        {recording ? 'Нажмите, когда закончите' : 'Нажмите и говорите'}
      </ThemedText>

      {/* Пока идёт запись, ссылка пропадает: случайное нажатие не должно обрывать диктовку. */}
      <View style={styles.manualLink}>
        {recording ? null : (
          <Pressable
            accessibilityRole="button"
            hitSlop={Spacing.two}
            onPress={onManual}
            style={({ pressed }) => [styles.linkRow, { opacity: pressed ? 0.6 : 1 }]}>
            <Ionicons name="create-outline" size={18} color={theme.accent} />
            <ThemedText style={[styles.linkText, { color: theme.accent }]}>
              Ввести вручную
            </ThemedText>
          </Pressable>
        )}
      </View>
    </View>
  );
}

function ReviewPhase({
  manual,
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
  /** Пришли без диктовки: поиск наверху и с клавиатурой, без «ничего не распознал». */
  manual: boolean;
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
  const insets = useSafeAreaInsets();

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
          <ListGroup title="Вы сказали">
            <View style={styles.quoteRow}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={theme.accent} />
              <ThemedText themeColor="textSecondary" style={styles.bannerText}>
                «{transcript}»
              </ThemedText>
            </View>
          </ListGroup>
        ) : null}

        {manual ? (
          <IngredientSearch
            onPick={onAddManual}
            exclude={alreadyAdded}
            placeholder="Какой продукт добавить?"
            autoFocus
          />
        ) : null}

        {drafts.length > 0 ? (
          // Не «распознано»: в списке лежит и то, что добавлено руками.
          <ListGroup title={`В списке — ${formatProducts(drafts.length)}`}>
            {drafts.map((draft, index) => (
              <DraftRow
                key={draft.ingredientId}
                draft={draft}
                onChange={(next) => onChangeDraft(index, next)}
                onRemove={() => onRemoveDraft(index)}
              />
            ))}
          </ListGroup>
        ) : manual && !transcript ? null : (
          <EmptyState
            icon="help-circle-outline"
            title="Ничего не распознал"
            description="Попробуйте продиктовать ещё раз или добавьте продукты вручную через поиск ниже."
          />
        )}

        {unrecognized.length > 0 ? (
          <ListGroup
            title="Не понял"
            footer="Найдите эти продукты в поиске ниже или уберите, нажав на них.">
            <View style={styles.chips}>
              {unrecognized.map((phrase, index) => (
                <Pressable
                  key={phrase}
                  accessibilityRole="button"
                  accessibilityLabel={`Убрать «${phrase}»`}
                  onPress={() => onDismissUnrecognized(index)}
                  style={({ pressed }) => [
                    styles.chip,
                    { backgroundColor: theme.backgroundWarning, opacity: pressed ? 0.6 : 1 },
                  ]}>
                  <ThemedText type="small" style={{ color: theme.warning }}>
                    {phrase}
                  </ThemedText>
                  <Ionicons name="close" size={14} color={theme.warning} />
                </Pressable>
              ))}
            </View>
          </ListGroup>
        ) : null}

        {manual ? null : <IngredientSearch onPick={onAddManual} exclude={alreadyAdded} />}
      </ScrollView>

      <View
        style={[
          styles.footer,
          { borderTopColor: theme.border, paddingBottom: insets.bottom + Spacing.three },
        ]}>
        {/* Микрофон — круглой кнопкой: главное действие здесь «Добавить», и на
            узком экране две широкие кнопки рядом не помещаются. */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={transcript ? 'Продиктовать ещё' : 'Продиктовать'}
          onPress={onRecordMore}
          style={({ pressed }) => [
            styles.roundButton,
            { backgroundColor: theme.accentSoft, opacity: pressed ? 0.7 : 1 },
          ]}>
          <Ionicons name="mic" size={24} color={theme.accent} />
        </Pressable>
        <PrimaryButton
          title={drafts.length > 0 ? `Добавить ${formatProducts(drafts.length)}` : 'Готово'}
          icon="checkmark"
          onPress={onSubmit}
          style={styles.grow}
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
    gap: Spacing.four,
    padding: Spacing.three,
  },
  transcriptArea: {
    flex: 1,
    alignSelf: 'stretch',
  },
  transcriptContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  transcriptCard: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
  },
  hint: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  example: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  centered: {
    textAlign: 'center',
  },
  micArea: {
    width: HALO_SIZE,
    height: HALO_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: HALO_SIZE,
    height: HALO_SIZE,
    borderRadius: HALO_SIZE / 2,
  },
  micButton: {
    width: MIC_SIZE,
    height: MIC_SIZE,
    borderRadius: MIC_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manualLink: {
    minHeight: 48,
    justifyContent: 'center',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  linkText: {
    fontWeight: '600',
  },
  reviewContent: {
    padding: Spacing.three,
    gap: Spacing.four,
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
  quoteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    padding: Spacing.three,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    padding: Spacing.three,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  roundButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grow: {
    flex: 1,
  },
});
