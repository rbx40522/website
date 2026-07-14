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
//    - foto's:  { type: "photo", src: "media/<map>/<bestand>", photographer: "Photo: naam" }
//    - video's: { type: "video", src: "media/<map>/<bestand>", photographer: "" }
//    - video's: H.264 mp4, zonder audio, het liefst < 3 MB
//    - foto's:  JPG, ca. 1600–2000 px breed
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
      { type: "photo", src: "media/angela/angela_01.jpg", photographer: "" },
    ]
  },

  {
    title: "Drei Schwestern",
    info: "video design\ndir: Susanne Kennedy\nMünchner Kammerspiele 2019",
    media: [
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_01.jpg", photographer: "" },
      { type: "video", src: "media/drei-schwestern/drei-schwestern_clip1.mp4", photographer: "" },
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_02.jpg", photographer: "" },
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_03.jpg", photographer: "" },
    ]
  },

  {
    title: "Orfeo",
    info: "video design\ndir: Susanne Kennedy, Suzan Boogaerdt, Bianca van der Schoot\nRuhrtriennale 2015",
    media: [
      { type: "photo", src: "media/orfeo/orfeo_01.jpg", photographer: "" },
    ]
  },

  {
    title: "Women in Trouble",
    info: "video design\ndir: Susanne Kennedy\nVolksbühne Berlin 2017",
    media: [
      { type: "photo", src: "media/women-in-trouble/women-in-trouble_01.jpg", photographer: "" },
    ]
  },

  {
    title: "Virgin Suicides",
    info: "video design\ndir: Susanne Kennedy\nMünchner Kammerspiele 2017",
    media: [
      { type: "photo", src: "media/virgin-suicides/virgin-suicides_01.jpg", photographer: "" },
    ]
  },

  {
    title: "Piss Pool",
    info: "video design\ndir: Boogaerdt/VanderSchoot\nFrascati Amsterdam 2025",
    media: [
      { type: "photo", src: "media/pisspool/piss-pool-bvds-Willem-Popelier.png", photographer: "Photo: Willem Popelier" },
      { type: "video", src: "media/pisspool/pisspool.mp4", photographer: "" },
    ]
  },

  {
    title: "Echo's Chamber",
    info: "video design\ndir: Boogaerdt/VanderSchoot\nTheater der Welt Frankfurt - Offenbach 2023",
    media: [
      { type: "photo", src: "media/echos/BVDS-Echos-Chambers-2-webres-scaled.jpg", photographer: "" },
    ]
  },

  {
    title: "Einstein on the Beach",
    info: "video design with Markus Selg\ndir: Susanne Kennedy\nTheater Basel 2022",
    media: [
      { type: "photo", src: "media/einstein/Einstein2-scaled-foto Ingo Hoehn.jpg", photographer: "Photo: Ingo Hoehn" },
    ]
  },

  {
    title: "SONGOFSONGS",
    info: "video design\ndir: Boogaerdt/VanderSchoot\nTheater Rotterdam 2024",
    media: [
      { type: "photo", src: "media/Songofsongs/1_SONGOFSONGS_WillemPopelier-webres.jpg", photographer: "Photo: Willem Popelier" },
      { type: "photo", src: "media/Songofsongs/6_SONGOFSONGS_WillemPopelier-webres.jpg", photographer: "Photo: Willem Popelier" },
    ]
  },

  {
    title: "Ultraworld",
    info: "video design with Markus Selg\ndir: Susanne Kennedy\nVolksbühne Berlin 2020",
    media: [
      { type: "photo", src: "media/ultraworld/ultraworld.jpg", photographer: "" },
      { type: "photo", src: "media/ultraworld/maxresdefault.jpg", photographer: "" },
    ]
  },

  {
    title: "Oracle",
    info: "video design\ndir: Susanne Kennedy\nMünchner Kammerspiele 2020",
    media: [
      { type: "photo", src: "media/oracle/Oracle_MK_Pressebild_JudithBuss_MG1_7544.jpg", photographer: "Photo: Judith Buss" },
    ]
  },

];
