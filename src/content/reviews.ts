import type { Localized } from "@/lib/i18n";
import type { ReviewsProps } from "@/components/sections";

/*
 * Press and criticism of the exhibition "Where To Now?", in full, in the order the
 * owner set in the revision of 2026-11-17 (2): Pamukchiev, Karamihova, Irwin, Mincheva.
 *
 * Transcribed verbatim from the supplied documents (planned_changes/2026.11.17-2), with
 * only whitespace normalised. The writers' own wording is kept, including the earlier
 * title "Where Now?" where they use it.
 *
 * Two texts were supplied in one language only: Erin Irwin's in English, Boryana
 * Mincheva's in Bulgarian. Each is printed as written on both pages, its text marked
 * with `lang`, rather than in a translation nobody has approved.
 */

export const pageTitle: Localized<string> = { bg: "Рецензии", en: "Reviews" };

export const reviews: Localized<ReviewsProps> = {
  bg: {
    heading: "За изложбата „А сега накъде?“",
    reviews: [
      {
        author: "Проф. Памукчиев",
        credit: "Из словото при откриване на изложбата",
        quote: true,
        paragraphs: [
          "Това е едно метафизично изживяване...\n... да говориш за духовен абсолют, за съвършенство и в същото време да го очовечиш, тази висока материя да стане човешка, интимна и много топла.",
        ],
      },
      {
        author: "Марта Карамихова",
        credit:
          "Магистър по арт мениджмънт\nУниверситет по изкуствата, Хелзинки / Академия „Сибелиус“",
        paragraphs: [
          "Едно забележително културно събитие, едно малко бижу, чието представяне пред света нямаше как да търпи отлагане, премина като циклон на сцената на съвременното българско изкуство - далновидно уловено и представено вещо, макар и за кратко, в София.",
          "„А сега накъде?“ е изложба с изключително високо ниво на концептуално и естетическо изпълнение, поставяща нов стандарт в съвременното българско изкуство. Колекцията от 15 минималистични фотополимерни пластики измества фокуса на скулптурния обект отвъд формата и пространствения контекст, като насочва вниманието на зрителя обратно - навътре към себе си.",
          "С разглежданите теми и изследването на формата Владимир Ванков провокира емоционалната интелигентност на публиката, навеждайки към размисъл, емоция, ретроспекция и равносметка. Всяка една интерпретация на сфера носи в ядрото, във формата и на повърхността си, подобно на човек, белезите от психологическия сблъсък с живота и морално-етичните дилеми, които той поставя.",
          "Есенцията на всяка една от пластиките и подредбата им в концептуален порядък оформят уникалния символен и психологически наратив на изложбата. Началото - „Сам“ и краят - „А сега накъде?“ обозначават две фундаментални, екзистенциални терзания на Човека. Чрез специфичния си монтаж двете скулптури левитират в напрегнатото поле над постамента, трептейки в невидимото, подобно на човешките колебания.",
          "Благодарение на богатия си артистичен опит и висока технологична компетентност Владимир Ванков работи и експериментира с широк набор от технологии, които 21 век предлага. Това е и неговият първи проект, в който той работи по толкова абстрактен начин. В творческата и технологична експресивност на експозицията - от идеята, през изпълнението, до оформянето и представянето на 15-те скулптури в завършен културен продукт, ведно се долавят експертизата му на дизайнер и математическото образование.",
          'В заключение бих искала да изтъкна редките смелост, истинност и замах, с които Владимир Ванков работи, необременен от творческата тревожност на формалния художествен ценз. "А сега накъде?“ не може да бъде пресъздадена с думи. При откриването на изложбата както критиката, така и кураторът, умишлено се въздържаха от по-задълбочен словесен анализ на експозицията. Това беше тяхната недвусмислена професионална оценка на работата на Владимир, реверанс към творческо му постижение и особена подкана към публиката.',
        ],
      },
      {
        author: "Erin Irwin",
        credit: "Автор, изследовател и редактор в областта на изкуството, Лондон",
        lang: "en",
        paragraphs: [
          "I recently had the pleasure of viewing a solo presentation of Sofia-based artist Vladimir Vankov (Владимир Ванков)’s newest works in Where Now? (A Сега Накъде), an exhibition that proved to be at once thoughtful and thrilling. Opening night was remarkably well attended – or not so remarkable given that the artist has accrued an impressive reputation over his decades-long practice – each viewer taking part in a slow procession around the room, guided by a succession of inventive sculptures.",
          "One could be forgiven for mistaking these intimate works as being made of porcelain or marble, their smooth, almost luminous surfaces evoking the patina of classical sculpture. Having personally physically held an early edition of one of the pieces, I can confirm that this ambiguous visual effect extends to their velvety texture, perplexingly light in the palm. Having long worked in paint, ink and glass, Vankov has now turned his hand to an unusual medium, namely, utilising the vast capabilities of 3D printing to shape his new series. It is in this way that the artist can render works that exist outside traditional aesthetic tropes and constructs, delving into a world of pure abstraction.",
          "The fifteen orbs in this series present to the audience a progression of thoughts and experiences, each universal in nature but expressed by the artist in a way which speaks to knowledge gained from a life well lived. The first, [Alone] (Сам), begins the journey with dramatic force, a perfect sphere marked only with the artist’s signature, spinning slowly in the air. With no visible strings or stand, this has an almost magical effect, and powerfully evokes a sense of physical and emotional isolation. As with many of the emotions that the artist addresses in this series, this characterisation of being completely alone is neither truly negative, nor positive. Rather, here, being alone is an experience of potentiality – “Изпълнен с кънтяща празнота или пък с вътрешна енергия, планове и очаквания? Желаеш ли да разчупиш черупката?”.",
          "From this first encounter, each new work is a small step forward into the complexities of life. Waiting for connection and validation, experiencing love and loss. One work that was noted by many of the attendees that evening as being particularly powerful is Vow (Обет):",
          "“Да обещаеш нещо означава да гарантираш със себе си, със своя морален „ресурс“ , че то ще се случи. В случай,че това не стане си готов да се разделиш с тази част от себе си, с която си го гарантирал.”",
          "The sphere is again perfect and vibrant white, marred only by a neat square of dashed lines incised on the surface. With the work unburdened by figural embellishments, this delineated area is not confined to a certain part of one’s body or mind, but an essential part of being. It is part of the core of one’s personhood, which is not solid, and can be chipped away by mistakes and misdeeds. With practiced restraint, Vankov brings the potentiality of abstraction to bear on this work, saying so much with only a few short lines.",
          "My personal favourite amongst the presented works has to be Fatherhood (Бащинство), perhaps all the more so since the accompanying text was translated for me by the artist’s son himself, as I stood beside the artist’s daughter.",
          "“Създаваш го, отглеждаш го, обгрижваш го, предпазваш го, носиш го на ръце, учиш го, възпитаваш го, помагаш му да порастне, да се изгради като човек и личност, обичаш го, създаваш му моралните устои и подпомагаш развитието на амбициите и стремежите му… И както потокът на времето минава през вас, когато дойде моментът да „излети“ го насърчаваш и подпомагаш.”",
          "More structurally complex than some of the other works, the body of this sculpture is not a sphere but a ring, surrounding yet not enclosing the form held gently aloft within. While other pieces such as Vow and [After the Others…] (След другите...) are still and introspective, Fatherhood projects forward towards the viewer. This is not a rumination on the self and emotions experienced within the moment, but rather an endless push forward and out away from the centre of one’s being, all energy expended in a single direction with profound and loving focus. On viewing this work, I could truly sense the intensity of feeling that had borne this piece into existence.",
          "Another piece worthy of particular note was [Unwanted Gift] (Причинено добро, непотърсена помощ). This is notable as one of the few works that uses visceral, fleshy contours that recede into the sphere, as opposed to neat lines and sharp projections. In the artist’s words, “Откъсвайки (с добро чувство) този дар от себе си ти, както и отношенията ви, оставате с една грозна и трудно зарастваща рана.” This sense of ripping or tearing is made all the more potent by the piece’s monochromatic colour scheme, the wound scored not into skin and muscle but rather into something more essential.",
          "Beyond [Unwanted Gift] the succession continues, the incisions and protuberances of the spheres becoming increasingly dramatic until the viewer finds themselves facing the final chapter of Vankov’s narrative. Where to now? (А сега накъде?) floats in the air, paired in this way with the beginning of the exhibition. A drop of liquid suspended in space, rotating slowly but refusing to fall. It is at this point that the exhibition’s central theme is made most clear, in that this series of works is of course the artist’s journey, his trials and joys. But it is also our own, both physically through the space, and emotionally, as we come face to face with our own experiences made tangible.",
          "By stripping these sculptures down to their essential parts, Vankov is presenting us with something that we must ourselves define. He is not prescribing meaning or truth – rather, he is posing the question. Though stark white and pared down, the works in this exhibition are wholly human, reflecting something essential that endures within us all.",
        ],
      },
      {
        author: "Доц. арх. Боряна Минчева",
        credit: "Куратор на изложбата",
        paragraphs: [
          "Първата самостоятелна изложба на Владимир Ванков го представя като автор с разностранни интереси. Той е известен предимно като графичен дизайнер, но сега се представя като автор с разностранни възможности и идеи. Можем да видим част от неговите бижута и металопластики – разположени в атриума на Арт хотела пред входа на галерията. Същинската част на изложбата е в нея. Това е серия от абстрактни фигури на основата на трансформации на сферата като главен герой в повествованието. Всяка пластика носи самостоятелен апел, повдига тема за размисъл. Те могат да се разглеждат самостоятелно, но са подредени в определена последователност. Заедно петнадесетте произведения образуват едно цяло послание, един сюжет с неговата развита фабула. Всяка пластика е съпроводена от текст, който води наблюдателя в определена последователност за размисъл. Произведенията са изработени с технологията на 3D print, прецизно шлифовани, в монохромна гама. Този начин на представяне на философия в материал, с неговата изчистеност и абстрактност на формата, водят зрителя до размисъл за същността на основни преживявания в живота.",
        ],
      },
    ],
  },
  en: {
    heading: "On the exhibition “Where To Now?”",
    reviews: [
      {
        author: "Prof. Pamukchiev",
        credit: "From the speech at the opening of the exhibition.",
        quote: true,
        paragraphs: [
          "This is a metaphysical experience...\n... to speak of a spiritual absolute, of perfection, and at the same time to humanize it, to make this lofty matter human, intimate, and very warm.",
        ],
      },
      {
        author: "Marta Karamihova",
        credit: "MA in Arts Management\nUniversity of the Arts, Helsinki / Sibelius Academy",
        paragraphs: [
          "A remarkable cultural event, a small jewel, which presentation before the world could not stand any delay, swept like a cyclone on the scene of the Bulgarian contemporary art - farsightedly captured and skillfully presented, albeit briefly, in Sofia.",
          "Where Now? is an exhibition with an exceptionally high level of conceptual and aesthetic execution, setting a new standard for the contemporary Bulgarian art. The collection of 15 minimalist photopolymer sculptures shifts the focus of the art object beyond its’ form and the spatial context, drawing the viewer’s attention backwards and inward towards themself.",
          "Through the themes examined and the study of the form, Vladimir Vankov directly provokes the emotional intelligence of the audience, leading to reflection, emotion, retrospection and revaluation. Each interpretation of a sphere carries in its core, in its form and on its surface, like the human being, the scars of the psychological clash with life and the moral and ethical dilemmas it poses on us.",
          'The essence of each sphere and their arrangement in a conceptual order shape the symbolic and psychological narrative of the exhibition. The beginning, "Alone" and the end, Where Now? denote two of the fundamental, existential torments of Man. Through their unique installation the sculptures literally levitate in the tense field above the pedestals. The two spheres invite for introspection while trembling in the invisible, like human fluctuations.',
          "Thanks to his rich artistic experience and high technological competence, Vladimir Vankov works and experiments with a wide range of technologies available in the 21st century. This is also his first project in which he works with such abstract determination. In the creative and technological expression of the exhibition, from the idea through the technological implementation and to the presentation of the complete cultural product, Vladimir’s expertise as a designer and his mathematical education are felt at the same time.",
          "In conclusion, I would like to highlight the rare courage, momentum and freedom, which Vladimir Vankov employs in his art, unencumbered by the creative anxiety of the formal artistic qualification. Where Now? cannot be recreated in words. At the opening of the exhibition, both the critics and the curator purposefully refrained from a more in-depth verbal analysis. That was their unequivocal professional praise, a reverence for Vladimir's creative achievement and a peculiar invitation to the audience.",
        ],
      },
      {
        author: "Erin Irwin",
        credit:
          "Erin works as a London-based arts writer, researcher and editor. Her published work has reported on art and exhibitions throughout Europe and the Asia-Pacific.",
        paragraphs: [
          "I recently had the pleasure of viewing a solo presentation of Sofia-based artist Vladimir Vankov (Владимир Ванков)’s newest works in Where Now? (A Сега Накъде), an exhibition that proved to be at once thoughtful and thrilling. Opening night was remarkably well attended – or not so remarkable given that the artist has accrued an impressive reputation over his decades-long practice – each viewer taking part in a slow procession around the room, guided by a succession of inventive sculptures.",
          "One could be forgiven for mistaking these intimate works as being made of porcelain or marble, their smooth, almost luminous surfaces evoking the patina of classical sculpture. Having personally physically held an early edition of one of the pieces, I can confirm that this ambiguous visual effect extends to their velvety texture, perplexingly light in the palm. Having long worked in paint, ink and glass, Vankov has now turned his hand to an unusual medium, namely, utilising the vast capabilities of 3D printing to shape his new series. It is in this way that the artist can render works that exist outside traditional aesthetic tropes and constructs, delving into a world of pure abstraction.",
          "The fifteen orbs in this series present to the audience a progression of thoughts and experiences, each universal in nature but expressed by the artist in a way which speaks to knowledge gained from a life well lived. The first, [Alone] (Сам), begins the journey with dramatic force, a perfect sphere marked only with the artist’s signature, spinning slowly in the air. With no visible strings or stand, this has an almost magical effect, and powerfully evokes a sense of physical and emotional isolation. As with many of the emotions that the artist addresses in this series, this characterisation of being completely alone is neither truly negative, nor positive. Rather, here, being alone is an experience of potentiality – “Изпълнен с кънтяща празнота или пък с вътрешна енергия, планове и очаквания? Желаеш ли да разчупиш черупката?”.",
          "From this first encounter, each new work is a small step forward into the complexities of life. Waiting for connection and validation, experiencing love and loss. One work that was noted by many of the attendees that evening as being particularly powerful is Vow (Обет):",
          "“Да обещаеш нещо означава да гарантираш със себе си, със своя морален „ресурс“ , че то ще се случи. В случай,че това не стане си готов да се разделиш с тази част от себе си, с която си го гарантирал.”",
          "The sphere is again perfect and vibrant white, marred only by a neat square of dashed lines incised on the surface. With the work unburdened by figural embellishments, this delineated area is not confined to a certain part of one’s body or mind, but an essential part of being. It is part of the core of one’s personhood, which is not solid, and can be chipped away by mistakes and misdeeds. With practiced restraint, Vankov brings the potentiality of abstraction to bear on this work, saying so much with only a few short lines.",
          "My personal favourite amongst the presented works has to be Fatherhood (Бащинство), perhaps all the more so since the accompanying text was translated for me by the artist’s son himself, as I stood beside the artist’s daughter.",
          "“Създаваш го, отглеждаш го, обгрижваш го, предпазваш го, носиш го на ръце, учиш го, възпитаваш го, помагаш му да порастне, да се изгради като човек и личност, обичаш го, създаваш му моралните устои и подпомагаш развитието на амбициите и стремежите му… И както потокът на времето минава през вас, когато дойде моментът да „излети“ го насърчаваш и подпомагаш.”",
          "More structurally complex than some of the other works, the body of this sculpture is not a sphere but a ring, surrounding yet not enclosing the form held gently aloft within. While other pieces such as Vow and [After the Others…] (След другите...) are still and introspective, Fatherhood projects forward towards the viewer. This is not a rumination on the self and emotions experienced within the moment, but rather an endless push forward and out away from the centre of one’s being, all energy expended in a single direction with profound and loving focus. On viewing this work, I could truly sense the intensity of feeling that had borne this piece into existence.",
          "Another piece worthy of particular note was [Unwanted Gift] (Причинено добро, непотърсена помощ). This is notable as one of the few works that uses visceral, fleshy contours that recede into the sphere, as opposed to neat lines and sharp projections. In the artist’s words, “Откъсвайки (с добро чувство) този дар от себе си ти, както и отношенията ви, оставате с една грозна и трудно зарастваща рана.” This sense of ripping or tearing is made all the more potent by the piece’s monochromatic colour scheme, the wound scored not into skin and muscle but rather into something more essential.",
          "Beyond [Unwanted Gift] the succession continues, the incisions and protuberances of the spheres becoming increasingly dramatic until the viewer finds themselves facing the final chapter of Vankov’s narrative. Where to now? (А сега накъде?) floats in the air, paired in this way with the beginning of the exhibition. A drop of liquid suspended in space, rotating slowly but refusing to fall. It is at this point that the exhibition’s central theme is made most clear, in that this series of works is of course the artist’s journey, his trials and joys. But it is also our own, both physically through the space, and emotionally, as we come face to face with our own experiences made tangible.",
          "By stripping these sculptures down to their essential parts, Vankov is presenting us with something that we must ourselves define. He is not prescribing meaning or truth – rather, he is posing the question. Though stark white and pared down, the works in this exhibition are wholly human, reflecting something essential that endures within us all.",
        ],
      },
      {
        author: "Assoc. Prof. Arch. Boryana Mincheva",
        credit: "Curator of the exhibition",
        lang: "bg",
        paragraphs: [
          "Първата самостоятелна изложба на Владимир Ванков го представя като автор с разностранни интереси. Той е известен предимно като графичен дизайнер, но сега се представя като автор с разностранни възможности и идеи. Можем да видим част от неговите бижута и металопластики – разположени в атриума на Арт хотела пред входа на галерията. Същинската част на изложбата е в нея. Това е серия от абстрактни фигури на основата на трансформации на сферата като главен герой в повествованието. Всяка пластика носи самостоятелен апел, повдига тема за размисъл. Те могат да се разглеждат самостоятелно, но са подредени в определена последователност. Заедно петнадесетте произведения образуват едно цяло послание, един сюжет с неговата развита фабула. Всяка пластика е съпроводена от текст, който води наблюдателя в определена последователност за размисъл. Произведенията са изработени с технологията на 3D print, прецизно шлифовани, в монохромна гама. Този начин на представяне на философия в материал, с неговата изчистеност и абстрактност на формата, водят зрителя до размисъл за същността на основни преживявания в живота.",
        ],
      },
    ],
  },
};
