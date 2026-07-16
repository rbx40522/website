// ============================================================
//  PROJECTS.JS — dit is het ENIGE bestand dat je hoeft aan te
//  passen om de site te onderhouden.
//
//  Nieuw beeld toevoegen:
//    1. zet het bestand in de juiste map onder media/
//    2. voeg hieronder één regel toe bij dat project
//
//  Nieuw project toevoegen:
//    1. maak een nieuwe map onder media/
//    2. kopieer een van de blokken hieronder en pas hem aan
//
//  Regels:
//    - foto's:  { type: "photo", src: "media/<map>/<bestand>", ratio: <getal>, photographer: "Photo: naam" }
//    - video's: { type: "video", src: "media/<map>/<bestand>", ratio: <getal>, photographer: "" }
//    - video's: H.264 mp4, zonder audio, het liefst < 3 MB
//    - foto's:  WebP, ca. 1600 px hoog
//
//  "ratio" = breedte gedeeld door hoogte. Dit getal MOET erbij:
//  de site gebruikt het om de plek van het beeld te reserveren
//  zónder het bestand eerst te downloaden. Klopt het niet, dan
//  wordt het beeld bijgesneden of blijft er een streep over.
//
//    Uitrekenen:  ratio = breedte / hoogte
//    Voorbeeld:   een beeld van 2000 x 1191  ->  2000 / 1191 = 1.679
//
//    Afmetingen opzoeken? Klik het bestand aan in de Finder en
//    druk cmd-I, of sleep het in Voorvertoning (cmd-I → Algemeen).
//
//    Let op bij video's: gebruik de afmetingen zoals ze op het
//    scherm verschijnen, niet altijd die van het bestand — zie de
//    opmerking bij Piss Pool en Drei Schwestern hieronder.
//
//  "photographer" staat per foto/video (niet per project) — laat leeg
//  ("") als er geen credit is, bijvoorbeeld bij video's.
//
//  Optioneel:
//    - "info": tekst die verschijnt als je op de titel klikt.
//      Laat leeg als er niks te tonen valt.
//      Formaat: eerst de rol (bijv. "video design"), dan \n,
//      dan de overige credits (bijv. "dir: ...").
// ============================================================

window.PROJECTS = [

  {
    title: "Angela (a strange loop)",
    info: "video design with Markus Selg\ndir: Susanne Kennedy\nKunstenfestivaldesarts Brussels 2023",
    media: [
      { type: "photo", src: "media/angela/angela_01.webp", ratio: 1.500, photographer: "Photo: Julian Röder" },
    ]
  },

  {
    title: "Drei Schwestern",
    info: "video design\ndir: Susanne Kennedy\nMünchner Kammerspiele 2019",
    media: [
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_01.webp", ratio: 1.000, photographer: "Photo: Judith Buss" },
      // let op: dit bestand is 960x540, maar speelt af als 2.137 (niet-vierkante pixels)
      { type: "video", src: "media/drei-schwestern/drei-schwestern_clip1.mp4", ratio: 2.137, photographer: "" },
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_02.webp", ratio: 1.569, photographer: "Photo: Judith Buss" },
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_03.webp", ratio: 1.779, photographer: "Photo: Judith Buss" },
    ]
  },

  {
    title: "Orfeo",
    info: "video design\ndir: Susanne Kennedy, Suzan Boogaerdt, Bianca van der Schoot\nRuhrtriennale 2015",
    media: [
      { type: "photo", src: "media/orfeo/orfeo_01.webp", ratio: 1.499, photographer: "Photo: Julian Röder" },
    ]
  },

  {
    title: "Women in Trouble",
    info: "video design\ndir: Susanne Kennedy\nVolksbühne Berlin 2017",
    media: [
      { type: "photo", src: "media/women-in-trouble/women-in-trouble_01.webp", ratio: 1.330, photographer: "Photo: Julian Röder" },
    ]
  },

  {
    title: "Virgin Suicides",
    info: "video design\ndir: Susanne Kennedy\nMünchner Kammerspiele 2017",
    media: [
      { type: "photo", src: "media/virgin-suicides/virgin-suicides_01.webp", ratio: 1.502, photographer: "Photo: Ursula Kaufmann" },
    ]
  },

  {
    title: "Piss Pool",
    info: "video design\ndir: Boogaerdt/VanderSchoot\nFrascati Amsterdam 2025",
    media: [
      { type: "photo", src: "media/pisspool/piss-pool-bvds-Willem-Popelier.webp", ratio: 1.526, photographer: "Photo: Willem Popelier" },
      // let op: dit bestand is 1920x1080, maar speelt af als 1.443 (niet-vierkante pixels)
      { type: "video", src: "media/pisspool/pisspool.mp4", ratio: 1.443, photographer: "" },
    ]
  },

  {
    title: "Echo's Chamber",
    info: "video design\ndir: Boogaerdt/VanderSchoot\nTheater der Welt Frankfurt - Offenbach 2023",
    media: [
      { type: "photo", src: "media/echos/BVDS-Echos-Chambers-2-webres-scaled.webp", ratio: 1.499, photographer: "Photo: Willem Popelier" },
    ]
  },

  {
    title: "Einstein on the Beach",
    info: "video design with Markus Selg\ndir: Susanne Kennedy\nTheater Basel 2022",
    media: [
      { type: "photo", src: "media/einstein/einstein_01.webp", ratio: 1.499, photographer: "Photo: Ingo Hoehn" },
    ]
  },

  {
    title: "SONGOFSONGS",
    info: "video design\ndir: Boogaerdt/VanderSchoot\nTheater Rotterdam 2024",
    media: [
      { type: "photo", src: "media/Songofsongs/1_SONGOFSONGS_WillemPopelier-webres.webp", ratio: 1.375, photographer: "Photo: Willem Popelier" },
      { type: "photo", src: "media/Songofsongs/6_SONGOFSONGS_WillemPopelier-webres.webp", ratio: 1.679, photographer: "Photo: Willem Popelier" },
    ]
  },

  {
    title: "Ultraworld",
    info: "video design with Markus Selg\ndir: Susanne Kennedy\nVolksbühne Berlin 2020",
    media: [
      { type: "photo", src: "media/ultraworld/ultraworld.webp", ratio: 1.660, photographer: "Photo: Julian Röder" },
      { type: "photo", src: "media/ultraworld/maxresdefault.webp", ratio: 1.778, photographer: "Photo: Julian Röder" },
    ]
  },

  {
    title: "Oracle",
    info: "video design\ndir: Susanne Kennedy\nMünchner Kammerspiele 2020",
    media: [
      { type: "photo", src: "media/oracle/Oracle_MK_Pressebild_JudithBuss_MG1_7544.webp", ratio: 1.501, photographer: "Photo: Judith Buss" },
    ]
  },

];
