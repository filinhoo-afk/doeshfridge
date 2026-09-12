// Сгенерировано scripts/photos/fetch.mjs — не правьте вручную.
import type { ImageSourcePropType } from 'react-native';

export type PhotoCredit = {
  author: string;
  license: string;
  licenseUrl: string;
  /** Страница файла на Wikimedia Commons. */
  page: string;
};

export type RecipePhoto = {
  source: ImageSourcePropType;
  /** Нет у собственных фото автора приложения. */
  credit?: PhotoCredit;
};

export const RECIPE_PHOTOS: Readonly<Record<string, RecipePhoto>> = {
  omlet: {
    source: require('../../assets/recipes/omlet.webp'),
    credit: {
      author: "MaedaAkihiko",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Omelette-Plate.jpg",
    },
  },
  yaichnica_pomidory: {
    source: require('../../assets/recipes/yaichnica_pomidory.webp'),
    credit: {
      author: "Huangdan2060",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Hunan_cuisine,_stir-fried_tomato_with_eggs.jpg",
    },
  },
  syrniki: {
    source: require('../../assets/recipes/syrniki.webp'),
    credit: {
      author: "Off-shell",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Syrniki6.jpg",
    },
  },
  ovsyanka: {
    source: require('../../assets/recipes/ovsyanka.webp'),
    credit: {
      author: "UserTwoSix",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Oatmeal_porridge_1-minute_with_additional_ingredients.jpg",
    },
  },
  tvorog_yagody: {
    source: require('../../assets/recipes/tvorog_yagody.webp'),
    credit: {
      author: "Anna",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Summer_Desert_(176103799).jpeg",
    },
  },
  bliny: {
    source: require('../../assets/recipes/bliny.webp'),
    credit: {
      author: "Maksim L.",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:50_%D0%B1%D0%BB%D1%96%D0%BD%D0%BA%D0%BE%D1%9E_%D0%BD%D0%B0_%D1%82%D0%B0%D0%BB%D0%B5%D1%80%D1%86%D1%8B_240_%D0%BC%D0%BC.jpg",
    },
  },
  oladi_kefir: {
    source: require('../../assets/recipes/oladi_kefir.webp'),
    credit: {
      author: "Kozubenko",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%9E%D0%BB%D0%B0%D0%B4%D0%BA%D0%B8%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D1%96.jpg",
    },
  },
  grenki: {
    source: require('../../assets/recipes/grenki.webp'),
    credit: {
      author: "Ocdp",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:French_toast_001.jpg",
    },
  },
  tost_avokado: {
    source: require('../../assets/recipes/tost_avokado.webp'),
    credit: {
      author: "Luca Nebuloni",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Avocado_toast_with_eggs_(28508171495).jpg",
    },
  },
  yogurt_granola: {
    source: require('../../assets/recipes/yogurt_granola.webp'),
    credit: {
      author: "Arnold Gatilao",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Granola,_yogurt,_fruit._(16696981528).jpg",
    },
  },
  borsch: {
    source: require('../../assets/recipes/borsch.webp'),
    credit: {
      author: "liz west",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Borscht_served.jpg",
    },
  },
  shchi: {
    source: require('../../assets/recipes/shchi.webp'),
    credit: {
      author: "Victoria Vasilieva",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Shchi.jpg",
    },
  },
  kurinyi_sup: {
    source: require('../../assets/recipes/kurinyi_sup.webp'),
    credit: {
      author: "Nichijyou123",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_Noodle_Soup_US.jpg",
    },
  },
  gribnoy_sup: {
    source: require('../../assets/recipes/gribnoy_sup.webp'),
    credit: {
      author: "MichalPL",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Cream_of_mushroom_soup.jpg",
    },
  },
  syrnyi_sup: {
    source: require('../../assets/recipes/syrnyi_sup.webp'),
    credit: {
      author: "Bernt Rostad",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Kremostsuppe_(cream_cheese_soup).jpg",
    },
  },
  rassolnik: {
    source: require('../../assets/recipes/rassolnik.webp'),
    credit: {
      author: "A.Savin",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Rassolnik.jpg",
    },
  },
  chechevichnyi_sup: {
    source: require('../../assets/recipes/chechevichnyi_sup.webp'),
    credit: {
      author: "Whoisjohngalt",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Bowl_of_lentil_soup_with_green_and_red_lentils.jpg",
    },
  },
  tomatnyi_sup: {
    source: require('../../assets/recipes/tomatnyi_sup.webp'),
    credit: {
      author: "Scudsvlad",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Vegan_tomato_bisque.jpg",
    },
  },
  uha: {
    source: require('../../assets/recipes/uha.webp'),
    credit: {
      author: "Pannet",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%A3%D1%85%D0%B0_%D0%B8%D0%B7_%D0%BE%D1%81%D0%B5%D1%82%D1%80%D0%B0_01.jpg",
    },
  },
  okroshka: {
    source: require('../../assets/recipes/okroshka.webp'),
    credit: {
      author: "Nikkolo",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%9E%D0%BA%D1%80%D0%BE%D1%88%D0%BA%D0%B0_Okroshka_05.jpg",
    },
  },
  kurica_s_kartoshkoy: {
    source: require('../../assets/recipes/kurica_s_kartoshkoy.webp'),
    credit: {
      author: "Silar",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:02023_0151_Roasted_Chicken_and_Potatoes.jpg",
    },
  },
  kurica_teriyaki: {
    source: require('../../assets/recipes/kurica_teriyaki.webp'),
    credit: {
      author: "Flickr.com user \"Blue Lotus\"",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_teriyaki.jpg",
    },
  },
  kurica_karri: {
    source: require('../../assets/recipes/kurica_karri.webp'),
    credit: {
      author: "Infrogmation of New Orleans",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Friday_dinner_-_Curry_chicken_with_bell_peppers_and_rice_-_02.jpg",
    },
  },
  nagetsy: {
    source: require('../../assets/recipes/nagetsy.webp'),
    credit: {
      author: "James Palinsad",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_Nuggets.jpg",
    },
  },
  plov_kurinyi: {
    source: require('../../assets/recipes/plov_kurinyi.webp'),
    credit: {
      author: "Mizu basyo",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Polu.jpg",
    },
  },
  zhulien: {
    source: require('../../assets/recipes/zhulien.webp'),
    credit: {
      author: "Мария Воронина",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Julienne_18.jpg",
    },
  },
  kotlety: {
    source: require('../../assets/recipes/kotlety.webp'),
    credit: {
      author: "Jacek Halicki",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:2023_Kotlety_mielone.jpg",
    },
  },
  tefteli: {
    source: require('../../assets/recipes/tefteli.webp'),
    credit: {
      author: "HaJunkiyada",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Meatballs_in_tomato_sauce.jpg",
    },
  },
  makarony_po_flotski: {
    source: require('../../assets/recipes/makarony_po_flotski.webp'),
    credit: {
      author: "Zuzu172",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Navy-style_2020-01-30_%D0%9C%D0%B0%D0%BA%D0%B0%D1%80%D0%BE%D0%BD%D1%8B_%C2%AB%D0%BF%D0%BE-%D1%84%D0%BB%D0%BE%D1%82%D1%81%D0%BA%D0%B8%C2%BB.jpg",
    },
  },
  bolognese: {
    source: require('../../assets/recipes/bolognese.webp'),
    credit: {
      author: "Chingon",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:Spaghetti_Bolognese.jpg",
    },
  },
  gulyash: {
    source: require('../../assets/recipes/gulyash.webp'),
    credit: {
      author: "RitaE",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Goulash_hungarian.jpg",
    },
  },
  svinina_v_duhovke: {
    source: require('../../assets/recipes/svinina_v_duhovke.webp'),
    credit: {
      author: "Ralff Nestor Nacor",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Roast_Pork_with_gravy,_May_2024.jpg",
    },
  },
  pechen_v_smetane: {
    source: require('../../assets/recipes/pechen_v_smetane.webp'),
    credit: {
      author: "Matti Blume",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Fried_liver,_Erfurt_(P1032731).jpg",
    },
  },
  kartofelnaya_zapekanka: {
    source: require('../../assets/recipes/kartofelnaya_zapekanka.webp'),
    credit: {
      author: "Andy Li",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Shepherds_pie_-_The_Kew_Greenhouse_Cafe_2025-05-14.jpg",
    },
  },
  farshirovannyi_perec: {
    source: require('../../assets/recipes/farshirovannyi_perec.webp'),
    credit: {
      author: "Tess Mattew",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:2025.09.02_Stuffed_Peppers_Paprika_in_Belarus_by_Dina_Panayotis.jpg",
    },
  },
  losos_v_duhovke: {
    source: require('../../assets/recipes/losos_v_duhovke.webp'),
    credit: {
      author: "Chaojoker",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:%D5%8D%D5%A1%D5%B2%D5%B4%D5%B8%D5%B6.JPG",
    },
  },
  treska_v_klyare: {
    source: require('../../assets/recipes/treska_v_klyare.webp'),
    credit: {
      author: "Andy Li",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Beer_Battered_Cod_-_The_Hummingbird_2026-05-05.jpg",
    },
  },
  krevetki_chesnok: {
    source: require('../../assets/recipes/krevetki_chesnok.webp'),
    credit: {
      author: "Banej",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Gambas_Al_Ajillo_(Spanish_Garlic_Shrimp).jpg",
    },
  },
  pasta_tunec: {
    source: require('../../assets/recipes/pasta_tunec.webp'),
    credit: {
      author: "Luca Nebuloni",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Pasta_with_tuna_%26_vegetables_(5746832862).jpg",
    },
  },
  carbonara: {
    source: require('../../assets/recipes/carbonara.webp'),
    credit: {
      author: "Javier Somoza",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Espaguetis_carbonara.jpg",
    },
  },
  pasta_slivochnaya: {
    source: require('../../assets/recipes/pasta_slivochnaya.webp'),
    credit: {
      author: "Vee Satayamas",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Cream_sauce_pasta.jpg",
    },
  },
  risotto_gribnoe: {
    source: require('../../assets/recipes/risotto_gribnoe.webp'),
    credit: {
      author: "Katrin Gilger",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Mushroom_Risotto_(4790048714).jpg",
    },
  },
  plov_ovoshnoy: {
    source: require('../../assets/recipes/plov_ovoshnoy.webp'),
    credit: {
      author: "Seena.ge",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Vegetable_pulav.JPG",
    },
  },
  bulgur_ovoshi: {
    source: require('../../assets/recipes/bulgur_ovoshi.webp'),
    credit: {
      author: "USDAgov",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:Child_Care_Recipes_(Team_Nutiriton)_(20211103-FNS-UNC-6079).jpg",
    },
  },
  kuskus_salat: {
    source: require('../../assets/recipes/kuskus_salat.webp'),
    credit: {
      author: "Karen and Brad Emerson",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Couscous_and_lentil_salad_(3658113458).jpg",
    },
  },
  ragu_ovoshnoe: {
    source: require('../../assets/recipes/ragu_ovoshnoe.webp'),
    credit: {
      author: "charles Haynes",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Irish_stew.jpg",
    },
  },
  draniki: {
    source: require('../../assets/recipes/draniki.webp'),
    credit: {
      author: "Raimond Spekking",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Frische,_selbstgemachte_Reibekuchen-8786.jpg",
    },
  },
  kabachkovye_oladi: {
    source: require('../../assets/recipes/kabachkovye_oladi.webp'),
    credit: {
      author: "William Neuheisel",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Zucchini_Fritters_-_Lunch_at_Yanyali_Fehmi_Lokantasi_(6421047753).jpg",
    },
  },
  ovoshi_v_duhovke: {
    source: require('../../assets/recipes/ovoshi_v_duhovke.webp'),
    credit: {
      author: "Mack Male",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Roasted_Vegetables_(2897937502).jpg",
    },
  },
  pure: {
    source: require('../../assets/recipes/pure.webp'),
    credit: {
      author: "sousvideguy",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Sous_vide_mashed_potatoes.jpg",
    },
  },
  omlet_s_ovoshami: {
    source: require('../../assets/recipes/omlet_s_ovoshami.webp'),
    credit: {
      author: "Dr.Kerollos",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Egga_(%D8%B9%D8%AC%D8%A9_%D8%A7%D9%84%D8%A8%D9%8A%D8%B6_)_(cropped).jpg",
    },
  },
  shakshuka: {
    source: require('../../assets/recipes/shakshuka.webp'),
    credit: {
      author: "Calliopejen1",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Shakshuka_by_Calliopejen1.jpg",
    },
  },
  tvorozhnaya_zapekanka: {
    source: require('../../assets/recipes/tvorozhnaya_zapekanka.webp'),
    credit: {
      author: "FDominec",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Recipes_cottage_cheese_pie_named_misa.jpg",
    },
  },
  olivie: {
    source: require('../../assets/recipes/olivie.webp'),
    credit: {
      author: "Jacek Halicki",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:2023_Sa%C5%82atka_jarzynowa_(1).jpg",
    },
  },
  vinegret: {
    source: require('../../assets/recipes/vinegret.webp'),
    credit: {
      author: "Oleg Brovko",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Vinaigrette_salad.jpg",
    },
  },
  grecheskiy: {
    source: require('../../assets/recipes/grecheskiy.webp'),
    credit: {
      author: "неизвестен",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Greek_Salad_Choriatiki.jpg",
    },
  },
  cezar: {
    source: require('../../assets/recipes/cezar.webp'),
    credit: {
      author: "Daderot",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_Caesar_salad_-_Auckland,_New_Zealand.jpg",
    },
  },
  salat_ogurcy_pomidory: {
    source: require('../../assets/recipes/salat_ogurcy_pomidory.webp'),
    credit: {
      author: "Voxbyrox",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Cucumber_onion_and_tomato_salad_with_mint_coriander_and_lemon.jpg",
    },
  },
  salat_shpinat_avokado: {
    source: require('../../assets/recipes/salat_shpinat_avokado.webp'),
    credit: {
      author: "HaJunkiyada",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Healthy_Breakfast_with_Boiled_Egg,_Avocado,_and_Israeli_Salad.jpg",
    },
  },
  salat_iz_kapusty: {
    source: require('../../assets/recipes/salat_iz_kapusty.webp'),
    credit: {
      author: "BogTar201213",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Vegetable_salad_13.jpg",
    },
  },
  sharlotka: {
    source: require('../../assets/recipes/sharlotka.webp'),
    credit: {
      author: "Turzh",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:%D0%9A%D1%83%D1%81%D0%BD%D1%96_%D1%88%D0%B0%D1%80%D0%BB%D0%BE%D1%82%D0%BA%D0%B8.JPG",
    },
  },
  bananovyi_hleb: {
    source: require('../../assets/recipes/bananovyi_hleb.webp'),
    credit: {
      author: "Shisma",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Banana_bread_slices.jpg",
    },
  },
  ovsyanoe_pechenye: {
    source: require('../../assets/recipes/ovsyanoe_pechenye.webp'),
    credit: {
      author: "Paul Martin",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Oatmeal_Cookies_with_orange_zest,_golden_raisins,_and_chocolate_chips.jpg",
    },
  },
  brownie: {
    source: require('../../assets/recipes/brownie.webp'),
    credit: {
      author: "неизвестен",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Chocolate_brownies_without_table.jpg",
    },
  },
  sloenyi_pirog_yabloki: {
    source: require('../../assets/recipes/sloenyi_pirog_yabloki.webp'),
    credit: {
      author: "Karen and Brad Emerson",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Apple_galette_(3926990412).jpg",
    },
  },
  blinchiki_s_tvorogom: {
    source: require('../../assets/recipes/blinchiki_s_tvorogom.webp'),
    credit: {
      author: "Andrevan",
      license: "CC BY-SA 2.5",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5",
      page: "https://commons.wikimedia.org/wiki/File:Cooking_frozen_blintzes_in_a_frying_pan.jpg",
    },
  },
  goryachie_buterbrody: {
    source: require('../../assets/recipes/goryachie_buterbrody.webp'),
    credit: {
      author: "Daderot",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Tunafish_and_Emmenthaler_cheese_sandwich_with_tomato_and_black_pepper_on_multigrain_toast_-_Massachusetts.jpg",
    },
  },
  kartofel_po_derevenski: {
    source: require('../../assets/recipes/kartofel_po_derevenski.webp'),
    credit: {
      author: "Luca Hammer",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Potato_wedges_at_Mensa_Paderborn_(11956794164).jpg",
    },
  },
  pelmeni: {
    source: require('../../assets/recipes/pelmeni.webp'),
    credit: {
      author: "Eugene Kim",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Pelmeni_Russian.jpg",
    },
  },
  frittata_ostatki: {
    source: require('../../assets/recipes/frittata_ostatki.webp'),
    credit: {
      author: "Kolforn",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:-2019-10-27_Potato_%26_onion_frittata,_Cromer.JPG",
    },
  },
  ovoshi_wok: {
    source: require('../../assets/recipes/ovoshi_wok.webp'),
    credit: {
      author: "Alabama Extension",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Stir_Fry_Vegetables_in_Pan_-_49826637657.jpg",
    },
  },
  solyanka: {
    source: require('../../assets/recipes/solyanka.webp'),
    credit: {
      author: "Ogre",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:Soljanka_with_olives.jpg",
    },
  },
  gorohovyi_sup: {
    source: require('../../assets/recipes/gorohovyi_sup.webp'),
    credit: {
      author: "Hortensja Bukietowa",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Erwtensoep03.jpg",
    },
  },
  zelenye_shchi: {
    source: require('../../assets/recipes/zelenye_shchi.webp'),
    credit: {
      author: "Aw58",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Zupa_szczawiowa_z_jajkiem_-_2023.05.22.jpg",
    },
  },
  shchi_kislye: {
    source: require('../../assets/recipes/shchi_kislye.webp'),
    credit: {
      author: "Auctor quaerendae",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:020260320_Sauerkraut_soup.jpg",
    },
  },
  svekolnik: {
    source: require('../../assets/recipes/svekolnik.webp'),
    credit: {
      author: "Continentaleurope",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%C5%A0altibar%C5%A1%C4%8Diai_(cold_beet_soup).jpg",
    },
  },
  okroshka_kvas: {
    source: require('../../assets/recipes/okroshka_kvas.webp'),
    credit: {
      author: "Messir",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%9E%D0%BA%D1%80%D0%BE%D1%88%D0%BA%D0%B0.jpg",
    },
  },
  sup_iz_konservov: {
    source: require('../../assets/recipes/sup_iz_konservov.webp'),
    credit: {
      author: "Aneth David (SLU)",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Fish-and-vegetables-soup.jpg",
    },
  },
  sup_frikadelki: {
    source: require('../../assets/recipes/sup_frikadelki.webp'),
    credit: {
      author: "Biso",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Meat_ball_soup.JPG",
    },
  },
  sup_klyocki: {
    source: require('../../assets/recipes/sup_klyocki.webp'),
    credit: {
      author: "Jonathunder",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:ChickenDumplings.jpg",
    },
  },
  fasolevyi_sup: {
    source: require('../../assets/recipes/fasolevyi_sup.webp'),
    credit: {
      author: "Thomson200",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Senate_bean_soup,_United_States_Capitol_Visitor_Center,_April_2019.jpg",
    },
  },
  sup_cvetnaya_kapusta: {
    source: require('../../assets/recipes/sup_cvetnaya_kapusta.webp'),
    credit: {
      author: "Lablascovegmenu",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Vegan_Cream_of_Cauliflower_soup_(Gluten_Free_Vegan_Girl)_(8389035765).jpg",
    },
  },
  sup_s_pelmenyami: {
    source: require('../../assets/recipes/sup_s_pelmenyami.webp'),
    credit: {
      author: "Kagor",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Pelmeni2.jpg",
    },
  },
  golubcy: {
    source: require('../../assets/recipes/golubcy.webp'),
    credit: {
      author: "Nafisathallah",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Golubtsy_kubis_gulung_2.jpg",
    },
  },
  befstroganov: {
    source: require('../../assets/recipes/befstroganov.webp'),
    credit: {
      author: "Pittaya Sroilong",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Beef_Stroganoff-02_cropped.jpg",
    },
  },
  kotlety_po_kievski: {
    source: require('../../assets/recipes/kotlety_po_kievski.webp'),
    credit: {
      author: "Bev Sykes",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_Kiev_Flickr.jpg",
    },
  },
  myaso_po_francuzski: {
    source: require('../../assets/recipes/myaso_po_francuzski.webp'),
    credit: {
      author: "Olga",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:French_meat.jpg",
    },
  },
  kartoshka_s_myasom: {
    source: require('../../assets/recipes/kartoshka_s_myasom.webp'),
    credit: {
      author: "pelican",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Beef_and_potato_stew_in_Japanese-style_(6225795153).jpg",
    },
  },
  grechka_po_kupecheski: {
    source: require('../../assets/recipes/grechka_po_kupecheski.webp'),
    credit: {
      author: "Jagro",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:%C4%8Cernobyl,_135.jpg",
    },
  },
  azu_po_tatarski: {
    source: require('../../assets/recipes/azu_po_tatarski.webp'),
    credit: {
      author: "Ds02006",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:AzuVealMeal.JPG",
    },
  },
  kurinaya_pechen_s_lukom: {
    source: require('../../assets/recipes/kurinaya_pechen_s_lukom.webp'),
    credit: {
      author: "HaJunkiyada",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Chicken_Liver_with_Chestnuts_and_Rice.jpg",
    },
  },
  seledka_pod_shuboy: {
    source: require('../../assets/recipes/seledka_pod_shuboy.webp'),
    credit: {
      author: "User:Zserghei",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:Selidi_pod_shuboi.jpg",
    },
  },
  mimoza: {
    source: require('../../assets/recipes/mimoza.webp'),
    credit: {
      author: "Anna.verbitskaya",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:-salat-mimoza-klas-mimoza-salat-klassicheskii-s-syrom_1500855758_1_max.jpg",
    },
  },
  kurica_zapechennaya: {
    source: require('../../assets/recipes/kurica_zapechennaya.webp'),
    credit: {
      author: "Jameswasswa",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Whole_spiced_chicken_(roasted).jpg",
    },
  },
  forshmak: {
    source: require('../../assets/recipes/forshmak.webp'),
    credit: {
      author: "foto-lady",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%A4%D0%BE%D1%80%D1%88%D0%BC%D0%B0%D0%BA_%D0%BF%D0%BE-%D0%BE%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B8.jpg",
    },
  },
  pashtet_iz_pecheni: {
    source: require('../../assets/recipes/pashtet_iz_pecheni.webp'),
    credit: {
      author: "TheCulinaryGeek",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_Liver_P%C3%A2t%C3%A9.jpg",
    },
  },
  holodec: {
    source: require('../../assets/recipes/holodec.webp'),
    credit: {
      author: "Gmelfi",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:GelatinaDiMaiale.JPG",
    },
  },
  skumbriya_zapechennaya: {
    source: require('../../assets/recipes/skumbriya_zapechennaya.webp'),
    credit: {
      author: "Леонид Котов",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Baked_Mackereel.jpg",
    },
  },
  makarony_s_syrom: {
    source: require('../../assets/recipes/makarony_s_syrom.webp'),
    credit: {
      author: "Meliciousm",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:The_Only_Original_Alfredo_Sauce_with_Butter_and_Parmesano-Reggiano_Cheese.png",
    },
  },
  pshennaya_kasha: {
    source: require('../../assets/recipes/pshennaya_kasha.webp'),
    credit: {
      author: "Samurai2593",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%93%D0%B0%D1%80%D0%B1%D1%83%D0%B7%D0%BE%D0%B2%D0%BE-%D0%BF%D1%88%D0%BE%D0%BD%D1%8F%D0%BD%D0%B0_%D0%BA%D0%B0%D1%88%D0%B0.jpg",
    },
  },
  mannaya_kasha: {
    source: require('../../assets/recipes/mannaya_kasha.webp'),
    credit: {
      author: "Микола Василечко",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%9C%D0%B0%D0%BD%D0%BD%D0%B0_%D0%BA%D0%B0%D1%88%D0%B0_-_20250808_182334.jpg",
    },
  },
  risovaya_kasha: {
    source: require('../../assets/recipes/risovaya_kasha.webp'),
    credit: {
      author: "OreosDippedwithMilk",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Bubur_nasi_Roza_Roslan.jpg",
    },
  },
  kabachkovaya_ikra: {
    source: require('../../assets/recipes/kabachkovaya_ikra.webp'),
    credit: {
      author: "Off-shell",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Squash_Caviar.jpg",
    },
  },
  baklazhannaya_ikra: {
    source: require('../../assets/recipes/baklazhannaya_ikra.webp'),
    credit: {
      author: "MOs810",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Eggplant_caviar_Chisinau.jpg",
    },
  },
  lecho: {
    source: require('../../assets/recipes/lecho.webp'),
    credit: {
      author: "zeevveez",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Warm_Colors-_my_Mom%27s_Hungarian_Lecs%C3%B3_cropped.jpg",
    },
  },
  kapustnye_kotlety: {
    source: require('../../assets/recipes/kapustnye_kotlety.webp'),
    credit: {
      author: "Nickispeaki",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Vegetable_cutlets_with_cabbage.jpg",
    },
  },
  morkovnye_kotlety: {
    source: require('../../assets/recipes/morkovnye_kotlety.webp'),
    credit: {
      author: "Salil Kumar Mukherjee",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Oats_Diet_Cutlet.jpg",
    },
  },
  yaichnica_s_kolbasoy: {
    source: require('../../assets/recipes/yaichnica_s_kolbasoy.webp'),
    credit: {
      author: "Peachyeung316",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Sausage_and_lunch_meats_with_fried_eggs_from_Man_Fong_Canteen.jpg",
    },
  },
  vareniki_s_kartoshkoy: {
    source: require('../../assets/recipes/vareniki_s_kartoshkoy.webp'),
    credit: {
      author: "DemieK07",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Varenyky_with_Potatoes_-_2026_-04.jpg",
    },
  },
  pelmeni_domashnie: {
    source: require('../../assets/recipes/pelmeni_domashnie.webp'),
    credit: {
      author: "Vyacheslav Argenberg",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Russian_Pelmeni_(Dumplings),_Rostov-on-Don,_Russia.jpg",
    },
  },
  vareniki_s_tvorogom: {
    source: require('../../assets/recipes/vareniki_s_tvorogom.webp'),
    credit: {
      author: "Валентина Тимків",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:20._varenyky_with_cheese_-_add_butter.jpg",
    },
  },
  morkov_po_koreyski: {
    source: require('../../assets/recipes/morkov_po_koreyski.webp'),
    credit: {
      author: "Off-shell",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Korean-style_carrot.jpg",
    },
  },
  salat_s_kalmarami: {
    source: require('../../assets/recipes/salat_s_kalmarami.webp'),
    credit: {
      author: "pelican",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Thai_squid_and_noodle_salad_(8619316942).jpg",
    },
  },
  stolichnyi: {
    source: require('../../assets/recipes/stolichnyi.webp'),
    credit: {
      author: "AlMare",
      license: "CC BY 2.5",
      licenseUrl: "https://creativecommons.org/licenses/by/2.5",
      page: "https://commons.wikimedia.org/wiki/File:Russian_Olivier_salad.jpg",
    },
  },
  vitaminnyi: {
    source: require('../../assets/recipes/vitaminnyi.webp'),
    credit: {
      author: "Книжная пыль",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B0%D0%BB%D0%B0%D1%82_%22%D0%92%D0%B8%D1%82%D0%B0%D0%BC%D0%B8%D0%BD%D0%BD%D1%8B%D0%B9%22.jpg",
    },
  },
  yaichnyi_salat: {
    source: require('../../assets/recipes/yaichnyi_salat.webp'),
    credit: {
      author: "JTs",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Salad_with_bryndza_05.jpg",
    },
  },
  seledka_s_kartoshkoy: {
    source: require('../../assets/recipes/seledka_s_kartoshkoy.webp'),
    credit: {
      author: "W.carter",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Soused_herring,_served_with_potato_salad_and_cucumber.jpg",
    },
  },
  salat_kvashenaya_kapusta: {
    source: require('../../assets/recipes/salat_kvashenaya_kapusta.webp'),
    credit: {
      author: "Loyna",
      license: "CC BY-SA 2.5",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5",
      page: "https://commons.wikimedia.org/wiki/File:Kvaschennaja-kapusta.jpg",
    },
  },
  farshirovannye_yaica: {
    source: require('../../assets/recipes/farshirovannye_yaica.webp'),
    credit: {
      author: "Michele Ursino",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Deviled_eggs_closeup.jpg",
    },
  },
  sosiski_v_teste: {
    source: require('../../assets/recipes/sosiski_v_teste.webp'),
    credit: {
      author: "Kolforn",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:-2019-12-23_Homemade_sausage_rolls,_Trimingham_(1).JPG",
    },
  },
  kartofelnaya_babka: {
    source: require('../../assets/recipes/kartofelnaya_babka.webp'),
    credit: {
      author: "Eugene Zelenko",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Babka_Potato_Dish-2.jpg",
    },
  },
  makaronnik: {
    source: require('../../assets/recipes/makaronnik.webp'),
    credit: {
      author: "Robert Kindermann",
      license: "CC BY-SA 2.5",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5",
      page: "https://commons.wikimedia.org/wiki/File:Pastitsio.jpg",
    },
  },
  pirozhki_s_kapustoy: {
    source: require('../../assets/recipes/pirozhki_s_kapustoy.webp'),
    credit: {
      author: "Silar",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:08602_Karpatisches_Geschmack-Kermes_im_Sanok.jpg",
    },
  },
  kapusta_s_sosiskami: {
    source: require('../../assets/recipes/kapusta_s_sosiskami.webp'),
    credit: {
      author: "Syced",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Sausage,_cabbage,_mustard_at_Italian_restaurant_in_Tokyo.jpg",
    },
  },
  kartoshka_zapechennaya_smetana: {
    source: require('../../assets/recipes/kartoshka_zapechennaya_smetana.webp'),
    credit: {
      author: "Dreamyshade",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Potato_gratin_on_stove.jpg",
    },
  },
  solyanka_rybnaya: {
    source: require('../../assets/recipes/solyanka_rybnaya.webp'),
    credit: {
      author: "Eraevsky",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B5%D0%BB%D1%8F%D0%BD%D0%BA%D0%B0_%D0%B8%D0%B7_%D1%80%D1%8B%D0%B1.jpg",
    },
  },
  gribnaya_pohlebka: {
    source: require('../../assets/recipes/gribnaya_pohlebka.webp'),
    credit: {
      author: "Cajsa Lilliehook",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Mushroom_Barley_Soup_(9117161491).jpg",
    },
  },
  bulon_s_yaicom: {
    source: require('../../assets/recipes/bulon_s_yaicom.webp'),
    credit: {
      author: "Raimond Spekking",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Einlaufsuppe_im_Teller-0372.jpg",
    },
  },
  shnicel_rublenyi: {
    source: require('../../assets/recipes/shnicel_rublenyi.webp'),
    credit: {
      author: "Triplec85",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:2022-02-16_Schnitzel_mit_Pommes_in_der_Cafeteria_der_Kaufm%C3%A4nnischen_Schule_Tauberbischofsheim_01.jpg",
    },
  },
  cvetnaya_kapusta_v_klyare: {
    source: require('../../assets/recipes/cvetnaya_kapusta_v_klyare.webp'),
    credit: {
      author: "UmaDeshpande",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Batter_for_Flower_Manchurian.jpg",
    },
  },
  malosolnye_ogurcy: {
    source: require('../../assets/recipes/malosolnye_ogurcy.webp'),
    credit: {
      author: "WDnet",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Pickled-cucumbers-1520638.jpg",
    },
  },
  kvashenaya_kapusta: {
    source: require('../../assets/recipes/kvashenaya_kapusta.webp'),
    credit: {
      author: "Bdubay",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Sauerkraut_Jar.jpg",
    },
  },
  svekolnaya_ikra: {
    source: require('../../assets/recipes/svekolnaya_ikra.webp'),
    credit: {
      author: "Pannet",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B2%D0%B5%D0%BA%D0%BE%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D0%B8%D0%BA%D1%80%D0%B0_01.jpg",
    },
  },
  belyashi: {
    source: require('../../assets/recipes/belyashi.webp'),
    credit: {
      author: "Йоля",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Belyashi_2.jpg",
    },
  },
  chebureki: {
    source: require('../../assets/recipes/chebureki.webp'),
    credit: {
      author: "Niko Pamplona",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:%D0%A7%D0%B5%D0%B1%D1%83%D1%80%D0%B5%D0%BA%D0%B8._%D0%9E%D1%87%D0%B5%D0%BD%D1%8C_%D0%B2%D0%BA%D1%83%D1%81%D0%BD%D0%BE.jpg",
    },
  },
  lazanya: {
    source: require('../../assets/recipes/lazanya.webp'),
    credit: {
      author: "Breville USA",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Meaty_Lasagna_8of8_(8736299782).jpg",
    },
  },
  pasta_pesto: {
    source: require('../../assets/recipes/pasta_pesto.webp'),
    credit: {
      author: "Marco Del Torchio 95",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Pasta_al_pesto_fatto_in_casa.jpg",
    },
  },
  arrabbiata: {
    source: require('../../assets/recipes/arrabbiata.webp'),
    credit: {
      author: "Petar Milošević",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Penne_Arrabbiata.jpg",
    },
  },
  aglio_olio: {
    source: require('../../assets/recipes/aglio_olio.webp'),
    credit: {
      author: "Bairuilong",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Spaghetti_aglio_e_olio_KB.jpg",
    },
  },
  pasta_primavera: {
    source: require('../../assets/recipes/pasta_primavera.webp'),
    credit: {
      author: "Stacy Spensley",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Pasta_primavera_(1)_(cropped).jpg",
    },
  },
  minestrone: {
    source: require('../../assets/recipes/minestrone.webp'),
    credit: {
      author: "Katrin Morenz",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Minestrone_soup.jpg",
    },
  },
  pizza_domashnyaya: {
    source: require('../../assets/recipes/pizza_domashnyaya.webp'),
    credit: {
      author: "jeffreyw",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Homemade_pizza_(5).jpg",
    },
  },
  bruschetta: {
    source: require('../../assets/recipes/bruschetta.webp'),
    credit: {
      author: "Gunjanpatel10",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Pa_amb_tom%C3%A0quet_-_spanish_tomatos_on_bread.jpg",
    },
  },
  caprese: {
    source: require('../../assets/recipes/caprese.webp'),
    credit: {
      author: "Rainer Zenz",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Caprese-1.jpg",
    },
  },
  nyokki: {
    source: require('../../assets/recipes/nyokki.webp'),
    credit: {
      author: "Armineaghayan",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Gnocchi_with_mussels.jpg",
    },
  },
  pasta_s_krevetkami: {
    source: require('../../assets/recipes/pasta_s_krevetkami.webp'),
    credit: {
      author: "FranHogan",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Shrimp_pasta.jpg",
    },
  },
  baklazhany_parmidzhana: {
    source: require('../../assets/recipes/baklazhany_parmidzhana.webp'),
    credit: {
      author: "Flickr.com user \"Blue Lotus\"",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Melanzane_alla_Parmigiana.jpg",
    },
  },
  panzanella: {
    source: require('../../assets/recipes/panzanella.webp'),
    credit: {
      author: "Missvain",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Sunday_Supper_Aug_2019_-_Stierch_04.jpg",
    },
  },
  ratatouille: {
    source: require('../../assets/recipes/ratatouille.webp'),
    credit: {
      author: "Marcus Guimarães",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Ratatouille.jpg",
    },
  },
  kish_loren: {
    source: require('../../assets/recipes/kish_loren.webp'),
    credit: {
      author: "Arnaud 25",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Quiche_lorraine_04.jpg",
    },
  },
  lukovyi_sup: {
    source: require('../../assets/recipes/lukovyi_sup.webp'),
    credit: {
      author: "jeffreyw",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Mmm...onion_soup_(5344349906).jpg",
    },
  },
  krok_mesye: {
    source: require('../../assets/recipes/krok_mesye.webp'),
    credit: {
      author: "Photogoddle",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Cambodian_Croque_Monsieur.jpg",
    },
  },
  kurica_gorchichnyi_sous: {
    source: require('../../assets/recipes/kurica_gorchichnyi_sous.webp'),
    credit: {
      author: "Kolforn",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:-2019-03-06_Creamy_mustard_chicken_with_broccoli.JPG",
    },
  },
  gratin_dofinua: {
    source: require('../../assets/recipes/gratin_dofinua.webp'),
    credit: {
      author: "Ludovic Péron",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Gratin_dauphinois.jpg",
    },
  },
  salat_nisuaz: {
    source: require('../../assets/recipes/salat_nisuaz.webp'),
    credit: {
      author: "Canterel",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Salade_nicoise.jpg",
    },
  },
  gaspacho: {
    source: require('../../assets/recipes/gaspacho.webp'),
    credit: {
      author: "Bocadorada",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Gazpacho_Cazuela_Barro.jpg",
    },
  },
  tortilya_espanola: {
    source: require('../../assets/recipes/tortilya_espanola.webp'),
    credit: {
      author: "Juan Emilio Prades Bel",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Tortilla_Espa%C3%B1ola.jpg",
    },
  },
  paelya: {
    source: require('../../assets/recipes/paelya.webp'),
    credit: {
      author: "Jan Harenburg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:01_Paella_Valenciana_original.jpg",
    },
  },
  patatas_bravas: {
    source: require('../../assets/recipes/patatas_bravas.webp'),
    credit: {
      author: "Francesc Fort",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Taberna_Che_-_Braves.jpg",
    },
  },
  frikase: {
    source: require('../../assets/recipes/frikase.webp'),
    credit: {
      author: "Chicken_fricassee-01.jpg",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_fricassee-01-3.jpg",
    },
  },
  tartiflet: {
    source: require('../../assets/recipes/tartiflet.webp'),
    credit: {
      author: "Benoît Prieur",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Une_tartiflette_sortie_du_four.jpg",
    },
  },
  rizotto_s_kuricey: {
    source: require('../../assets/recipes/rizotto_s_kuricey.webp'),
    credit: {
      author: "Kolforn",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:-2020-01-16_Lemon_Chicken_Risotto_with_Parmesan,_Trimingham_(2).JPG",
    },
  },
  saltimbokka: {
    source: require('../../assets/recipes/saltimbokka.webp'),
    credit: {
      author: "Arnaud 25",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Saltimbocca_01.jpg",
    },
  },
  polpette: {
    source: require('../../assets/recipes/polpette.webp'),
    credit: {
      author: "Myself",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Polpette_in_umido_con_piselli.JPG",
    },
  },
  hachapuri_po_imeretinski: {
    source: require('../../assets/recipes/hachapuri_po_imeretinski.webp'),
    credit: {
      author: "Vyacheslav Argenberg",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Old_Tbilisi,_Georgian_khachapuri,_Georgia.jpg",
    },
  },
  harcho: {
    source: require('../../assets/recipes/harcho.webp'),
    credit: {
      author: "A.Savin",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Kharcho_meat_soup.jpg",
    },
  },
  chahohbili: {
    source: require('../../assets/recipes/chahohbili.webp'),
    credit: {
      author: "Victor Vizu",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:%D0%A7%D0%B0%D1%85%D0%BE%D1%85%D0%B1%D0%B8%D0%BB%D0%B8.JPG",
    },
  },
  lobio: {
    source: require('../../assets/recipes/lobio.webp'),
    credit: {
      author: "Georgian Recipes",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Lobio_with_summer_savory_and_ajika.jpg",
    },
  },
  adzhapsandali: {
    source: require('../../assets/recipes/adzhapsandali.webp'),
    credit: {
      author: "Georgian Recipes",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Ajapsandali_-_Georgian_eggplant_stew.jpg",
    },
  },
  phali_shpinat: {
    source: require('../../assets/recipes/phali_shpinat.webp'),
    credit: {
      author: "Georgi1",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Ispanakhis_pkhali.JPG",
    },
  },
  chkmeruli: {
    source: require('../../assets/recipes/chkmeruli.webp'),
    credit: {
      author: "Francesc Fort",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Shkmeruli_al_Batumi_Val%C3%A8ncia.jpg",
    },
  },
  kurica_tabaka: {
    source: require('../../assets/recipes/kurica_tabaka.webp'),
    credit: {
      author: "Pannet",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%A6%D1%8B%D0%BF%D0%BB%D0%B5%D0%BD%D0%BE%D0%BA_%D1%82%D0%B0%D0%B1%D0%B0%D0%BA%D0%B0.jpg",
    },
  },
  chihirtma: {
    source: require('../../assets/recipes/chihirtma.webp'),
    credit: {
      author: "Lamro",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Chikhirtma.jpg",
    },
  },
  shashlyk_v_duhovke: {
    source: require('../../assets/recipes/shashlyk_v_duhovke.webp'),
    credit: {
      author: "Limited fantasy",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Shashlik_made_of_pork.jpg",
    },
  },
  kyufta_bozbash: {
    source: require('../../assets/recipes/kyufta_bozbash.webp'),
    credit: {
      author: "Interfase",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Azerbaijani_kufta-bozbash_2.jpg",
    },
  },
  lagman: {
    source: require('../../assets/recipes/lagman.webp'),
    credit: {
      author: "Svetlov Artem",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Lagman_Moscow_2023.jpg",
    },
  },
  shurpa: {
    source: require('../../assets/recipes/shurpa.webp'),
    credit: {
      author: "Bgelo777",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Chorba_cooked_in_the_home_kitchen.jpg",
    },
  },
  manty: {
    source: require('../../assets/recipes/manty.webp'),
    credit: {
      author: "Scudsvlad",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Manti_1.jpg",
    },
  },
  plov_uzbekskiy: {
    source: require('../../assets/recipes/plov_uzbekskiy.webp'),
    credit: {
      author: "赤猫法師",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Uzbekistan_style_plov_in_Japan.jpg",
    },
  },
  samsa: {
    source: require('../../assets/recipes/samsa.webp'),
    credit: {
      author: "N509FZ",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Samsa_at_G%C3%BClhan_Restaurant,_Beijing_(20210402171539).jpg",
    },
  },
  humus: {
    source: require('../../assets/recipes/humus.webp'),
    credit: {
      author: "Paul Goyette",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Hummus_from_The_Nile.jpg",
    },
  },
  falafel: {
    source: require('../../assets/recipes/falafel.webp'),
    credit: {
      author: "Miansari66",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Falafel_1.JPG",
    },
  },
  tabule: {
    source: require('../../assets/recipes/tabule.webp'),
    credit: {
      author: "cyclonebill",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Flickr_-_cyclonebill_-_Tabbouleh.jpg",
    },
  },
  baba_ganush: {
    source: require('../../assets/recipes/baba_ganush.webp'),
    credit: {
      author: "CNEcija12345",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Baba_ghanoush_food.jpg",
    },
  },
  lyulya_kebab: {
    source: require('../../assets/recipes/lyulya_kebab.webp'),
    credit: {
      author: "Lesya Dolyk",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Lula_kebab.jpg",
    },
  },
  fattush: {
    source: require('../../assets/recipes/fattush.webp'),
    credit: {
      author: "неизвестен",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:Fattoush.JPG",
    },
  },
  shaverma: {
    source: require('../../assets/recipes/shaverma.webp'),
    credit: {
      author: "Vera Yu and David Li",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Shawarma-sandwich-01.jpg",
    },
  },
  mudzhaddara: {
    source: require('../../assets/recipes/mudzhaddara.webp'),
    credit: {
      author: "Bazel",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Mujaddara.jpg",
    },
  },
  menemen: {
    source: require('../../assets/recipes/menemen.webp'),
    credit: {
      author: "E4024",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Turkish_egg_dish_Menemen.jpg",
    },
  },
  imam_bayaldy: {
    source: require('../../assets/recipes/imam_bayaldy.webp'),
    credit: {
      author: "E4024",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Imam_bay%C4%B1ld%C4%B1.jpg",
    },
  },
  kutaby: {
    source: require('../../assets/recipes/kutaby.webp'),
    credit: {
      author: "Interfase",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Azerbaijani_national_dish_Qutab_with_herbs.jpg",
    },
  },
  hinkali: {
    source: require('../../assets/recipes/hinkali.webp'),
    credit: {
      author: "Francesc Fort",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Khinkali_-_Batumi.jpg",
    },
  },
  sacivi: {
    source: require('../../assets/recipes/sacivi.webp'),
    credit: {
      author: "Francesc Fort",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Satsivi_a_Val%C3%A8ncia.jpg",
    },
  },
  kurica_tikka_masala: {
    source: require('../../assets/recipes/kurica_tikka_masala.webp'),
    credit: {
      author: "Lance Vanlewen",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_Tikka_Masala_on_White_Plate_with_Spoon.jpg",
    },
  },
  dal: {
    source: require('../../assets/recipes/dal.webp'),
    credit: {
      author: "Pelican",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Dal_soup_(Indian_lentil_dish).jpg",
    },
  },
  alu_gobi: {
    source: require('../../assets/recipes/alu_gobi.webp'),
    credit: {
      author: "неизвестен",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Aloo_gobi.jpg",
    },
  },
  chana_masala: {
    source: require('../../assets/recipes/chana_masala.webp'),
    credit: {
      author: "Parzeus",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Chana_Masala_in_Paul%C3%ADnia,_2023-10-16.jpg",
    },
  },
  palak_panir: {
    source: require('../../assets/recipes/palak_panir.webp'),
    credit: {
      author: "DreamyFlutura11",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Palak_Paneer_(Cottage_cheese_in_spinach_gravy).jpg",
    },
  },
  biryani: {
    source: require('../../assets/recipes/biryani.webp'),
    credit: {
      author: "Jyothis",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Shrimp_Biriyani.JPG",
    },
  },
  pad_tay: {
    source: require('../../assets/recipes/pad_tay.webp'),
    credit: {
      author: "Takeaway",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Phat_Thai_kung_Chang_Khien_street_stall.jpg",
    },
  },
  tom_yam: {
    source: require('../../assets/recipes/tom_yam.webp'),
    credit: {
      author: "David",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:Tom_Yum_Soup.JPG",
    },
  },
  kung_pao: {
    source: require('../../assets/recipes/kung_pao.webp'),
    credit: {
      author: "N509FZ",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Kung_Pao_Chicken_at_Yujiayan_Restaurant_(20230510123120).jpg",
    },
  },
  svinina_kislo_sladkaya: {
    source: require('../../assets/recipes/svinina_kislo_sladkaya.webp'),
    credit: {
      author: "Walter Grassroot",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:%E8%8F%A0%E8%90%9D%E5%92%95%E5%99%9C%E8%82%89.jpg",
    },
  },
  udon_s_kuricey: {
    source: require('../../assets/recipes/udon_s_kuricey.webp'),
    credit: {
      author: "Flickr.com user \"Blue Lotus\"",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Yaki-udon.jpg",
    },
  },
  okonomiyaki: {
    source: require('../../assets/recipes/okonomiyaki.webp'),
    credit: {
      author: "ume-y",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Okonomiyaki_001.jpg",
    },
  },
  yakitori: {
    source: require('../../assets/recipes/yakitori.webp'),
    credit: {
      author: "Francesc Fort",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Yakitori_-_Tora.jpg",
    },
  },
  fo_bo: {
    source: require('../../assets/recipes/fo_bo.webp'),
    credit: {
      author: "Andy Li",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Pho_Bo_by_Banh_%26_Mee_in_Kirkgate_Market.jpg",
    },
  },
  govyadina_s_brokkoli: {
    source: require('../../assets/recipes/govyadina_s_brokkoli.webp'),
    credit: {
      author: "Joy",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Beef_and_broccoli_stir_fry.jpg",
    },
  },
  zelenyi_karri: {
    source: require('../../assets/recipes/zelenyi_karri.webp'),
    credit: {
      author: "Takeaway",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Thai_green_chicken_curry_and_roti.jpg",
    },
  },
  bibimbap: {
    source: require('../../assets/recipes/bibimbap.webp'),
    credit: {
      author: "abex",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Korean.food-Bibimbap-02.jpg",
    },
  },
  funchoza_po_koreyski: {
    source: require('../../assets/recipes/funchoza_po_koreyski.webp'),
    credit: {
      author: "ayustety",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Korean.food-Chapchae-01.jpg",
    },
  },
  ramen_domashniy: {
    source: require('../../assets/recipes/ramen_domashniy.webp'),
    credit: {
      author: "Ocdp",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Ramen_Jump_002.jpg",
    },
  },
  yaichnyi_sup: {
    source: require('../../assets/recipes/yaichnyi_sup.webp'),
    credit: {
      author: "неизвестен",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Egg_drop_soup.jpg",
    },
  },
  tom_kha_kay: {
    source: require('../../assets/recipes/tom_kha_kay.webp'),
    credit: {
      author: "lydiajoy1",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Tom_kha_gai2.jpg",
    },
  },
  losos_teriyaki: {
    source: require('../../assets/recipes/losos_teriyaki.webp'),
    credit: {
      author: "Calvin Marquess",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Salmon_Teriyaki.jpg",
    },
  },
  tofu_s_ovoshami: {
    source: require('../../assets/recipes/tofu_s_ovoshami.webp'),
    credit: {
      author: "неизвестен",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Tofu_stir-fry.jpeg",
    },
  },
  pakora: {
    source: require('../../assets/recipes/pakora.webp'),
    credit: {
      author: "ampersandyslexia",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Pakoras_in_Jaipur.jpg",
    },
  },
  naan: {
    source: require('../../assets/recipes/naan.webp'),
    credit: {
      author: "Ganesh Mohan T",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Butter_Naan_2.jpg",
    },
  },
  raita: {
    source: require('../../assets/recipes/raita.webp'),
    credit: {
      author: "Bssasidhar",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Onion_raita(Close_up).jpg",
    },
  },
  chili_kon_karne: {
    source: require('../../assets/recipes/chili_kon_karne.webp'),
    credit: {
      author: "cyclonebill",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Flickr_-_cyclonebill_-_Chili_con_carne_(2).jpg",
    },
  },
  tako: {
    source: require('../../assets/recipes/tako.webp'),
    credit: {
      author: "Larry Miller",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:001_Tacos_de_carnitas,_carne_asada_y_al_pastor.jpg",
    },
  },
  kesadilya: {
    source: require('../../assets/recipes/kesadilya.webp'),
    credit: {
      author: "Mike Peel",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:At_Long_Island_2023_267.jpg",
    },
  },
  gvakamole: {
    source: require('../../assets/recipes/gvakamole.webp'),
    credit: {
      author: "Nikodem Nijaki",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Guacamole_IMGP1271.jpg",
    },
  },
  burger_domashniy: {
    source: require('../../assets/recipes/burger_domashniy.webp'),
    credit: {
      author: "Renee Comet (photographer)",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:Cheeseburger.jpg",
    },
  },
  mak_n_chiz: {
    source: require('../../assets/recipes/mak_n_chiz.webp'),
    credit: {
      author: "Stuart Spivack",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Flickr_stuart_spivack_173603796--Macaroni_and_cheese.jpg",
    },
  },
  pankeyki: {
    source: require('../../assets/recipes/pankeyki.webp'),
    credit: {
      author: "Mae Mu",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Foodiesfeed.com_pouring-honey-on-pancakes-with-walnuts.jpg",
    },
  },
  rybnyi_chauder: {
    source: require('../../assets/recipes/rybnyi_chauder.webp'),
    credit: {
      author: "Nate Steiner",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Fishchowder.jpg",
    },
  },
  sendvich_klab: {
    source: require('../../assets/recipes/sendvich_klab.webp'),
    credit: {
      author: "Peachyeung316",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Club_sandwiches_in_hong_kong.jpg",
    },
  },
  kurinye_krylya_bbq: {
    source: require('../../assets/recipes/kurinye_krylya_bbq.webp'),
    credit: {
      author: "JIP",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_wings_as_a_night_snack.jpg",
    },
  },
  shvedskie_frikadelki: {
    source: require('../../assets/recipes/shvedskie_frikadelki.webp'),
    credit: {
      author: "Vincenty846",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Swedish_Meatballs_IKEA_Kota_Baru_Parahyangan.jpg",
    },
  },
  shnicel: {
    source: require('../../assets/recipes/shnicel.webp'),
    credit: {
      author: "Burkhard Mücke",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:2022-12-29_Wiener_Schnitzel_im_Hotel_Kaiserin_Elisabeth.jpg",
    },
  },
  kartofelnyi_salat_nemeckiy: {
    source: require('../../assets/recipes/kartofelnyi_salat_nemeckiy.webp'),
    credit: {
      author: "jules",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:German_potato_salad.jpg",
    },
  },
  bigos: {
    source: require('../../assets/recipes/bigos.webp'),
    credit: {
      author: "Xylotet",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Bigos_(Malta).jpg",
    },
  },
  gulyashovyi_sup: {
    source: require('../../assets/recipes/gulyashovyi_sup.webp'),
    credit: {
      author: "Silar",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:02021_1020_(2)_Goulash_soup_of_Poland.jpg",
    },
  },
  musaka: {
    source: require('../../assets/recipes/musaka.webp'),
    credit: {
      author: "Andy Li",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Meat_Moussaka_-_Kouzina,_Brighton_2023-11-24.jpg",
    },
  },
  caciki: {
    source: require('../../assets/recipes/caciki.webp'),
    credit: {
      author: "Nikodem Nijaki",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Tzatziki_IMGP1376.jpg",
    },
  },
  suvlaki: {
    source: require('../../assets/recipes/suvlaki.webp'),
    credit: {
      author: "Miyagawa",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Souvlaki_in_Athens.JPG",
    },
  },
  fasolada: {
    source: require('../../assets/recipes/fasolada.webp'),
    credit: {
      author: "Gordon Joly",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Fasolada,_2006.jpg",
    },
  },
  shopska: {
    source: require('../../assets/recipes/shopska.webp'),
    credit: {
      author: "Popo le Chien",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Chopska.jpg",
    },
  },
  krupnik: {
    source: require('../../assets/recipes/krupnik.webp'),
    credit: {
      author: "Aw58",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Krupnik_-_2023.10.15.jpg",
    },
  },
  angliyskiy_zavtrak: {
    source: require('../../assets/recipes/angliyskiy_zavtrak.webp'),
    credit: {
      author: "Acabashi",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Full_English_breakfast_at_the_Chalet_Cafe,_Cowfold,_West_Sussex,_England.jpg",
    },
  },
  shotlandskie_yayca: {
    source: require('../../assets/recipes/shotlandskie_yayca.webp'),
    credit: {
      author: "Larry D. Moore",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Texas_folklife_festival_scotch_2013.jpg",
    },
  },
  ris_s_fasolyu: {
    source: require('../../assets/recipes/ris_s_fasolyu.webp'),
    credit: {
      author: "ChildofMidnight",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Curry_Goat_with_rice_and_peas_(in_this_case_kidney_beans).jpg",
    },
  },
  fahitas: {
    source: require('../../assets/recipes/fahitas.webp'),
    credit: {
      author: "Missvain",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_fajitas_-_La_Hacienda_-_Sarah_Stierch.jpg",
    },
  },
  burrito: {
    source: require('../../assets/recipes/burrito.webp'),
    credit: {
      author: "samuelfernandezrivera",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Burrito.JPG",
    },
  },
  kukuruznyi_chauder: {
    source: require('../../assets/recipes/kukuruznyi_chauder.webp'),
    credit: {
      author: "tomatoes and friends",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Vegan_Garden_Corn_Chowder_with_Chives_(cropped).jpg",
    },
  },
  israilskiy_salat: {
    source: require('../../assets/recipes/israilskiy_salat.webp'),
    credit: {
      author: "Gila Brand",
      license: "CC BY 2.5",
      licenseUrl: "https://creativecommons.org/licenses/by/2.5",
      page: "https://commons.wikimedia.org/wiki/File:Salad.jpg",
    },
  },
  heshbrauny: {
    source: require('../../assets/recipes/heshbrauny.webp'),
    credit: {
      author: "Jason Zhang",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Hash_browns_on_white_plate.jpg",
    },
  },
  galushki: {
    source: require('../../assets/recipes/galushki.webp'),
    credit: {
      author: "Matus Kacmar",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Bryndzov%C3%A9_halu%C5%A1ky.jpg",
    },
  },
  lohikeitto: {
    source: require('../../assets/recipes/lohikeitto.webp'),
    credit: {
      author: "Tuijasal",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Lohikeitto.jpg",
    },
  },
  gravlaks: {
    source: require('../../assets/recipes/gravlaks.webp'),
    credit: {
      author: "Tiia Monto",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Gravlax_2.jpg",
    },
  },
  hasselbak: {
    source: require('../../assets/recipes/hasselbak.webp'),
    credit: {
      author: "Aurus Sy",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Hasselback_Potatoes.jpg",
    },
  },
  kugel: {
    source: require('../../assets/recipes/kugel.webp'),
    credit: {
      author: "Rebecca Siegel",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Potato_kugel.jpg",
    },
  },
  merdzhimek: {
    source: require('../../assets/recipes/merdzhimek.webp'),
    credit: {
      author: "E4024",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Mercimek_%C3%A7orbas%C4%B1.jpg",
    },
  },
  pide: {
    source: require('../../assets/recipes/pide.webp'),
    credit: {
      author: "Maksym Kozlenko",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:2019-07-27_Turkish_pide_with_cheese_at_Istanbul_restaurant.jpg",
    },
  },
  lahmadzhun: {
    source: require('../../assets/recipes/lahmadzhun.webp'),
    credit: {
      author: "Rainer Zenz",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Lahmacun.jpg",
    },
  },
  biber_dolma: {
    source: require('../../assets/recipes/biber_dolma.webp'),
    credit: {
      author: "Tess Mattew",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:2025.09.02_Stuffed_Peppers_Paprika_in_Belarus_by_Dina_Panayotis.jpg",
    },
  },
  mercimek_kofte: {
    source: require('../../assets/recipes/mercimek_kofte.webp'),
    credit: {
      author: "Samizambak",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Izmir_mercimek_k%C3%B6ftesi.jpg",
    },
  },
  hashlama: {
    source: require('../../assets/recipes/hashlama.webp'),
    credit: {
      author: "Dav Sargsyan",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Lamb_khashlama.jpg",
    },
  },
  dovga: {
    source: require('../../assets/recipes/dovga.webp'),
    credit: {
      author: "Urek Meniashvili",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Azerbaijani_dov%C4%9Fa.JPG",
    },
  },
  dimlama: {
    source: require('../../assets/recipes/dimlama.webp'),
    credit: {
      author: "mismailovs",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Dimlama_(16425713838).jpg",
    },
  },
  beshbarmak: {
    source: require('../../assets/recipes/beshbarmak.webp'),
    credit: {
      author: "NataAllice",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%91%D0%B5%D1%88%D0%B1%D0%B0%D1%80%D0%BC%D0%B0%D0%BA_-_%D0%BA%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D0%BA%D0%BE%D0%B5_%D0%BD%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5_%D0%B1%D0%BB%D1%8E%D0%B4%D0%BE.jpg",
    },
  },
  echpochmak: {
    source: require('../../assets/recipes/echpochmak.webp'),
    credit: {
      author: "Qweasdqwe",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Echpochmak2.jpg",
    },
  },
  ogurcy_po_kitayski: {
    source: require('../../assets/recipes/ogurcy_po_kitayski.webp'),
    credit: {
      author: "Benoît Prieur",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Pine_and_Crane_DTLA_-_smashed_cucumber_salad.jpg",
    },
  },
  oyakodon: {
    source: require('../../assets/recipes/oyakodon.webp'),
    credit: {
      author: "Ocdp",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Oyakodon_005.jpg",
    },
  },
  karaage: {
    source: require('../../assets/recipes/karaage.webp'),
    credit: {
      author: "Ocdp",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_karaage_003.jpg",
    },
  },
  pulkogi: {
    source: require('../../assets/recipes/pulkogi.webp'),
    credit: {
      author: "Debbie Tingzon",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Bulgogi_4.jpg",
    },
  },
  mapo_tofu: {
    source: require('../../assets/recipes/mapo_tofu.webp'),
    credit: {
      author: "Sichuanfoodlover",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Authentic_Mapo_Tofu.jpg",
    },
  },
  chou_mein: {
    source: require('../../assets/recipes/chou_mein.webp'),
    credit: {
      author: "Gaurav Dhwaj Khadka",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_Chow_mein_1.jpg",
    },
  },
  ban_mi: {
    source: require('../../assets/recipes/ban_mi.webp'),
    credit: {
      author: "Bahnfrend",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Vietnamese_Grilled_Pork_B%C3%A1nh_M%C3%AC,_B%C3%A1nh_M%C3%AC_B%C3%A1nh_M%C3%AC_Westfield_Carousel,_2026_(01).jpg",
    },
  },
  tayskiy_salat_govyadina: {
    source: require('../../assets/recipes/tayskiy_salat_govyadina.webp'),
    credit: {
      author: "Sharon Chen",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Thai_Beef_Salad_(28864041891).jpg",
    },
  },
  nasi_goreng: {
    source: require('../../assets/recipes/nasi_goreng.webp'),
    credit: {
      author: "Helito",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Nasi_goreng_indonesia.jpg",
    },
  },
  sate: {
    source: require('../../assets/recipes/sate.webp'),
    credit: {
      author: "Elly Suhailee",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:CHICKEN_SATAY.jpg",
    },
  },
  tazhin: {
    source: require('../../assets/recipes/tazhin.webp'),
    credit: {
      author: "Foodista",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Moroccan_food-Chicken_tagine_with_preserved_lemons_and_olives-01.jpg",
    },
  },
  harira: {
    source: require('../../assets/recipes/harira.webp'),
    credit: {
      author: "Mountaflou",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Harira_d%27aflou.jpg",
    },
  },
  kuskus_s_kuricey: {
    source: require('../../assets/recipes/kuskus_s_kuricey.webp'),
    credit: {
      author: "HaJunkiyada",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Algerian_couscous_with_vegetable_soup_and_chicken.jpg",
    },
  },
  grudka_gril: {
    source: require('../../assets/recipes/grudka_gril.webp'),
    credit: {
      author: "Gerda Arendt",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Grilled_chicken_breast,_Santo_Domingo,_La_Palma.jpg",
    },
  },
  losos_s_brokkoli: {
    source: require('../../assets/recipes/losos_s_brokkoli.webp'),
    credit: {
      author: "Famartin",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:2022-01-29_20_53_20_Blackened_Cajun_Salmon_(6_oz._blackened_and_grilled_salmon_fillet_with_garlic_mashed_potatoes_and_steamed_broccoli)_at_the_Applebee%27s_in_Fair_Lakes,_Fairfax_County,_Virginia.jpg",
    },
  },
  salat_tunec_fasol: {
    source: require('../../assets/recipes/salat_tunec_fasol.webp'),
    credit: {
      author: "Katrin Gilger",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Insalata_di_Fagioli_e_Tonno_%E2%80%93_Bohnensalat_mit_Thunfisch_(7327273414).jpg",
    },
  },
  batat_zapechennyi: {
    source: require('../../assets/recipes/batat_zapechennyi.webp'),
    credit: {
      author: "국립국어원",
      license: "CC BY-SA 2.0 kr",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Gungoguma_(roasted_sweet_potatoes)_2.jpg",
    },
  },
  omlet_belki_shpinat: {
    source: require('../../assets/recipes/omlet_belki_shpinat.webp'),
    credit: {
      author: "Ewan Munro",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Artillery_Arms,_St_Lukes,_London_(3599600661).jpg",
    },
  },
  ovsyanoblin: {
    source: require('../../assets/recipes/ovsyanoblin.webp'),
    credit: {
      author: "Clem Rutter, Rochester, Kent.",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Staffordshire_oatcakes_3729.JPG",
    },
  },
  smuzi_boul: {
    source: require('../../assets/recipes/smuzi_boul.webp'),
    credit: {
      author: "Miscellaneous contributor",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Green_smoothie_bowl.jpg",
    },
  },
  grechka_s_ovoshami: {
    source: require('../../assets/recipes/grechka_s_ovoshami.webp'),
    credit: {
      author: "Lablascovegmenu",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Buckwheat_with_vegetables_-_Trigo_sarraceno_con_verduras_(5517506342).jpg",
    },
  },
  krem_sup_brokkoli: {
    source: require('../../assets/recipes/krem_sup_brokkoli.webp'),
    credit: {
      author: "Alpha",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Cream_of_broccoli_soup.jpg",
    },
  },
  krem_sup_tykva: {
    source: require('../../assets/recipes/krem_sup_tykva.webp'),
    credit: {
      author: "cala_maffia",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Autumn_Soup_(Unsplash)_cropped.jpg",
    },
  },
  salat_kurica_avokado: {
    source: require('../../assets/recipes/salat_kurica_avokado.webp'),
    credit: {
      author: "Alpha",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Salad_of_Poached_Chicken_with_Avocado,_Rocket_Peach_and_Radish_(67408669).jpg",
    },
  },
  farshirovannye_kabachki: {
    source: require('../../assets/recipes/farshirovannye_kabachki.webp'),
    credit: {
      author: "EgorovaSvetlana",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Stuffed_Zucchini_Cooking_in_Newton_Massachusetts.jpg",
    },
  },
  farshirovannye_shampinony: {
    source: require('../../assets/recipes/farshirovannye_shampinony.webp'),
    credit: {
      author: "Tomwsulcer",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Stuffed_mushrooms_at_a_party.JPG",
    },
  },
  cvetnaya_kapusta_zapechennaya: {
    source: require('../../assets/recipes/cvetnaya_kapusta_zapechennaya.webp'),
    credit: {
      author: "HaJunkiyada",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_%E2%80%93_Whole_roasted_cauliflower.jpg",
    },
  },
  brokkoli_s_chesnokom: {
    source: require('../../assets/recipes/brokkoli_s_chesnokom.webp'),
    credit: {
      author: "Daderot",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Yellow-fin_tuna_and_broccoli,_roasted_with_garlic_olive_oil,_salt,_and_black_pepper_-_Massachusetts.jpg",
    },
  },
  kabachkovaya_lazanya: {
    source: require('../../assets/recipes/kabachkovaya_lazanya.webp'),
    credit: {
      author: "USDAgov",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:Child_Care_Recipes_(Team_Nutiriton)_(20212203-FNS-UNC-8847).jpg",
    },
  },
  salat_ogurcy_yogurt: {
    source: require('../../assets/recipes/salat_ogurcy_yogurt.webp'),
    credit: {
      author: "АннаМариа",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%A2%D0%B0%D1%80%D0%B0%D1%82%D1%83%D1%80_01.jpg",
    },
  },
  kurinyi_sup_ovoshi: {
    source: require('../../assets/recipes/kurinyi_sup_ovoshi.webp'),
    credit: {
      author: "Cajsa Lilliehook",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Chicken_Vegetable_Soup_(8731954951).jpg",
    },
  },
  postnyi_borsch: {
    source: require('../../assets/recipes/postnyi_borsch.webp'),
    credit: {
      author: "Karmosin~commonswiki",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Borscht.jpg",
    },
  },
  gorohovyi_sup_postnyi: {
    source: require('../../assets/recipes/gorohovyi_sup_postnyi.webp'),
    credit: {
      author: "Mx. Granger",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Amy%27s_split_pea_soup.jpg",
    },
  },
  kartoshka_s_gribami_duhovka: {
    source: require('../../assets/recipes/kartoshka_s_gribami_duhovka.webp'),
    credit: {
      author: "Dave Gammon",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Filet_mignon_with_mushrooms_and_vegetables.jpg",
    },
  },
  kotlety_iz_chechevicy: {
    source: require('../../assets/recipes/kotlety_iz_chechevicy.webp'),
    credit: {
      author: "неизвестен",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Vegan_patties_with_potatoes_and_salad.jpg",
    },
  },
  kotlety_iz_nuta: {
    source: require('../../assets/recipes/kotlety_iz_nuta.webp'),
    credit: {
      author: "Abi Porter",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Curry_chickpea_burgers_(4900258232).jpg",
    },
  },
  makarony_s_gribami: {
    source: require('../../assets/recipes/makarony_s_gribami.webp'),
    credit: {
      author: "Nikchick",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Pasta_of_the_Day.jpg",
    },
  },
  gribnoy_plov: {
    source: require('../../assets/recipes/gribnoy_plov.webp'),
    credit: {
      author: "pelican",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Mushroom_pilaf_(2058676726).jpg",
    },
  },
  postnye_golubcy: {
    source: require('../../assets/recipes/postnye_golubcy.webp'),
    credit: {
      author: "HaJunkiyada",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Stuffed_cabbage_(homemade).jpg",
    },
  },
  baklazhany_s_orehami: {
    source: require('../../assets/recipes/baklazhany_s_orehami.webp'),
    credit: {
      author: "TDP34",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Roulade_aubergines_noix_-_la_cuisine_arm%C3%A9nienne.jpg",
    },
  },
  fasol_v_tomate: {
    source: require('../../assets/recipes/fasol_v_tomate.webp'),
    credit: {
      author: "Mk2010",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Baked_beans_in_tomato_sauce.jpg",
    },
  },
  postnye_bliny: {
    source: require('../../assets/recipes/postnye_bliny.webp'),
    credit: {
      author: "David Monniaux",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Crepes_dsc07085.jpg",
    },
  },
  postnye_oladi: {
    source: require('../../assets/recipes/postnye_oladi.webp'),
    credit: {
      author: "Man vyi",
      license: "Public domain",
      licenseUrl: "",
      page: "https://commons.wikimedia.org/wiki/File:Apple_fritters_in_cider_batter.jpg",
    },
  },
  ovsyanka_yabloko: {
    source: require('../../assets/recipes/ovsyanka_yabloko.webp'),
    credit: {
      author: "Shisma",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Apple_cinnamon_oatmeal.jpg",
    },
  },
  chechevica_s_ovoshami: {
    source: require('../../assets/recipes/chechevica_s_ovoshami.webp'),
    credit: {
      author: "Abraham",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:20221217_lentil_soup_Katowice_Panewniki.jpg",
    },
  },
  risovaya_kasha_kokos: {
    source: require('../../assets/recipes/risovaya_kasha_kokos.webp'),
    credit: {
      author: "OreosDippedwithMilk",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Pudding_Som_Som_Strawberi_Roza_Roslan.jpg",
    },
  },
  postnye_draniki: {
    source: require('../../assets/recipes/postnye_draniki.webp'),
    credit: {
      author: "Raimond Spekking",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Frische,_selbstgemachte_Reibekuchen-8786.jpg",
    },
  },
  rassolnik_postnyi: {
    source: require('../../assets/recipes/rassolnik_postnyi.webp'),
    credit: {
      author: "Шнапс",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:%D0%A0%D0%B0%D1%81%D1%81%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA_%D0%BF%D0%BE-%D0%BB%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B8.JPG",
    },
  },
  pashtet_fasol: {
    source: require('../../assets/recipes/pashtet_fasol.webp'),
    credit: {
      author: "Didriks",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:White_bean_dip_with_garnish.jpg",
    },
  },
  risovaya_lapsha_ovoshi: {
    source: require('../../assets/recipes/risovaya_lapsha_ovoshi.webp'),
    credit: {
      author: "Luca Nebuloni",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Rice_noodles_with_vegetables_%26_soia_sauce_(5771158925).jpg",
    },
  },
  gribnaya_ikra: {
    source: require('../../assets/recipes/gribnaya_ikra.webp'),
    credit: {
      author: "J Doll",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Walnut_Mushroom_Pate_(140491045).jpeg",
    },
  },
  kuskus_s_ovoshami: {
    source: require('../../assets/recipes/kuskus_s_ovoshami.webp'),
    credit: {
      author: "HaJunkiyada",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Algerian_Couscous_with_Vegetables.jpg",
    },
  },
  yaichnica_boltunya: {
    source: require('../../assets/recipes/yaichnica_boltunya.webp'),
    credit: {
      author: "Takeaway",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Scrambed_eggs.jpg",
    },
  },
  yayca_pashot_tost: {
    source: require('../../assets/recipes/yayca_pashot_tost.webp'),
    credit: {
      author: "Kolforn",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:-2019-07-11_Poached_egg_with_watercress_on_toast,_Cromer.JPG",
    },
  },
  sendvich_tunec: {
    source: require('../../assets/recipes/sendvich_tunec.webp'),
    credit: {
      author: "jeffreyw",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Tuna_salad_sandwich_(1).jpg",
    },
  },
  makarony_s_sosiskami: {
    source: require('../../assets/recipes/makarony_s_sosiskami.webp'),
    credit: {
      author: "JIP",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Sausages_with_chicken_pasta.jpg",
    },
  },
  lavash_s_kuricey: {
    source: require('../../assets/recipes/lavash_s_kuricey.webp'),
    credit: {
      author: "Takeaway",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Smoked_chicken_and_avocado_wrap.jpg",
    },
  },
  pizza_na_lavashe: {
    source: require('../../assets/recipes/pizza_na_lavashe.webp'),
    credit: {
      author: "HaJunkiyada",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Homemade_tortilla_pizza.jpg",
    },
  },
  kartoshka_mikrovolnovka: {
    source: require('../../assets/recipes/kartoshka_mikrovolnovka.webp'),
    credit: {
      author: "Julle",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Midsommarmat_2025_08.jpg",
    },
  },
  sup_vermishel_yaico: {
    source: require('../../assets/recipes/sup_vermishel_yaico.webp'),
    credit: {
      author: "Silar",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:07994_chicken_soup,_with_egg_noodles,_Sanok.JPG",
    },
  },
  lenivye_hachapuri: {
    source: require('../../assets/recipes/lenivye_hachapuri.webp'),
    credit: {
      author: "Simon Laroche",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Garlic_Fingers.jpg",
    },
  },
  yayco_v_hlebe: {
    source: require('../../assets/recipes/yayco_v_hlebe.webp'),
    credit: {
      author: "Jonathunder",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:EggToast.jpg",
    },
  },
  salat_pomidory_luk: {
    source: require('../../assets/recipes/salat_pomidory_luk.webp'),
    credit: {
      author: "E4024",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Tomato-onion_salad_in_Ankara.jpg",
    },
  },
  ris_s_yaicom: {
    source: require('../../assets/recipes/ris_s_yaicom.webp'),
    credit: {
      author: "rhosoi",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Tamago_kake_gohan_by_rhosoi_in_Kyoto_Station_building.jpg",
    },
  },
  syrnye_palochki: {
    source: require('../../assets/recipes/syrnye_palochki.webp'),
    credit: {
      author: "@joefoodie",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Pepper_Jack_cheese_sticks.jpg",
    },
  },
  tost_banan: {
    source: require('../../assets/recipes/tost_banan.webp'),
    credit: {
      author: "Daderot",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Peanut_butter_and_banana_on_toasted_homemade_bread_-_Massachusetts.jpg",
    },
  },
  tvorozhnyi_krem: {
    source: require('../../assets/recipes/tvorozhnyi_krem.webp'),
    credit: {
      author: "Anna",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Summer_Desert_(176103799).jpeg",
    },
  },
  lenivaya_ovsyanka: {
    source: require('../../assets/recipes/lenivaya_ovsyanka.webp'),
    credit: {
      author: "David Stewart",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Muesli_with_Berries.jpg",
    },
  },
  zharenyi_syr: {
    source: require('../../assets/recipes/zharenyi_syr.webp'),
    credit: {
      author: "Alex Ostrovski",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Abkhazian_fried_cheese.jpg",
    },
  },
  griby_s_yaicom: {
    source: require('../../assets/recipes/griby_s_yaicom.webp'),
    credit: {
      author: "Samizambak",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Eggs_with_mushrooms_and_kasseri_cheese.jpg",
    },
  },
  tomatnyi_sup_iz_konservov: {
    source: require('../../assets/recipes/tomatnyi_sup_iz_konservov.webp'),
    credit: {
      author: "неизвестен",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Tomato_soup.jpg",
    },
  },
  salat_tunec_yaico: {
    source: require('../../assets/recipes/salat_tunec_yaico.webp'),
    credit: {
      author: "Daderot",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Yellowfin_tuna_steak_with_walnut_sauce_and_hard-boiled_eggs,_on_mixed_greens_-_Massachusetts.jpg",
    },
  },
  zharenye_pelmeni: {
    source: require('../../assets/recipes/zharenye_pelmeni.webp'),
    credit: {
      author: "Ralff Nestor Nacor",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Fried_Pork_Dumplings_with_Sauce_(Taiwan).jpg",
    },
  },
  salat_brokkoli_yaico: {
    source: require('../../assets/recipes/salat_brokkoli_yaico.webp'),
    credit: {
      author: "Vegan Feast Catering",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Broccoli_Salad_(4847896907).jpg",
    },
  },
  losos_skovoroda: {
    source: require('../../assets/recipes/losos_skovoroda.webp'),
    credit: {
      author: "PattayaPatrol",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:DFC_1189_Pan-seared_salmon_fillet_served_with_creamy_mashed_potatoes_a_lime_wedge_and_a_side_of_sauce.jpg",
    },
  },
  indeyka_zapechennaya: {
    source: require('../../assets/recipes/indeyka_zapechennaya.webp'),
    credit: {
      author: "Missvain",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Turkey_breast_-_December_2025_-_Sarah_Stierch.jpg",
    },
  },
  zapekanka_cvetnaya_kapusta: {
    source: require('../../assets/recipes/zapekanka_cvetnaya_kapusta.webp'),
    credit: {
      author: "Vegan Feast Catering",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Cauliflower_Au_Gratin_(4527747147).jpg",
    },
  },
  shpinatnye_oladi: {
    source: require('../../assets/recipes/shpinatnye_oladi.webp'),
    credit: {
      author: "Herne14",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Spinach_pancake_with_curd.jpg",
    },
  },
  zelenyi_smuzi: {
    source: require('../../assets/recipes/zelenyi_smuzi.webp'),
    credit: {
      author: "Lablascovegmenu",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Green_smoothie_(8222465502).jpg",
    },
  },
  kapusta_s_ogurcom: {
    source: require('../../assets/recipes/kapusta_s_ogurcom.webp'),
    credit: {
      author: "Off-shell",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:CabbageSalad.jpg",
    },
  },
  sup_ogurcy_kefir: {
    source: require('../../assets/recipes/sup_ogurcy_kefir.webp'),
    credit: {
      author: "Ikonact",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:TaratorBg.jpg",
    },
  },
  shpinatnyi_sup: {
    source: require('../../assets/recipes/shpinatnyi_sup.webp'),
    credit: {
      author: "Amelia Crook",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Watercress_and_spinach_soup_2.jpg",
    },
  },
  gorohovoe_pyure: {
    source: require('../../assets/recipes/gorohovoe_pyure.webp'),
    credit: {
      author: "Bearas",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Pea_puree.jpg",
    },
  },
  kinoa_s_ovoshami: {
    source: require('../../assets/recipes/kinoa_s_ovoshami.webp'),
    credit: {
      author: "Lablascovegmenu",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Vegan_quinoa_with_vegetables_-_Quinoa_con_pisto_(6891318087).jpg",
    },
  },
  tofu_skrembl: {
    source: require('../../assets/recipes/tofu_skrembl.webp'),
    credit: {
      author: "Bart Everson",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Tofu_Scramble_in_New_Orleans.jpg",
    },
  },
  salat_nut: {
    source: require('../../assets/recipes/salat_nut.webp'),
    credit: {
      author: "FitTasteTic",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Colorful_healthy_Chickpea_Salad_-_49859083608.jpg",
    },
  },
  baklazhany_zapechennye: {
    source: require('../../assets/recipes/baklazhany_zapechennye.webp'),
    credit: {
      author: "HaJunkiyada",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Roasted_Eggplant_Halves_(Base_Preparation).jpg",
    },
  },
  gribnoy_krem_sup_postnyi: {
    source: require('../../assets/recipes/gribnoy_krem_sup_postnyi.webp'),
    credit: {
      author: "MichalPL",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Cream_of_mushroom_soup.jpg",
    },
  },
  salat_morkov_chesnok: {
    source: require('../../assets/recipes/salat_morkov_chesnok.webp'),
    credit: {
      author: "Off-shell",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Korean-style_carrot.jpg",
    },
  },
  svekla_zapechennaya: {
    source: require('../../assets/recipes/svekla_zapechennaya.webp'),
    credit: {
      author: "Karen and Brad Emerson",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Roasted_carrots_and_beets_in_lemon_ginger_glaze_(3805656296).jpg",
    },
  },
  pasta_brokkoli: {
    source: require('../../assets/recipes/pasta_brokkoli.webp'),
    credit: {
      author: "AnticoMu90",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:BroccoliPasta.jpg",
    },
  },
  kalmary_chesnok: {
    source: require('../../assets/recipes/kalmary_chesnok.webp'),
    credit: {
      author: "Kolforn",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:03-05-2017_Squid_cooked_in_Garlic,_A_Sardinha_restaurant.JPG",
    },
  },
  midii_v_tomate: {
    source: require('../../assets/recipes/midii_v_tomate.webp'),
    credit: {
      author: "CharmaineZoe's Marvelous Melange",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      page: "https://commons.wikimedia.org/wiki/File:19_05_2018_Spaghetti_Marinara_with_mussels,_squid_rings,_prawns,_scallops_%26_chorizo_in_a_tomato_and_onion_cream_sauce_(made_with_love_by_my_lovely_hubby)_(41506021664).jpg",
    },
  },
  sup_frikadelki_indeyka: {
    source: require('../../assets/recipes/sup_frikadelki_indeyka.webp'),
    credit: {
      author: "Biso",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Meat_ball_soup.JPG",
    },
  },
  salat_avokado_yaico: {
    source: require('../../assets/recipes/salat_avokado_yaico.webp'),
    credit: {
      author: "HaJunkiyada",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Homemade_avocado_sandwich_with_egg_and_chopped_salad.jpg",
    },
  },
  sup_pyure_kabachok: {
    source: require('../../assets/recipes/sup_pyure_kabachok.webp'),
    credit: {
      author: "Sb2s3",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Zucchini_soup.JPG",
    },
  },
  sup_chechevica_shpinat: {
    source: require('../../assets/recipes/sup_chechevica_shpinat.webp'),
    credit: {
      author: "Dheerajk88",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Palak_Dal_Bhaji_from_Nagpur.JPG",
    },
  },
  paelya_ovoshnaya: {
    source: require('../../assets/recipes/paelya_ovoshnaya.webp'),
    credit: {
      author: "Francesc Fort",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Canela_-_Paella_Valenciana.jpg",
    },
  },
  uevos_ranchero: {
    source: require('../../assets/recipes/uevos_ranchero.webp'),
    credit: {
      author: "Elchavobeer",
      license: "CC BY-SA 3.0",
      licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Ela_huevos_rancheros.jpg",
    },
  },
  tykvennye_oladi: {
    source: require('../../assets/recipes/tykvennye_oladi.webp'),
    credit: {
      author: "Veganbaking.net",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Vegan_Pumpkin_Buckwheat_Pancakes_(4107572982).jpg",
    },
  },
  kalmar_farshirovannyi: {
    source: require('../../assets/recipes/kalmar_farshirovannyi.webp'),
    credit: {
      author: "안경12",
      license: "CC BY 2.5",
      licenseUrl: "https://creativecommons.org/licenses/by/2.5",
      page: "https://commons.wikimedia.org/wiki/File:Ojingeo_sundae_(stuffed_squid).jpg",
    },
  },
  ryba_s_kartoshkoy: {
    source: require('../../assets/recipes/ryba_s_kartoshkoy.webp'),
    credit: {
      author: "Daderot",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Small_potatoes,_baked,_with_tuna_fish,_cheddar_cheese,_and_black_pepper_-_Massachusetts.jpg",
    },
  },
  skumbriya_solenaya: {
    source: require('../../assets/recipes/skumbriya_solenaya.webp'),
    credit: {
      author: "국립국어원",
      license: "CC BY-SA 2.0 kr",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Godeungeo_jaban_(salted_chub_mackerel).jpg",
    },
  },
  omlet_roll: {
    source: require('../../assets/recipes/omlet_roll.webp'),
    credit: {
      author: "Jens Ohlig",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      page: "https://commons.wikimedia.org/wiki/File:Gyeran-mari_1.jpg",
    },
  },
  salat_grusha_syr: {
    source: require('../../assets/recipes/salat_grusha_syr.webp'),
    credit: {
      author: "Tzahy Lerner",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Grilled_pears_and_blue_cheese,_walnut_and_baby_leaves_salad.jpg",
    },
  },
  salat_morkov_apelsin: {
    source: require('../../assets/recipes/salat_morkov_apelsin.webp'),
    credit: {
      author: "BogTar201213",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Sa%C5%82atka_marchewkowa.jpg",
    },
  },
  kuskus_sladkiy: {
    source: require('../../assets/recipes/kuskus_sladkiy.webp'),
    credit: {
      author: "Habib M'henni",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      page: "https://commons.wikimedia.org/wiki/File:Couscous_Nabeul_nouvelle_ann%C3%A9e.jpg",
    },
  },
  lapsha_krevetki_kokos: {
    source: require('../../assets/recipes/lapsha_krevetki_kokos.webp'),
    credit: {
      author: "Swarabakti",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Mie_celor_plain.jpg",
    },
  },
  shpinat_s_chesnokom: {
    source: require('../../assets/recipes/shpinat_s_chesnokom.webp'),
    credit: {
      author: "Missvain",
      license: "CC0",
      licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      page: "https://commons.wikimedia.org/wiki/File:Willi%27s_Seafood_%26_Raw_Bar_-_March_2025_-_Sarah_Stierch_01.jpg",
    },
  },
  chipsy_iz_lavasha: {
    source: require('../../assets/recipes/chipsy_iz_lavasha.webp'),
    credit: {
      author: "AdriannaNicole",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Healthy_Snack_Ideas_-_Pita_Bread_Chips_and_Popcorn.JPG",
    },
  },
  grudka_farshirovannaya: {
    source: require('../../assets/recipes/grudka_farshirovannaya.webp'),
    credit: {
      author: "Kgbo",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Stuffed_Chicken_Breast_at_The_Brick_Hotel,_Quilpie,_Queensland,_2024,_01.jpg",
    },
  },
};
