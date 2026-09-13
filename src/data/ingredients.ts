/**
 * Справочник ингредиентов.
 *
 * `forms` — словоформы, по которым распознаётся речь и работает поиск.
 * Перечислять формы вручную обязательно: беглые гласные и супплетивные основы
 * делают автоматический стемминг ненадёжным (см. `src/lib/normalize.ts`).
 *
 * Многословные формы («куриное филе», «болгарский перец») поддерживаются:
 * сканер в `parse-speech.ts` пробует длинные окна раньше коротких, поэтому
 * «сливочное масло» выигрывает у «масло», а «болгарский перец» — у «перец».
 */

export type Category =
  | 'молочное'
  | 'мясо'
  | 'рыба'
  | 'овощи'
  | 'зелень'
  | 'фрукты'
  | 'крупы'
  | 'бакалея'
  | 'заморозка';

export type Unit = 'шт' | 'г' | 'мл' | 'уп';

export type Ingredient = {
  id: string;
  name: string;
  forms: string[];
  category: Category;
  defaultUnit: Unit;
  /** Базовый продукт: считаем, что он есть всегда, и не учитываем в нехватке. */
  pantry?: boolean;
};

export const CATEGORY_ORDER: Category[] = [
  'молочное',
  'мясо',
  'рыба',
  'овощи',
  'зелень',
  'фрукты',
  'крупы',
  'бакалея',
  'заморозка',
];

export const INGREDIENTS: Ingredient[] = [
  // ── Молочное ──────────────────────────────────────────────────────────────
  { id: 'milk', name: 'молоко', forms: ['молока', 'молоку', 'молоком'], category: 'молочное', defaultUnit: 'мл' },
  { id: 'kefir', name: 'кефир', forms: ['кефира', 'кефиром'], category: 'молочное', defaultUnit: 'мл' },
  { id: 'ryazhenka', name: 'ряженка', forms: ['ряженки', 'ряженку'], category: 'молочное', defaultUnit: 'мл' },
  { id: 'sour_cream', name: 'сметана', forms: ['сметаны', 'сметану', 'сметаной'], category: 'молочное', defaultUnit: 'г' },
  { id: 'cream', name: 'сливки', forms: ['сливок', 'сливками'], category: 'молочное', defaultUnit: 'мл' },
  { id: 'yogurt', name: 'йогурт', forms: ['йогурта', 'йогурты', 'йогуртом'], category: 'молочное', defaultUnit: 'г' },
  { id: 'cottage_cheese', name: 'творог', forms: ['творога', 'творогом', 'творожок'], category: 'молочное', defaultUnit: 'г' },
  { id: 'cheese', name: 'сыр', forms: ['сыра', 'сыром', 'сыры', 'твердый сыр', 'сыр твердый'], category: 'молочное', defaultUnit: 'г' },
  { id: 'feta', name: 'брынза', forms: ['брынзы', 'фета', 'феты', 'сыр фета'], category: 'молочное', defaultUnit: 'г' },
  { id: 'mozzarella', name: 'моцарелла', forms: ['моцареллы', 'моцареллу'], category: 'молочное', defaultUnit: 'г' },
  { id: 'parmesan', name: 'пармезан', forms: ['пармезана', 'пармезаном'], category: 'молочное', defaultUnit: 'г' },
  { id: 'cream_cheese', name: 'творожный сыр', forms: ['творожного сыра', 'крем сыр', 'сливочный сыр'], category: 'молочное', defaultUnit: 'г' },
  { id: 'suluguni', name: 'сулугуни', forms: ['сыр сулугуни', 'адыгейский сыр', 'адыгейского сыра'], category: 'молочное', defaultUnit: 'г' },
  { id: 'processed_cheese', name: 'плавленый сыр', forms: ['плавленого сыра', 'плавленый сырок', 'плавленые сырки', 'сырок', 'сырки'], category: 'молочное', defaultUnit: 'г' },
  { id: 'butter', name: 'сливочное масло', forms: ['сливочного масла', 'масло сливочное', 'сливочным маслом'], category: 'молочное', defaultUnit: 'г' },
  { id: 'condensed_milk', name: 'сгущёнка', forms: ['сгущенка', 'сгущенки', 'сгущенное молоко'], category: 'молочное', defaultUnit: 'г' },

  // ── Мясо и яйца ───────────────────────────────────────────────────────────
  { id: 'chicken_fillet', name: 'куриное филе', forms: ['куриного филе', 'филе курицы', 'куриная грудка', 'куриной грудки', 'грудка', 'грудки'], category: 'мясо', defaultUnit: 'г' },
  { id: 'chicken', name: 'курица', forms: ['курицы', 'курицу', 'курицей', 'кура', 'цыпленок', 'курочка'], category: 'мясо', defaultUnit: 'г' },
  { id: 'chicken_thigh', name: 'куриные бёдра', forms: ['куриные бедра', 'бедра', 'бедрышки', 'окорочка', 'голени', 'куриные голени'], category: 'мясо', defaultUnit: 'г' },
  { id: 'minced_meat', name: 'фарш', forms: ['фарша', 'фаршем', 'мясной фарш', 'фарш мясной'], category: 'мясо', defaultUnit: 'г' },
  { id: 'beef', name: 'говядина', forms: ['говядины', 'говядину'], category: 'мясо', defaultUnit: 'г' },
  { id: 'pork', name: 'свинина', forms: ['свинины', 'свинину'], category: 'мясо', defaultUnit: 'г' },
  { id: 'turkey', name: 'индейка', forms: ['индейки', 'индейку'], category: 'мясо', defaultUnit: 'г' },
  { id: 'bacon', name: 'бекон', forms: ['бекона', 'беконом', 'грудинка'], category: 'мясо', defaultUnit: 'г' },
  { id: 'sausages', name: 'сосиски', forms: ['сосисок', 'сосиска', 'сардельки'], category: 'мясо', defaultUnit: 'шт' },
  { id: 'sausage', name: 'колбаса', forms: ['колбасы', 'колбасу', 'колбаска'], category: 'мясо', defaultUnit: 'г' },
  { id: 'ham', name: 'ветчина', forms: ['ветчины', 'ветчину'], category: 'мясо', defaultUnit: 'г' },
  { id: 'liver', name: 'печень', forms: ['печени', 'печенка', 'куриная печень'], category: 'мясо', defaultUnit: 'г' },
  { id: 'lamb', name: 'баранина', forms: ['баранины', 'баранину', 'ягненок', 'ягнятина'], category: 'мясо', defaultUnit: 'г' },
  { id: 'chicken_wings', name: 'куриные крылья', forms: ['крылья', 'крыльев', 'крылышки', 'куриные крылышки'], category: 'мясо', defaultUnit: 'г' },
  { id: 'salo', name: 'сало', forms: ['сала', 'шпик', 'шпика'], category: 'мясо', defaultUnit: 'г' },
  { id: 'egg', name: 'яйца', forms: ['яйцо', 'яиц', 'яйцам', 'яйцами', 'яичко', 'яички'], category: 'мясо', defaultUnit: 'шт' },

  // ── Рыба ──────────────────────────────────────────────────────────────────
  { id: 'fish', name: 'рыба', forms: ['рыбы', 'рыбу', 'рыбное филе', 'филе рыбы'], category: 'рыба', defaultUnit: 'г' },
  { id: 'salmon', name: 'лосось', forms: ['лосося', 'семга', 'семги', 'форель', 'форели'], category: 'рыба', defaultUnit: 'г' },
  { id: 'cod', name: 'треска', forms: ['трески', 'треску', 'минтай', 'минтая'], category: 'рыба', defaultUnit: 'г' },
  { id: 'tuna', name: 'тунец', forms: ['тунца', 'консервированный тунец', 'тунец консервированный'], category: 'рыба', defaultUnit: 'уп' },
  { id: 'herring', name: 'селёдка', forms: ['селедка', 'селедки', 'сельдь', 'сельди'], category: 'рыба', defaultUnit: 'шт' },
  { id: 'shrimp', name: 'креветки', forms: ['креветок', 'креветками', 'креветка'], category: 'рыба', defaultUnit: 'г' },
  { id: 'crab_sticks', name: 'крабовые палочки', forms: ['крабовых палочек', 'крабовым палочкам'], category: 'рыба', defaultUnit: 'уп' },
  { id: 'mackerel', name: 'скумбрия', forms: ['скумбрии', 'скумбрию'], category: 'рыба', defaultUnit: 'г' },
  { id: 'squid', name: 'кальмары', forms: ['кальмар', 'кальмаров', 'кальмара'], category: 'рыба', defaultUnit: 'г' },
  { id: 'mussels', name: 'мидии', forms: ['мидий', 'мидиями'], category: 'рыба', defaultUnit: 'г' },
  { id: 'canned_fish', name: 'рыбные консервы', forms: ['рыбных консервов', 'сайра', 'сайры', 'шпроты', 'шпрот', 'горбуша в собственном соку'], category: 'рыба', defaultUnit: 'уп' },

  // ── Овощи ─────────────────────────────────────────────────────────────────
  { id: 'potato', name: 'картофель', forms: ['картошка', 'картошки', 'картошку', 'картофеля', 'картофелина', 'картоха'], category: 'овощи', defaultUnit: 'г' },
  { id: 'carrot', name: 'морковь', forms: ['моркови', 'морковка', 'морковки', 'морковку'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'onion', name: 'лук', forms: ['лука', 'луковица', 'луковицы', 'луком', 'репчатый лук', 'лук репчатый'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'green_onion', name: 'зелёный лук', forms: ['зеленый лук', 'зеленого лука', 'лук зеленый', 'перья лука'], category: 'зелень', defaultUnit: 'уп' },
  { id: 'garlic', name: 'чеснок', forms: ['чеснока', 'чесноком', 'зубчик чеснока', 'зубчика чеснока'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'tomato', name: 'помидоры', forms: ['помидор', 'помидоров', 'помидорка', 'помидорки', 'томат', 'томаты', 'томатов'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'cherry_tomato', name: 'помидоры черри', forms: ['черри', 'томаты черри', 'помидорки черри'], category: 'овощи', defaultUnit: 'г' },
  { id: 'cucumber', name: 'огурцы', forms: ['огурец', 'огурцов', 'огурчик', 'огурчики', 'огурца'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'bell_pepper', name: 'болгарский перец', forms: ['болгарского перца', 'перец болгарский', 'сладкий перец', 'сладкого перца'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'chili', name: 'острый перец', forms: ['чили', 'перец чили', 'острого перца', 'жгучий перец'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'cabbage', name: 'капуста', forms: ['капусты', 'капусту', 'белокочанная капуста', 'капуста белокочанная'], category: 'овощи', defaultUnit: 'г' },
  { id: 'broccoli', name: 'брокколи', forms: ['броколи'], category: 'овощи', defaultUnit: 'г' },
  { id: 'cauliflower', name: 'цветная капуста', forms: ['цветной капусты', 'капуста цветная'], category: 'овощи', defaultUnit: 'г' },
  { id: 'zucchini', name: 'кабачок', forms: ['кабачки', 'кабачка', 'кабачков', 'цукини'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'eggplant', name: 'баклажан', forms: ['баклажаны', 'баклажанов', 'баклажана', 'синенькие'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'beet', name: 'свёкла', forms: ['свекла', 'свеклы', 'свеклу', 'буряк'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'pumpkin', name: 'тыква', forms: ['тыквы', 'тыкву'], category: 'овощи', defaultUnit: 'г' },
  { id: 'corn', name: 'кукуруза', forms: ['кукурузы', 'кукурузу', 'консервированная кукуруза', 'кукуруза консервированная'], category: 'овощи', defaultUnit: 'уп' },
  { id: 'green_peas', name: 'зелёный горошек', forms: ['горошек', 'горошка', 'зеленый горошек', 'консервированный горошек'], category: 'овощи', defaultUnit: 'уп' },
  { id: 'beans', name: 'фасоль', forms: ['фасоли', 'фасолью', 'консервированная фасоль', 'красная фасоль'], category: 'овощи', defaultUnit: 'уп' },
  { id: 'mushrooms', name: 'грибы', forms: ['грибов', 'гриб', 'шампиньоны', 'шампиньонов', 'вешенки', 'грибами'], category: 'овощи', defaultUnit: 'г' },
  { id: 'radish', name: 'редис', forms: ['редиса', 'редиска', 'редиски'], category: 'овощи', defaultUnit: 'г' },
  { id: 'celery', name: 'сельдерей', forms: ['сельдерея', 'стебель сельдерея'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'avocado', name: 'авокадо', forms: [], category: 'овощи', defaultUnit: 'шт' },
  { id: 'ginger', name: 'имбирь', forms: ['имбиря', 'имбирем', 'корень имбиря'], category: 'овощи', defaultUnit: 'г' },
  { id: 'olives', name: 'оливки', forms: ['оливок', 'маслины', 'маслин'], category: 'овощи', defaultUnit: 'уп' },
  { id: 'pickles', name: 'солёные огурцы', forms: ['соленые огурцы', 'соленых огурцов', 'маринованные огурцы', 'корнишоны'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'sauerkraut', name: 'квашеная капуста', forms: ['квашеной капусты', 'квашеную капусту', 'кислая капуста', 'кислой капусты'], category: 'овощи', defaultUnit: 'г' },
  { id: 'chinese_cabbage', name: 'пекинская капуста', forms: ['пекинской капусты', 'пекинку', 'пекинка'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'leek', name: 'лук-порей', forms: ['порей', 'порея', 'лука порея'], category: 'овощи', defaultUnit: 'шт' },
  { id: 'sweet_potato', name: 'батат', forms: ['батата', 'бататы', 'сладкий картофель'], category: 'овощи', defaultUnit: 'г' },
  { id: 'green_beans', name: 'стручковая фасоль', forms: ['стручковой фасоли', 'спаржевая фасоль', 'зеленая фасоль'], category: 'овощи', defaultUnit: 'г' },
  { id: 'tofu', name: 'тофу', forms: ['соевый сыр'], category: 'овощи', defaultUnit: 'г' },

  // ── Зелень ────────────────────────────────────────────────────────────────
  { id: 'dill', name: 'укроп', forms: ['укропа', 'укропом'], category: 'зелень', defaultUnit: 'уп' },
  { id: 'parsley', name: 'петрушка', forms: ['петрушки', 'петрушку'], category: 'зелень', defaultUnit: 'уп' },
  { id: 'cilantro', name: 'кинза', forms: ['кинзы', 'кинзу'], category: 'зелень', defaultUnit: 'уп' },
  { id: 'basil', name: 'базилик', forms: ['базилика', 'базиликом'], category: 'зелень', defaultUnit: 'уп' },
  { id: 'lettuce', name: 'листья салата', forms: ['салат', 'салата', 'салатные листья', 'айсберг', 'латук', 'руккола'], category: 'зелень', defaultUnit: 'уп' },
  { id: 'spinach', name: 'шпинат', forms: ['шпината', 'шпинатом'], category: 'зелень', defaultUnit: 'г' },
  { id: 'mint', name: 'мята', forms: ['мяты', 'мяту'], category: 'зелень', defaultUnit: 'уп' },
  { id: 'sorrel', name: 'щавель', forms: ['щавеля', 'щавелем'], category: 'зелень', defaultUnit: 'уп' },

  // ── Фрукты ────────────────────────────────────────────────────────────────
  { id: 'apple', name: 'яблоки', forms: ['яблоко', 'яблок', 'яблочко'], category: 'фрукты', defaultUnit: 'шт' },
  { id: 'banana', name: 'бананы', forms: ['банан', 'бананов', 'банана'], category: 'фрукты', defaultUnit: 'шт' },
  { id: 'orange', name: 'апельсины', forms: ['апельсин', 'апельсинов', 'апельсина', 'мандарин', 'мандарины'], category: 'фрукты', defaultUnit: 'шт' },
  { id: 'lemon', name: 'лимон', forms: ['лимона', 'лимоны', 'лимоном', 'сок лимона'], category: 'фрукты', defaultUnit: 'шт' },
  { id: 'lime', name: 'лайм', forms: ['лайма', 'лаймом'], category: 'фрукты', defaultUnit: 'шт' },
  { id: 'pear', name: 'груша', forms: ['груши', 'грушу', 'груш'], category: 'фрукты', defaultUnit: 'шт' },
  { id: 'grapes', name: 'виноград', forms: ['винограда', 'виноградом'], category: 'фрукты', defaultUnit: 'г' },
  { id: 'strawberry', name: 'клубника', forms: ['клубники', 'клубнику'], category: 'фрукты', defaultUnit: 'г' },
  { id: 'berries', name: 'ягоды', forms: ['ягод', 'ягодами', 'замороженные ягоды', 'смородина', 'малина', 'черника'], category: 'фрукты', defaultUnit: 'г' },
  { id: 'raisins', name: 'изюм', forms: ['изюма', 'изюмом'], category: 'фрукты', defaultUnit: 'г' },
  { id: 'nuts', name: 'орехи', forms: ['орехов', 'орех', 'грецкие орехи', 'грецких орехов', 'миндаль', 'фундук', 'арахис'], category: 'фрукты', defaultUnit: 'г' },
  { id: 'prunes', name: 'чернослив', forms: ['чернослива', 'черносливом'], category: 'фрукты', defaultUnit: 'г' },
  { id: 'dried_apricots', name: 'курага', forms: ['кураги', 'курагу', 'курагой'], category: 'фрукты', defaultUnit: 'г' },
  { id: 'pineapple', name: 'ананасы', forms: ['ананас', 'ананаса', 'ананасов', 'консервированные ананасы'], category: 'фрукты', defaultUnit: 'уп' },
  { id: 'pomegranate', name: 'гранат', forms: ['граната', 'гранатовые зерна', 'зерна граната'], category: 'фрукты', defaultUnit: 'шт' },

  // ── Крупы и макароны ──────────────────────────────────────────────────────
  { id: 'rice', name: 'рис', forms: ['риса', 'рисом', 'рисовая крупа'], category: 'крупы', defaultUnit: 'г' },
  { id: 'buckwheat', name: 'гречка', forms: ['гречки', 'гречку', 'гречневая крупа', 'греча'], category: 'крупы', defaultUnit: 'г' },
  { id: 'pasta', name: 'макароны', forms: ['макарон', 'паста', 'пасты', 'спагетти', 'вермишель', 'лапша', 'рожки', 'фузилли', 'пенне'], category: 'крупы', defaultUnit: 'г' },
  { id: 'oats', name: 'овсянка', forms: ['овсянки', 'овсяные хлопья', 'геркулес', 'овсяных хлопьев'], category: 'крупы', defaultUnit: 'г' },
  { id: 'pearl_barley', name: 'перловка', forms: ['перловки', 'перловая крупа'], category: 'крупы', defaultUnit: 'г' },
  { id: 'millet', name: 'пшено', forms: ['пшена', 'пшенная крупа'], category: 'крупы', defaultUnit: 'г' },
  { id: 'couscous', name: 'кускус', forms: ['кускуса'], category: 'крупы', defaultUnit: 'г' },
  { id: 'bulgur', name: 'булгур', forms: ['булгура'], category: 'крупы', defaultUnit: 'г' },
  { id: 'lentils', name: 'чечевица', forms: ['чечевицы', 'чечевицу'], category: 'крупы', defaultUnit: 'г' },
  { id: 'semolina', name: 'манка', forms: ['манки', 'манная крупа'], category: 'крупы', defaultUnit: 'г' },
  { id: 'chickpeas', name: 'нут', forms: ['нута', 'нутом', 'турецкий горох'], category: 'крупы', defaultUnit: 'г' },
  { id: 'split_peas', name: 'горох', forms: ['гороха', 'колотый горох', 'горох колотый'], category: 'крупы', defaultUnit: 'г' },
  { id: 'quinoa', name: 'киноа', forms: ['кинои'], category: 'крупы', defaultUnit: 'г' },
  { id: 'rice_noodles', name: 'рисовая лапша', forms: ['рисовой лапши', 'фунчоза', 'фунчозы', 'лапша удон', 'удон', 'гречневая лапша', 'лапша соба'], category: 'крупы', defaultUnit: 'г' },

  // ── Бакалея ───────────────────────────────────────────────────────────────
  { id: 'bread', name: 'хлеб', forms: ['хлеба', 'батон', 'батона', 'багет', 'булка', 'тост', 'тосты'], category: 'бакалея', defaultUnit: 'шт' },
  { id: 'lavash', name: 'лаваш', forms: ['лаваша', 'тортилья', 'тортильи'], category: 'бакалея', defaultUnit: 'шт' },
  { id: 'breadcrumbs', name: 'панировочные сухари', forms: ['сухари', 'сухарей', 'панировка'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'soy_sauce', name: 'соевый соус', forms: ['соевого соуса', 'соус соевый'], category: 'бакалея', defaultUnit: 'мл' },
  { id: 'mayo', name: 'майонез', forms: ['майонеза', 'майонезом'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'ketchup', name: 'кетчуп', forms: ['кетчупа', 'кетчупом'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'mustard', name: 'горчица', forms: ['горчицы', 'горчицу'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'tomato_paste', name: 'томатная паста', forms: ['томатной пасты', 'паста томатная', 'томаты в собственном соку'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'broth', name: 'бульон', forms: ['бульона', 'бульонный кубик', 'куриный бульон'], category: 'бакалея', defaultUnit: 'мл' },
  { id: 'honey', name: 'мёд', forms: ['мед', 'меда', 'медом'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'jam', name: 'варенье', forms: ['варенья', 'джем', 'джема', 'повидло'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'chocolate', name: 'шоколад', forms: ['шоколада', 'плитка шоколада', 'шоколадка'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'cocoa', name: 'какао', forms: [], category: 'бакалея', defaultUnit: 'г' },
  { id: 'peanut_butter', name: 'арахисовая паста', forms: ['арахисовой пасты', 'арахисовое масло'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'yeast', name: 'дрожжи', forms: ['дрожжей', 'сухие дрожжи'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'gelatin', name: 'желатин', forms: ['желатина'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'tea', name: 'чай', forms: ['чая', 'заварка'], category: 'бакалея', defaultUnit: 'уп' },
  { id: 'coffee', name: 'кофе', forms: [], category: 'бакалея', defaultUnit: 'г' },
  { id: 'coconut_milk', name: 'кокосовое молоко', forms: ['кокосового молока', 'кокосовые сливки'], category: 'бакалея', defaultUnit: 'мл' },
  { id: 'sesame', name: 'кунжут', forms: ['кунжута', 'семена кунжута'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'starch', name: 'крахмал', forms: ['крахмала', 'картофельный крахмал', 'кукурузный крахмал'], category: 'бакалея', defaultUnit: 'г' },
  { id: 'kvass', name: 'квас', forms: ['кваса', 'квасом'], category: 'бакалея', defaultUnit: 'мл' },

  // ── Бакалея, базовые (pantry) ─────────────────────────────────────────────
  { id: 'salt', name: 'соль', forms: ['соли', 'солью'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'black_pepper', name: 'чёрный перец', forms: ['перец', 'перца', 'перцем', 'черный перец', 'молотый перец', 'перец молотый'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'sugar', name: 'сахар', forms: ['сахара', 'сахаром', 'сахарный песок'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'flour', name: 'мука', forms: ['муки', 'мукой', 'пшеничная мука'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'oil', name: 'растительное масло', forms: ['масло', 'масла', 'маслом', 'растительного масла', 'подсолнечное масло', 'масло растительное'], category: 'бакалея', defaultUnit: 'мл', pantry: true },
  { id: 'olive_oil', name: 'оливковое масло', forms: ['оливкового масла', 'масло оливковое'], category: 'бакалея', defaultUnit: 'мл', pantry: true },
  { id: 'vinegar', name: 'уксус', forms: ['уксуса', 'уксусом', 'бальзамический уксус'], category: 'бакалея', defaultUnit: 'мл', pantry: true },
  { id: 'water', name: 'вода', forms: ['воды', 'воду', 'водой'], category: 'бакалея', defaultUnit: 'мл', pantry: true },
  { id: 'soda', name: 'сода', forms: ['соды', 'разрыхлитель', 'разрыхлителя'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'bay_leaf', name: 'лавровый лист', forms: ['лаврового листа', 'лаврушка'], category: 'бакалея', defaultUnit: 'шт', pantry: true },
  { id: 'paprika', name: 'паприка', forms: ['паприки', 'молотая паприка'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'curry', name: 'карри', forms: ['приправа карри'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'cinnamon', name: 'корица', forms: ['корицы', 'корицей'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'vanilla', name: 'ванилин', forms: ['ванильный сахар', 'ваниль'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'herbs', name: 'сушёные травы', forms: ['прованские травы', 'сушеные травы', 'орегано', 'тимьян', 'розмарин', 'итальянские травы'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'cumin', name: 'зира', forms: ['зиры', 'кумин', 'тмин'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'turmeric', name: 'куркума', forms: ['куркумы'], category: 'бакалея', defaultUnit: 'г', pantry: true },
  { id: 'khmeli_suneli', name: 'хмели-сунели', forms: ['хмели сунели', 'уцхо сунели'], category: 'бакалея', defaultUnit: 'г', pantry: true },

  // ── Заморозка ─────────────────────────────────────────────────────────────
  { id: 'frozen_veg', name: 'замороженные овощи', forms: ['овощная смесь', 'замороженных овощей', 'мексиканская смесь'], category: 'заморозка', defaultUnit: 'г' },
  { id: 'dumplings', name: 'пельмени', forms: ['пельменей', 'вареники'], category: 'заморозка', defaultUnit: 'г' },
  { id: 'puff_pastry', name: 'слоёное тесто', forms: ['слоеное тесто', 'слоеного теста', 'тесто слоеное'], category: 'заморозка', defaultUnit: 'г' },
  { id: 'dough', name: 'тесто', forms: ['теста', 'тестом', 'дрожжевое тесто'], category: 'заморозка', defaultUnit: 'г' },
];

export const INGREDIENT_BY_ID: ReadonlyMap<string, Ingredient> = new Map(
  INGREDIENTS.map((ingredient) => [ingredient.id, ingredient]),
);

export function getIngredient(id: string): Ingredient | undefined {
  return INGREDIENT_BY_ID.get(id);
}

export function ingredientName(id: string): string {
  return INGREDIENT_BY_ID.get(id)?.name ?? id;
}

export function isPantry(id: string): boolean {
  return INGREDIENT_BY_ID.get(id)?.pantry === true;
}
