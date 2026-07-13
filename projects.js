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
//    - foto's:  { type: "photo", src: "media/<map>/<bestand>", photographer: "foto: naam" }
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
//      Nieuwe regel: gebruik \n in de tekst.
// ============================================================

window.PROJECTS = [

  {
    title: "Angela (a strange loop)",
    info: "",
    media: [
      { type: "photo", src: "media/angela/angela_01.jpg", photographer: "foto: fotograaf a" },
    ]
  },

  {
    title: "Drei Schwestern",
    info: "videodesign — dir: Susanne Kennedy",
    media: [
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_01.jpg", photographer: "foto: fotograaf b" },
      { type: "video", src: "media/drei-schwestern/drei-schwestern_clip1.mp4", photographer: "" },
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_02.jpg", photographer: "foto: fotograaf b" },
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_03.jpg", photographer: "foto: fotograaf b" },
    ]
  },

  {
    title: "Orfeo",
    info: "videodesign — dir: Susanne Kennedy, Suzan Boogaerdt, Bianca van der Schoot",
    media: [
      { type: "photo", src: "media/orfeo/orfeo_01.jpg", photographer: "foto: fotograaf c" },
    ]
  },

  {
    title: "Women in Trouble",
    info: "videodesign — dir: Susanne Kennedy",
    media: [
      { type: "photo", src: "media/women-in-trouble/women-in-trouble_01.jpg", photographer: "foto: fotograaf d" },
    ]
  },

  {
    title: "Virgin Suicides",
    info: "",
    media: [
      { type: "photo", src: "media/virgin-suicides/virgin-suicides_01.jpg", photographer: "foto: fotograaf e" },
    ]
  },

  {
    title: "Piss Pool",
    info: "",
    media: [
      { type: "photo", src: "media/pisspool/piss-pool-bvds-Willem-Popelier.png", photographer: "foto: Willem Popelier" },
      { type: "video", src: "media/pisspool/pisspool.mp4", photographer: "" },
    ]
  },

];
