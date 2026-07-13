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
//    - foto's:  { type: "photo", src: "media/<map>/<bestand>" }
//    - video's: { type: "video", src: "media/<map>/<bestand>" }
//    - video's: H.264 mp4, zonder audio, het liefst < 3 MB
//    - foto's:  JPG, ca. 1600–2000 px breed
//
//  Optioneel:
//    - "info": tekst die verschijnt als je op de titel klikt.
//      Laat leeg als er niks te tonen valt.
//      Nieuwe regel: gebruik \n in de tekst.
// ============================================================

window.PROJECTS = [

  {
    title: "Angela (a strange loop)",
    photographer: "foto: fotograaf a",
    info: "",
    media: [
      { type: "photo", src: "media/angela/angela_01.jpg" },
    ]
  },

  {
    title: "Drei Schwestern",
    photographer: "foto: fotograaf b",
    info: "videodesign — dir: Susanne Kennedy",
    media: [
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_01.jpg" },
      { type: "video", src: "media/drei-schwestern/drei-schwestern_clip1.mp4" },
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_02.jpg" },
      { type: "photo", src: "media/drei-schwestern/drei-schwestern_03.jpg" },
    ]
  },

  {
    title: "Orfeo",
    photographer: "foto: fotograaf c",
    info: "videodesign — dir: Susanne Kennedy, Suzan Boogaerdt, Bianca van der Schoot",
    media: [
      { type: "photo", src: "media/orfeo/orfeo_01.jpg" },
    ]
  },

  {
    title: "Women in Trouble",
    photographer: "foto: fotograaf d",
    info: "videodesign — dir: Susanne Kennedy",
    media: [
      { type: "photo", src: "media/women-in-trouble/women-in-trouble_01.jpg" },
    ]
  },

  {
    title: "Virgin Suicides",
    photographer: "foto: fotograaf e",
    info: "",
    media: [
      { type: "photo", src: "media/virgin-suicides/virgin-suicides_01.jpg" },
    ]
  },

];
