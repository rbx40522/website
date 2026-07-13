// =============================================================
//  CONFIG.JS — knoppen voor het gedrag van de band.
//  Elke waarde is één getal; je hoeft niets anders aan te passen.
// =============================================================

window.CONFIG = {

  // Snelheid waarmee de band vanzelf naar links schuift.
  // Hoger = sneller. Voorbeeldwaarden: 10 = heel langzaam, 34 = standaard, 80 = vlot.
  snelheid: 34,               // pixels per seconde

  // Hoeveel opeenvolgende beelden elkaar overlappen (voor het overlopen aan de randen).
  // Hoger = meer overlap. Wordt automatisch groter op brede schermen.
  overlap_minimum: 50,        // pixels
  overlap_percentage_scherm: 0.06,   // 6% van de schermbreedte

  // Hoe snel de band na een swipe of scroll weer terugvalt naar de basissnelheid.
  // Hoger = strakker afremmen. Lager = het "glijdt" langer door.
  remkracht: 2.2,

  // Duur van de fade waarmee titel en credit wisselen tussen projecten.
  fade_duur_ms: 160,

  // Extra impuls per klik/tikje op het scrollwiel.
  // Hoger = één rolletje op je muis verplaatst je verder.
  wielimpuls: 6,

  // Maximumsnelheid, om te voorkomen dat een heel snelle swipe ongecontroleerd doorschiet.
  maximum_snelheid: 2400,

  // Op smalle schermen (mobiel) zijn beelden relatief veel breder dan het
  // scherm, waardoor dezelfde snelheid trager aanvoelt. Deze factor
  // verhoogt de snelheid op schermen tot en met "mobiel_breakpoint".
  // 1 = geen aanpassing.
  mobiel_snelheidsfactor: 2.5,
  mobiel_breakpoint: 700,      // schermbreedte (px) waaronder de factor geldt

};
