import type { BilingualGallery, BilingualWork } from "@/lib/gallery";

/*
 * The sculpture page: the newest works, then the cycle "Where To Now?" with the
 * reflection that is an integral part of each work. The cycle's heading carries buttons
 * to the reviews and films, which have their own pages since the owner's revision of
 * 2026-11-17. The introductory statement was dropped in the revision of 2026-11-17 (2).
 *
 * The cycle's texts and the English titles come from the artist's own documents
 * (V.Vankov-Texts WhereToNow-BG/EN), transcribed with only obvious typos corrected.
 */

/** The newest works, shown first. */
const newWorks: BilingualWork[] = [
  {
    title: { bg: "Пиета", en: "Pieta" },
    photos: [{ src: "/assets/pieta.jpg", width: 1353, height: 1800 }],
  },
  {
    title: { bg: "Продължавам", en: "I Go On" },
    photos: [
      { src: "/assets/i-go-on-1.jpg", width: 1350, height: 1800 },
      { src: "/assets/i-go-on-2.jpg", width: 1350, height: 1800 },
    ],
  },
  {
    title: { bg: "Моят път", en: "My Way" },
    // Supplied at ~440 px wide: the justified row keeps them near native size.
    photos: [
      { src: "/assets/my-way-1.jpg", width: 441, height: 594 },
      { src: "/assets/my-way-2.jpg", width: 449, height: 594 },
      { src: "/assets/my-way-3.jpg", width: 448, height: 596 },
      { src: "/assets/my-way-4.jpg", width: 443, height: 594 },
    ],
  },
];

/** The cycle "Where To Now?", each work followed by its reflection. */
const cycleWorks: BilingualWork[] = [
  {
    title: { bg: "Сам", en: "Alone" },
    lines: { bg: ["Левитираща фигура"], en: ["Levitating figure"] },
    photos: [{ src: "/assets/_DSF2146-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Затворен, ограничен в своя свят – по собствено желание или по каприз на съдбата. Без контакт с другите. Самодостатъчен (дали?). Изпълнен с кънтяща празнота или пък с вътрешна енергия, планове и очаквания? Желаеш ли да разчупиш черупката? Нуждаеш ли се от другите? Наистина ли?",
      ],
      en: [
        "Isolated, confined within your intimate world – be it of your own volition or by a whim of fate. No contact with others. Self-sufficient (or are you?). Loaded with resounding emptiness or brimming with inner energy, plans, and expectations? Are you willing to break that shell? Do you need others? Do you, really?",
      ],
    },
  },
  {
    title: { bg: "В очакване на...", en: "Awaiting the…" },
    photos: [{ src: "/assets/_DSF2063-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Усещаш се непълен, недоизграден, незавършен. Усещаш празнота в част от себе си. Или нещо си е отишло от теб? Или ти е било отнето? Стремиш се да запълниш празнотата, за да се чувстваш отново (или най-после) цялостен. Очакваш това (или този), което да я запълни, което (който) ще те допълни до твоята истинска цялост. Всички други биха били само „кръпки“, недостатъчни, непасващи, неорганични.",
      ],
      en: [
        "You feel unfinished, incomplete, imperfect. You feel some sort of emptiness inside a part of you. Or maybe that a part has gone away? Or has been taken away? You are striving to fill the hollow space within you, to feel complete again (at last). Awaiting whatever (or whoever) it is that can fill the void and complete you until you become your true self. Anyone or anything else would be nothing more than “patches” – insufficient, incompatible, incongruous.",
      ],
    },
  },
  {
    title: { bg: "Приятелят", en: "The Friend" },
    photos: [{ src: "/assets/_DSF2133-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Приятелят е този, с когото изграждате свой малък общ свят на доверие и общи ценности. Приятелят е този, който разбира от какво се нуждаеш преди теб самия. Той е този, в разговор с когото сам стигаш до верните си решения и той е този, който ти помага да се допълниш до своята завършена цялост.",
      ],
      en: [
        "The friend is the one with whom you build up a private little world of mutual trust and shared values. The friend is the one person who understands your needs before they have even occurred to you. They are the one person with whom you share your thoughts, so you can find the right solution for yourself, and through whom you can be fully accomplished.",
      ],
    },
  },
  {
    title: { bg: "Обет", en: "Vow" },
    photos: [{ src: "/assets/_DSF2069-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Да обещаеш нещо означава да гарантираш със себе си, със своя морален „ресурс“, че то ще се случи. В случай, че това не стане, си готов да се разделиш с тази част от себе си, с която си го гарантирал. Не може да се отметнеш. Тази „гарантираща“ част от моралното ти тяло е определена и при неизпълнение във всеки момент ще се лишиш от нея. И ти си готов за това.",
      ],
      en: [
        "Making a promise means to provide yourself, your moral “resource,” as a warrant that what you promise will happen. If it does not, you should be ready to give away that part of you which you have assigned to serve as a warrant. You cannot change your mind. This part of your moral being is already allocated as a collateral and you have to be ready to part with it in case of non-execution. And you are ready to do it.",
      ],
    },
  },
  {
    title: { bg: "Дар", en: "Gift" },
    photos: [{ src: "/assets/_DSF2071-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Ти си завършена и определена цялост, дефинирана. Ясна е границата, до която си ти и от която нататък са другите. Когато искрено даряваш нещо, то може да е само част от теб, от твоя „ресурс“. Празнината със сигурност се запълва, дори с повече. Но ти не даваш, за да получаваш.",
        "Даряването не накърнява твоята цялост, само я обогатява и развива.",
      ],
      en: [
        "You are a complete, distinct, defined entity. The boundaries between your being and the realm of others are clear and definite. When you are offering a gift, and when this act is sincere, it could only be extracted from within these boundaries, from your own resources. The gap you make when giving is doubtlessly filled again, with a lot more at that. But you do not give to get.",
        "Giving does not impair the entirety of your being; it only enriches and develops it.",
      ],
    },
  },
  {
    title: { bg: "Бащинство", en: "Paternity" },
    photos: [{ src: "/assets/_DSF2076-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Създаваш го, отглеждаш го, обгрижваш го, предпазваш го, носиш го на ръце, учиш го, възпитаваш го, помагаш му да порастне, да се изгради като човек и личност, обичаш го, създаваш му моралните устои и подпомагаш развитието на амбициите и стремежите му. Възпитаваш в него смелост и дързост. Помагаш му да стане, когато е паднало. И както потокът на времето минава през вас, когато дойде моментът да „излети“, го насърчаваш и подпомагаш. В случай, че е необходимо, му даваш тласък да тръгне по своя път. Създаваш му усещане за опора. Уважаваш изборите му и искрено го подкрепяш. Съветваш го при поискване и не му налагаш своето мнение.",
      ],
      en: [
        "You create them, nurture them, take care of them, protect them, educate them, bring them up, help them grow and develop as a person, an individual, you give them your love and build up their moral values, you foster their aspirations and ambitions. You teach them to be brave and bold. You offer a helping hand when they fall. And as the flow of time passes through you both, when it is time for them to “fly away,” you give encouragement and support. If need be, you even push them ahead in their own path. You create a sense of security and support for them. You respect their choices and support them sincerely. You only give advice upon request and never impose your opinion.",
      ],
    },
  },
  {
    title: { bg: "Майчинство", en: "Maternity" },
    photos: [{ src: "/assets/_DSF2077-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Създаваш го, отглеждаш го, отхранваш го, предпазваш го от всичко, възпитаваш го, изграждаш му усещане за дом, създаваш му ценностната система, обгръщаш го с любов и топлота. Съчувстваш му, приемаш го с всичко, било добро или лошо, прощаваш му дори когато сгреши или неволно те нарани. И когато дойде моментът да тръгне по своя път, го благославяш, като му даваш сигурност, че домът и сърцето ти винаги ще го очакват и приемат.",
      ],
      en: [
        "You create them, nurture them, feed them, protect them from the world around, you bring them up and create a sense of home for them; you build up their moral values and encompass them with love and warmth. You give them your sympathy and unreserved acceptance of all they are – good and bad; you give them your forgiveness even when they err or involuntarily hurt you. And when the time comes for them to go their own way, you give them your blessing and your assurance that they will always be welcome and unconditionally accepted in your home and in your heart.",
      ],
    },
  },
  {
    title: { bg: "Причинено добро, непотърсена помощ", en: "Good Inflicted, Help Unwanted" },
    photos: [{ src: "/assets/_DSF2127-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Непоискана помощ, непоискано добро – независимо, че този дар излиза от теб с най-добри намерения, може да са неадекватни и дори ненавременни. Често неразбран, този жест може да нарани и двете страни – получаващият и отдаващият. Откъсвайки (с добро чувство) този дар от себе си, ти, както и отношенията ви, оставате с една грозна и трудно зарастваща рана.",
      ],
      en: [
        "The unsolicited help, the good deed that was not asked for – no matter how sincere the gift and how good the intentions – may turn out to be inadequate or even untimely. Such gestures, often misunderstood, can hurt both the giver and the receiver. When you tear this gift from your soul, though benevolently, a gaping wound opens in you and in your relationship alike, a wound that is too deep to heal.",
      ],
    },
  },
  {
    title: { bg: "След другите...", en: "The Others…" },
    photos: [{ src: "/assets/_DSF2087-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Когато се обърнеш назад, в един момент откриваш, че общуването с другите често води до усещане, че нещо е било „отхапано“ от твоя морален и духовен интегритет, независимо дали с лоши или добри намерения. Останали са ти кънтящи празнини. Дали това не са ненаучените уроци?",
      ],
      en: [
        "At a certain point, when you turn around you notice the existence of a certain sensation – the unsettling feeling that in communicating with others, something has been bitten off from your moral and spiritual integrity, be it with good or with bad intentions. You find yourself dented with resounding voids. Are these the lessons learned?",
      ],
    },
  },
  {
    title: { bg: "Вътрешен конфликт", en: "Internal Conflict" },
    photos: [{ src: "/assets/_DSF2088-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Както войната, възприемана обикновено като сблъсък на две сили, всъщност е вътрешен конфликт за цялото човечество, сблъсъкът с някого от другите е предимно твой вътрешен конфликт. Както и борбата на изключващи се морални позиции вътре в теб. Този вътрешен конфликт наистина те разкъсва. Можеш ли да запазиш целостта си?",
      ],
      en: [
        "Just like war – usually perceived as the clash of two forces – is actually an internal conflict of humankind in general, the clash with another individual is mainly your own internal conflict. As is the struggle between conflicting ethical positions within you. This internal conflict really tears you apart. Can you preserve your integrity?",
      ],
    },
  },
  {
    title: { bg: "Силният и слабият", en: "The Strong and the Weak" },
    photos: [{ src: "/assets/_DSF2097-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Твоята интегритетна същност се състои от две начала в постоянна борба – силният и слабият в теб. Във всеки момент някой от тях надделява. Не можеш да кажеш кой е по-добър – и двете са част от теб. В конфликт и единство.",
      ],
      en: [
        "Your integral identity is comprised of two entities, constantly struggling with one another – the Strong one and the Weak one inside you. In any given moment one of them takes prevalence. You cannot say who is better, they are both part of you. In conflict and in unity.",
      ],
    },
  },
  {
    title: { bg: "Колебание", en: "Hesitation" },
    photos: [{ src: "/assets/_DSF2098-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Независимо колко е дефинирана моралната ти доктрина, неминуемо изпадаш в моменти на колебание. Различните варианти взаимно се изключват, но ти изглеждат еднакво възможни. „Плискаш“ се между тях и те те разкъсват, изпълнен си със съмнения. Не можеш да вземеш решение. Или не смееш?",
      ],
      en: [
        "No matter how well defined your ethical doctrine is, it is unavoidable to hesitate at times. The different options are mutually exclusive, but they seem equally viable to you. You are rocking from one to another like a trapped ship, and they tear you apart. You are deep in doubt. You cannot make a decision. Or is it that you do not dare?",
      ],
    },
  },
  {
    title: { bg: "Да посмееш да решиш", en: "Daring to Decide" },
    photos: [{ src: "/assets/_DSF2103-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "След вътрешна борба и колебание вземането на решение е най-трудният момент, изискващ воля и смелост, поемане на отговорност. В него силният в теб взема връх над слабия. А ти ще посмееш ли да решиш?",
      ],
      en: [
        "The hardest step after internal struggles and moments of hesitation is making a decision; it requires will, bravery, taking responsibility. In these moments, the Strong one within you prevails over the Weak one. And will you dare to make up your mind?",
      ],
    },
  },
  {
    title: { bg: "Отърсване", en: "Shaking Off" },
    photos: [{ src: "/assets/_DSF2116-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "Корабът, плаващ в морето, обраства с полипи и раковини, забавящи хода му и разяждащи го. Така и ти, преминавайки през живота, обрастваш с чужди и насадени ти норми, правила, очаквания към теб, сложни връзки. С кои да се съобразяваш и с кои не? Доколко те не покриват вече цялото ти „лице“? Искаш ли и можеш ли да се отърсиш от тях?",
      ],
      en: [
        "Little by little, the ship sailing at sea becomes overgrown with polyps and shells that slow down its advancement and corrode its hull. Just like the ship, you, passing through life, are also overgrown by other people’s norms imposed on you, rules and expectations, complicated relationships. Which of them are you supposed to abide by, and which can you ignore? Have they already overgrown your entire “face”? Do you want to… and can you shake them off?",
      ],
    },
  },
  {
    title: { bg: "А сега накъде?", en: "Where To Now?" },
    lines: { bg: ["Левитираща фигура"], en: ["Levitating figure"] },
    photos: [{ src: "/assets/_DSF2150-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    text: {
      bg: [
        "И ето отново си сам, насаме със своята същност. Накъде поемаш? Дали ще „капнеш“ в примамливото топло, удобно и уютно блато? Или като истински барон Мюнхаузен ще посмееш да се издърпаш сам за косата и да продължиш по трудния път нагоре? Какъв е твоят избор? А решението ти?",
        "А сега накъде?",
      ],
      en: [
        "Here you are on your own, alone with your own self. Where are you heading? Are you going to “drop” in the luring warmth and the comfort of the cozy swamps? Or will you, like a real Baron Munchausen, manage to pull yourself up by your own hair and continue up the steep slope? What is your choice? What is your decision?",
        "Where to now?",
      ],
    },
  },
];

export const gallery: BilingualGallery = {
  title: { bg: "Скулптура", en: "Sculpture" },
  noun: { bg: "Скулптура", en: "Sculpture" },
  columns: 2,
  layout: "justified",
  // The drop — the work "Where To Now?" itself. Framed whole: the owner wants all of
  // the drop and a little of the base it floats above in view.
  banner: { src: "/assets/_DSF2150-Enhanced-NR.jpg", width: 1920, height: 1280 },
  bannerFrame: "whole",
  works: newWorks,
  groups: [
    {
      heading: { bg: "Цикъл „А сега накъде“", en: "Cycle of works “Where To Now”" },
      note: { bg: "стереолитография, 2024", en: "stereo lithography, 2024" },
      links: [
        { label: { bg: "Рецензии", en: "Reviews" }, href: "/recenzii" },
        { label: { bg: "Филми", en: "Movies" }, href: "/filmi" },
      ],
      works: cycleWorks,
    },
  ],
};
