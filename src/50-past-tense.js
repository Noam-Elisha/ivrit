/* ===== PHASE 2 — PAST TENSE (weeks 22-26) ===== */
const PAST = [
/* --- Week 22 --- */
{t:"The past-tense endings", focus:"Every Hebrew verb in the past tense takes the SAME set of personal endings. Learn this table once and it works for all 133 verbs on your sheet. Anchor verb: לִכְתּוֹב (to write), root כ־ת־ב.",
 table:[["Ani (I)","Katavti","כָּתַבְתִּי"],["Ata (you m.)","Katavta","כָּתַבְתָּ"],["At (you f.)","Katavt","כָּתַבְתְּ"],["Hu (he)","Katav","כָּתַב"],["Hi (she)","Katva","כָּתְבָה"],["Anachnu (we)","Katavnu","כָּתַבְנוּ"],["Atem/Aten (you pl.)","Katavtem / Katavten","כְּתַבְתֶּם / כְּתַבְתֶּן"],["Hem/Hen (they)","Katvu","כָּתְבוּ"]],
 tip:"The -ti / -ta / -t / -nu / -tem endings all contain a T. The he-form is the bare root — the shortest form of all. The she-form and they-form drop the middle vowel: KAT-va, KAT-vu.",
 verbs:[], ex:["Katavti michtav etmol.","כָּתַבְתִּי מִכְתָּב אֶתְמוֹל.","I wrote a letter yesterday."]},

{t:"Pa'al past, set 1", focus:"Pa'al (also called Kal, \"the light one\") is the simplest and largest group. Pattern: CaCaC → CaCaCti. Give each verb the full eight forms out loud.",
 verbs:[["To write","Katavti","כָּתַבְתִּי","Katav","כָּתַב"],["To learn","Lamadti","לָמַדְתִּי","Lamad","לָמַד"],["To remember","Zacharti","זָכַרְתִּי","Zachar","זָכַר"],["To close","Sagarti","סָגַרְתִּי","Sagar","סָגַר"],["To guard / keep","Shamarti","שָׁמַרְתִּי","Shamar","שָׁמַר"]],
 tip:"The present-tense form always shows you the root: kotev → k-t-v → katavti. Work backwards from what you already know.",
 ex:["Lamadti ivrit shalosh shanim.","לָמַדְתִּי עִבְרִית שָׁלוֹשׁ שָׁנִים.","I studied Hebrew for three years."]},

{t:"Pa'al past, set 2", focus:"Same pattern, five more verbs. By now the -ti ending should feel automatic.",
 verbs:[["To break","Shavarti","שָׁבַרְתִּי","Shavar","שָׁבַר"],["To choose","Bacharti","בָּחַרְתִּי","Bachar","בָּחַר"],["To check","Badakti","בָּדַקְתִּי","Badak","בָּדַק"],["To think","Chashavti","חָשַׁבְתִּי","Chashav","חָשַׁב"],["To dance","Rakadti","רָקַדְתִּי","Rakad","רָקַד"]],
 tip:"Chashavti (I thought) and chashavnu (we thought) are everywhere in conversation. Drill those two hardest.",
 ex:["Chashavti she-ata ba machar.","חָשַׁבְתִּי שֶׁאַתָּה בָּא מָחָר.","I thought you were coming tomorrow."]},

{t:"Pa'al past, set 3", focus:"Five more regulars. Try producing the she-form (Hi ___a) without looking — that's the one learners forget.",
 verbs:[["To finish","Gamarti","גָּמַרְתִּי","Gamar","גָּמַר"],["To steal","Ganavti","גָּנַבְתִּי","Ganav","גָּנַב"],["To wear","Lavashti","לָבַשְׁתִּי","Lavash","לָבַשׁ"],["To grow","Gadalti","גָּדַלְתִּי","Gadal","גָּדַל"],["To support","Tamachti","תָּמַכְתִּי","Tamach","תָּמַךְ"]],
 tip:"Hi gamra, hi ganva, hi lavsha — the middle vowel drops and the stress moves. Say them until the rhythm feels natural.",
 ex:["Hi gamra et ha-avoda mukdam.","הִיא גָּמְרָה אֶת הָעֲבוֹדָה מֻקְדָּם.","She finished the work early."]},

{t:"Pa'al past, set 4", focus:"The last regular batch before we meet the trickier roots.",
 verbs:[["To jump","Kafatzti","קָפַצְתִּי","Kafatz","קָפַץ"],["To throw","Zarakti","זָרַקְתִּי","Zarak","זָרַק"],["To catch","Tafasti","תָּפַסְתִּי","Tafas","תָּפַס"],["To help","Azarti","עָזַרְתִּי","Azar","עָזַר"],["To work","Avadti","עָבַדְתִּי","Avad","עָבַד"]],
 tip:"Verbs starting with ע (azarti, avadti) sound like they begin with a plain vowel. Don't let the silent letter confuse you — the pattern is unchanged.",
 ex:["Avadnu kol ha-yom ba-gina.","עָבַדְנוּ כָּל הַיּוֹם בַּגִּנָּה.","We worked all day in the garden."]},

/* --- Week 23 --- */
{t:"Roots ending in a guttural", focus:"When the last root letter is ח or ע, the vowel before it shifts to an -a sound. Shama, not shamé. Small change, big effect on how natural you sound.",
 verbs:[["To hear","Shamati","שָׁמַעְתִּי","Shama","שָׁמַע"],["To send","Shalachti","שָׁלַחְתִּי","Shalach","שָׁלַח"],["To open","Patachti","פָּתַחְתִּי","Patach","פָּתַח"],["To forget","Shachachti","שָׁכַחְתִּי","Shachach","שָׁכַח"],["To forgive","Salachti","סָלַחְתִּי","Salach","סָלַח"]],
 tip:"Shamati is one of the ten most common past-tense verbs in spoken Hebrew. \"Lo shamati\" = \"I didn't hear (that).\"",
 ex:["Lo shamati ma amart.","לֹא שָׁמַעְתִּי מָה אָמַרְתְּ.","I didn't hear what you said."]},

{t:"Pa'al past, set 5", focus:"More gutturals and a couple of everyday regulars.",
 verbs:[["To laugh","Tzachakti","צָחַקְתִּי","Tzachak","צָחַק"],["To shout","Tza'akti","צָעַקְתִּי","Tza'ak","צָעַק"],["To stop","Atzarti","עָצַרְתִּי","Atzar","עָצַר"],["To pass / cross","Avarti","עָבַרְתִּי","Avar","עָבַר"],["To leave","Azavti","עָזַבְתִּי","Azav","עָזַב"]],
 tip:"Avarti and avadti differ by one letter — resh vs. dalet. Say them side by side so your ear separates them.",
 ex:["Avarnu le-dira chadasha ba-chodesh she-avar.","עָבַרְנוּ לְדִירָה חֲדָשָׁה בַּחֹדֶשׁ שֶׁעָבַר.","We moved to a new apartment last month."]},

{t:"Pa'al past, set 6", focus:"Rounding out the Pa'al group.",
 verbs:[["To sit","Yashavti","יָשַׁבְתִּי","Yashav","יָשַׁב"],["To fall","Nafalti","נָפַלְתִּי","Nafal","נָפַל"],["To ask","Sha'alti","שָׁאַלְתִּי","Sha'al","שָׁאַל"],["To sign","Chatamti","חָתַמְתִּי","Chatam","חָתַם"],["To cut","Chatachti","חָתַכְתִּי","Chatach","חָתַךְ"]],
 tip:"Careful with the near-twins chatamti (I signed) and chatachti (I cut). One letter apart, very different outcomes on a contract.",
 ex:["Chatamti al ha-chozeh etmol.","חָתַמְתִּי עַל הַחוֹזֶה אֶתְמוֹל.","I signed the contract yesterday."]},

{t:"Verbs ending in -a (Lamed-Hey), part 1", focus:"Verbs whose present tense ends in -eh (kone, bone, roeh) behave differently: the past adds -iti, not -ti. Kaniti, not kanati.",
 verbs:[["To buy","Kaniti","קָנִיתִי","Kana","קָנָה"],["To build","Baniti","בָּנִיתִי","Bana","בָּנָה"],["To answer","Aniti","עָנִיתִי","Ana","עָנָה"],["To cry","Bachiti","בָּכִיתִי","Bacha","בָּכָה"],["To drink","Shatiti","שָׁתִיתִי","Shata","שָׁתָה"]],
 tip:"Rule of thumb: if the he-form ends in -a (kana, bana, shata), the I-form ends in -iti. This group is large and very common.",
 ex:["Kaniti prachim ba-shuk ha-boker.","קָנִיתִי פְּרָחִים בַּשּׁוּק הַבֹּקֶר.","I bought flowers at the market this morning."]},

{t:"Verbs ending in -a, part 2", focus:"Same -iti pattern, five more high-frequency verbs.",
 verbs:[["To see","Ra'iti","רָאִיתִי","Ra'a","רָאָה"],["To do / make","Asiti","עָשִׂיתִי","Asa","עָשָׂה"],["To want","Ratziti","רָצִיתִי","Ratza","רָצָה"],["To bake","Afiti","אָפִיתִי","Afa","אָפָה"],["To swim","Sachiti","שָׂחִיתִי","Sacha","שָׂחָה"]],
 tip:"Ra'iti (I saw), asiti (I did), ratziti (I wanted) are three of the most-used past forms in the language. Overlearn these.",
 ex:["Ra'iti seret metzuyan etmol ba-erev.","רָאִיתִי סֶרֶט מְצֻיָּן אֶתְמוֹל בָּעֶרֶב.","I saw an excellent movie yesterday evening."]},

/* --- Week 24 --- */
{t:"Hollow verbs, part 1", focus:"One-syllable present forms (kam, ba, sam, ratz, gar) come from \"hollow\" roots with a vowel in the middle. Their past uses a short -a- and NO doubled syllable: kamti, not kamati.",
 verbs:[["To get up","Kamti","קַמְתִּי","Kam","קָם"],["To come","Bati","בָּאתִי","Ba","בָּא"],["To put","Samti","שַׂמְתִּי","Sam","שָׂם"],["To run","Ratzti","רַצְתִּי","Ratz","רָץ"],["To live / reside","Garti","גַּרְתִּי","Gar","גָּר"]],
 tip:"Handy check: the present and the he-past are identical (hu kam = he gets up / he got up). Context tells you which.",
 ex:["Garti be-Tel Aviv chamesh shanim.","גַּרְתִּי בְּתֵל אָבִיב חָמֵשׁ שָׁנִים.","I lived in Tel Aviv for five years."]},

{t:"Hollow verbs, part 2", focus:"The rest of the hollow group.",
 verbs:[["To sing","Sharti","שַׁרְתִּי","Shar","שָׁר"],["To move","Zazti","זַזְתִּי","Zaz","זָז"],["To rest","Nachti","נַחְתִּי","Nach","נָח"],["To fly / travel by air","Tasti","טַסְתִּי","Tas","טָס"],["To return (somewhere)","Chazarti","חָזַרְתִּי","Chazar","חָזַר"]],
 tip:"Chazar is actually a regular Pa'al, not hollow — it's here because it lives in the same conversational neighborhood. Note the difference: chazarti (3 syllables) vs. nachti (2).",
 ex:["Chazarnu ha-baita me'uchar.","חָזַרְנוּ הַבַּיְתָה מְאוּחָר.","We came home late."]},

{t:"The essential irregulars, part 1", focus:"Five verbs that don't follow any tidy rule — and that you'll use every single day. Memorize them as whole words.",
 verbs:[["To be","Hayiti","הָיִיתִי","Haya","הָיָה"],["To give","Natati","נָתַתִּי","Natan","נָתַן"],["To take","Lakachti","לָקַחְתִּי","Lakach","לָקַח"],["To know (a fact)","Yadati","יָדַעְתִּי","Yada","יָדַע"],["To go out","Yatzati","יָצָאתִי","Yatza","יָצָא"]],
 tip:"Hayiti is the single most important past-tense form in Hebrew: it's how you say \"I was\" and how you build \"I used to\" (hayiti holech = I used to go).",
 ex:["Hayiti be-Yerushalayim be-shavua she-avar.","הָיִיתִי בִּירוּשָׁלַיִם בְּשָׁבוּעַ שֶׁעָבַר.","I was in Jerusalem last week."]},

{t:"The essential irregulars, part 2", focus:"Five more that need memorizing outright.",
 verbs:[["To go / walk","Halachti","הָלַכְתִּי","Halach","הָלַךְ"],["To say","Amarti","אָמַרְתִּי","Amar","אָמַר"],["To eat","Achalti","אָכַלְתִּי","Achal","אָכַל"],["To be able to","Yacholti","יָכֹלְתִּי","Yachol","יָכוֹל"],["To find","Matzati","מָצָאתִי","Matza","מָצָא"]],
 tip:"Amarti is the past of both le-hagid and lomar — Hebrew borrows one root for the past and another for the infinitive. Just learn amarti as the past of \"said\".",
 ex:["Amarti lo she-ani lo yechola lavo.","אָמַרְתִּי לוֹ שֶׁאֲנִי לֹא יְכוֹלָה לָבוֹא.","I told him I can't come."]},

{t:"Pa'al review and mixed drill", focus:"No new verbs. Take twenty Pa'al verbs from your own sheet at random and produce ani / hu / hi / anachnu for each, out loud, without looking. Then check.",
 verbs:[],
 tip:"Test yourself in both directions: English → Hebrew is harder and more valuable than Hebrew → English. If you can only do one, do that one.",
 ex:["Etmol kamti mukdam, achalti aruchat boker ve-halachti la-avoda.","אֶתְמוֹל קַמְתִּי מֻקְדָּם, אָכַלְתִּי אֲרוּחַת בֹּקֶר וְהָלַכְתִּי לָעֲבוֹדָה.","Yesterday I got up early, ate breakfast and went to work."]},

/* --- Week 25 --- */
{t:"Pi'el past: the pattern", focus:"Pi'el verbs have a me- prefix in the present (medaber, mesader, mevashel). In the past they DROP the prefix and take an -i- in the first syllable: dibarti, sidarti, bishalti.",
 table:[["Ani","Dibarti","דִּבַּרְתִּי"],["Ata","Dibarta","דִּבַּרְתָּ"],["At","Dibart","דִּבַּרְתְּ"],["Hu","Diber","דִּבֵּר"],["Hi","Dibra","דִּבְּרָה"],["Anachnu","Dibarnu","דִּבַּרְנוּ"],["Atem/Aten","Dibartem / Dibarten","דִּבַּרְתֶּם / דִּבַּרְתֶּן"],["Hem/Hen","Dibru","דִּבְּרוּ"]],
 verbs:[],
 tip:"The trick for spotting Pi'el: present starts with me-, past starts with the bare root and an -i-. Medaber → diber. Mevashel → bishel.",
 ex:["Dibarti im ha-mora etmol.","דִּבַּרְתִּי עִם הַמּוֹרָה אֶתְמוֹל.","I spoke with the teacher yesterday."]},

{t:"Pi'el past, set 1", focus:"Apply the pattern. Present me-X-e-X → past X-i-X-a-ti.",
 verbs:[["To speak","Dibarti","דִּבַּרְתִּי","Diber","דִּבֵּר"],["To arrange","Sidarti","סִדַּרְתִּי","Sider","סִדֵּר"],["To cook","Bishalti","בִּשַּׁלְתִּי","Bishel","בִּשֵּׁל"],["To pay","Shilamti","שִׁלַּמְתִּי","Shilem","שִׁלֵּם"],["To tell / narrate","Siparti","סִפַּרְתִּי","Siper","סִפֵּר"]],
 tip:"Siparti also means \"I cut hair\" (from the same root as sapar, barber). Context does the disambiguating.",
 ex:["Siparti la sipur lifnei ha-sheina.","סִפַּרְתִּי לָהּ סִפּוּר לִפְנֵי הַשֵּׁנָה.","I told her a story before bed."]},

{t:"Pi'el past, set 2", focus:"Five more Pi'el verbs from your list.",
 verbs:[["To receive","Kibalti","קִבַּלְתִּי","Kibel","קִבֵּל"],["To fix","Tikanti","תִּקַּנְתִּי","Tiken","תִּקֵּן"],["To visit","Bikarti","בִּקַּרְתִּי","Biker","בִּקֵּר"],["To ask for / request","Bikashti","בִּקַּשְׁתִּי","Bikesh","בִּקֵּשׁ"],["To search","Chipasti","חִפַּשְׂתִּי","Chipes","חִפֵּשׂ"]],
 tip:"Bikarti (I visited) and bikashti (I requested) are one letter apart — resh vs. shin. Another pair worth drilling side by side.",
 ex:["Kibalti matana yafa me-ha-mishpacha.","קִבַּלְתִּי מַתָּנָה יָפָה מֵהַמִּשְׁפָּחָה.","I received a lovely gift from the family."]},

{t:"Pi'el past, set 3", focus:"The last regular Pi'el batch.",
 verbs:[["To teach","Limadti","לִמַּדְתִּי","Limed","לִמֵּד"],["To play (a game)","Sichakti","שִׂחַקְתִּי","Sichek","שִׂחֵק"],["To divide","Chilakti","חִלַּקְתִּי","Chilek","חִלֵּק"],["To pamper / cuddle","Pinakti","פִּנַּקְתִּי","Pinek","פִּנֵּק"],["To wish (someone)","Ichalti","אִחַלְתִּי","Ichel","אִחֵל"]],
 tip:"Lamadti (I studied, Pa'al) vs. limadti (I taught, Pi'el) — one vowel apart. This pair is the classic Hebrew-learner trap; get it right now.",
 ex:["Limadti anglit be-beit sefer shalosh shanim.","לִמַּדְתִּי אַנְגְּלִית בְּבֵית סֵפֶר שָׁלוֹשׁ שָׁנִים.","I taught English at a school for three years."]},

{t:"Pi'el verbs ending in -a", focus:"Pi'el verbs whose present ends in -eh (meshaneh, menaseh, megaleh) take -iti in the past, exactly like the Pa'al -a verbs did.",
 verbs:[["To change","Shiniti","שִׁנִּיתִי","Shina","שִׁנָּה"],["To try","Nisiti","נִסִּיתִי","Nisa","נִסָּה"],["To discover","Giliti","גִּלִּיתִי","Gila","גִּלָּה"],["To hope","Kiviti","קִוִּיתִי","Kiva","קִוָּה"],["To wait","Chikiti","חִכִּיתִי","Chika","חִכָּה"]],
 tip:"Two rules stack here: Pi'el (drop the me-, add the -i-) plus Lamed-Hey (-iti instead of -ti). Once you see both at once, the whole system clicks.",
 ex:["Chikiti lach chatzi sha'a!","חִכִּיתִי לָךְ חֲצִי שָׁעָה!","I waited for you half an hour!"]},

/* --- Week 26 --- */
{t:"Hif'il past: the pattern", focus:"Hif'il verbs start with ma-/me- in the present (matchil, masbir, margish) and with hi- in the past: hitchalti, hisbarti, hirgashti.",
 table:[["Ani","Hitchalti","הִתְחַלְתִּי"],["Ata","Hitchalta","הִתְחַלְתָּ"],["At","Hitchalt","הִתְחַלְתְּ"],["Hu","Hitchil","הִתְחִיל"],["Hi","Hitchila","הִתְחִילָה"],["Anachnu","Hitchalnu","הִתְחַלְנוּ"],["Atem/Aten","Hitchaltem / Hitchalten","הִתְחַלְתֶּם / הִתְחַלְתֶּן"],["Hem/Hen","Hitchilu","הִתְחִילוּ"]],
 verbs:[],
 tip:"Note the vowel split: the \"I/you/we\" forms use -a- (hitchALti), the \"he/she/they\" forms use -i- (hitchIL). That alternation is the whole Hif'il in a nutshell.",
 ex:["Hitchalti lilmod ivrit lifnei shana.","הִתְחַלְתִּי לִלְמוֹד עִבְרִית לִפְנֵי שָׁנָה.","I started learning Hebrew a year ago."]},

{t:"Hif'il past, set 1", focus:"Present ma-/me- → past hi-. Five to practise on.",
 verbs:[["To begin","Hitchalti","הִתְחַלְתִּי","Hitchil","הִתְחִיל"],["To explain","Hisbarti","הִסְבַּרְתִּי","Hisbir","הִסְבִּיר"],["To feel","Hirgashti","הִרְגַּשְׁתִּי","Hirgish","הִרְגִּישׁ"],["To agree","Hiskamti","הִסְכַּמְתִּי","Hiskim","הִסְכִּים"],["To continue","Himshachti","הִמְשַׁכְתִּי","Himshich","הִמְשִׁיךְ"]],
 tip:"Hirgashti tov / hirgashti ra (\"I felt good / bad\") is worth having on instant recall — it comes up constantly.",
 ex:["Hirgashti lo tov etmol, aval ha-yom yoter tov.","הִרְגַּשְׁתִּי לֹא טוֹב אֶתְמוֹל, אֲבָל הַיּוֹם יוֹתֵר טוֹב.","I felt unwell yesterday, but today is better."]},

{t:"Hif'il past, set 2", focus:"The rest of the main Hif'il verbs on your sheet.",
 verbs:[["To listen","Hikshavti","הִקְשַׁבְתִּי","Hikshiv","הִקְשִׁיב"],["To know (a person)","Hikarti","הִכַּרְתִּי","Hikir","הִכִּיר"],["To understand","Hevanti","הֵבַנְתִּי","Hevin","הֵבִין"],["To bring","Heveti","הֵבֵאתִי","Hevi","הֵבִיא"],["To prefer","He'edafti","הֶעֱדַפְתִּי","He'edif","הֶעֱדִיף"]],
 tip:"Hevanti (I understood) is irregular-looking but extremely common — \"Hevanti!\" is how Israelis say \"Got it!\"",
 ex:["Lo hevanti et ha-she'ela, tuchal lachzor?","לֹא הֵבַנְתִּי אֶת הַשְּׁאֵלָה, תּוּכַל לַחֲזֹר?","I didn't understand the question, could you repeat it?"]},

{t:"Hitpa'el and Nif'al", focus:"Two smaller patterns. Hitpa'el (reflexive) keeps its hit- in both tenses: mistakel → histakalti. Nif'al (passive-ish) keeps its n-: nifgash → nifgashti.",
 verbs:[["To look at","Histakalti","הִסְתַּכַּלְתִּי","Histakel","הִסְתַּכֵּל"],["To use","Hishtamashti","הִשְׁתַּמַּשְׁתִּי","Hishtamesh","הִשְׁתַּמֵּשׁ"],["To meet","Nifgashti","נִפְגַּשְׁתִּי","Nifgash","נִפְגַּשׁ"],["To stay / remain","Nish'arti","נִשְׁאַרְתִּי","Nish'ar","נִשְׁאַר"],["To enjoy","Nehe'neti","נֶהֱנֵיתִי","Nehena","נֶהֱנָה"]],
 tip:"\"Nehe'neti!\" — \"I enjoyed it!\" — is the standard thing to say as you leave someone's home after a meal. Worth having ready.",
 ex:["Nifgashnu be-beit kafe ve-nehe'nenu me'od.","נִפְגַּשְׁנוּ בְּבֵית קָפֶה וְנֶהֱנֵינוּ מְאוֹד.","We met at a café and enjoyed it a lot."]},

{t:"Full past-tense review", focus:"No new material. Tell a five-minute story about your week, out loud, entirely in the past tense. Then write it down and check every verb ending against your sheet.",
 verbs:[],
 tip:"The goal isn't perfection — it's producing past-tense verbs without stopping to think. Fluency comes from repetition under mild pressure, which is exactly what talking to yourself provides.",
 ex:["Ba-shavua she-avar hayiti asuka: avadti harbe, nifgashti im chaverim ve-lo nachti bichlal.","בַּשָּׁבוּעַ שֶׁעָבַר הָיִיתִי עֲסוּקָה: עָבַדְתִּי הַרְבֵּה, נִפְגַּשְׁתִּי עִם חֲבֵרִים וְלֹא נַחְתִּי בִּכְלָל.","Last week I was busy: I worked a lot, I met friends and I didn't rest at all."]}
];
