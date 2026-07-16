// =============================================================
//  APP.JS — de bewegingslogica van de band.
//  Je hoeft dit bestand NIET aan te passen; instellingen staan
//  in config.js en projects.js.
// =============================================================

(function(){
  "use strict";

  const CONFIG   = window.CONFIG   || {};
  const PROJECTS = window.PROJECTS || [];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const track = document.getElementById('track');
  const stage = document.getElementById('stage');


  // -------- flatten projects into a single media list --------
  let mediaId = 0;
  const allMedia = [];
  PROJECTS.forEach((p, pi) => {
    (p.media || []).forEach(m => {
      allMedia.push({
        uid: mediaId++,
        project: 'p' + pi,
        title: p.title || '',
        info: p.info || '',
        photographer: m.photographer || '',
        type: m.type === 'video' ? 'video' : 'photo',
        // ontbreekt de ratio in projects.js, dan gokken we 16:9 — het beeld
        // wordt dan bijgesneden, maar de band blijft heel
        ratio: (typeof m.ratio === 'number' && m.ratio > 0) ? m.ratio : 16/9,
        src: m.src
      });
    });
  });


  // -------- afmetingen: één keer meten, daarna hergebruiken --------
  // clientWidth/clientHeight uitlezen dwingt de browser tot rekenwerk, dus dat
  // doen we niet per frame maar alleen als het scherm echt verandert
  let stageW = 0, stageH = 0, overlap = 0;
  let SPEED = 0, REST_VELOCITY = 0, MAX_V = 0;

  function measure(){
    stageW = stage.clientWidth  || window.innerWidth;
    stageH = stage.clientHeight || window.innerHeight;
    overlap = Math.max(
      CONFIG.overlap_minimum || 50,
      stageW * (CONFIG.overlap_percentage_scherm || 0.06)
    );
    // beelden worden op basis van de schermhoogte breed gemaakt, dus op smalle
    // (mobiele) schermen zijn ze relatief veel breder dan het scherm — vandaar
    // een snelheidsfactor om dat te compenseren
    const mobileFactor = stageW <= (CONFIG.mobiel_breakpoint ?? 700)
      ? (CONFIG.mobiel_snelheidsfactor ?? 1)
      : 1;
    SPEED         = reduceMotion ? 4 : (CONFIG.snelheid ?? 34) * mobileFactor;
    REST_VELOCITY = -SPEED;
    MAX_V         = (CONFIG.maximum_snelheid ?? 2400) * mobileFactor;
  }


  // -------- shuffled sequence, never two same-project items in a row --------
  function buildRun(avoidFirstId){
    const buckets = {};
    allMedia.forEach(m => { (buckets[m.project] = buckets[m.project] || []).push(m); });
    Object.values(buckets).forEach(arr => {
      for(let i=arr.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    });
    const counts = Object.keys(buckets).map(k => ({ id:k, items:buckets[k].slice() }));
    const run = [];
    let lastId = avoidFirstId || null;
    while(counts.some(b => b.items.length > 0)){
      const candidates = counts.filter(b => b.items.length > 0 && b.id !== lastId);
      const pool = candidates.length ? candidates : counts.filter(b => b.items.length > 0);
      pool.sort((a,b) => b.items.length - a.items.length);
      const topCount = pool[0].items.length;
      const topPicks = pool.filter(b => b.items.length === topCount);
      const chosen = topPicks[Math.floor(Math.random()*topPicks.length)];
      run.push(chosen.items.shift());
      lastId = chosen.id;
    }
    return run;
  }

  let sequence = buildRun(null);
  let seqPtr = 0;
  function nextItem(){
    if(seqPtr >= sequence.length){
      const lastId = sequence[sequence.length-1].project;
      sequence = buildRun(lastId);
      seqPtr = 0;
    }
    return sequence[seqPtr++];
  }


  // -------- item creation --------
  const allVideos = [];

  function createSlot(m, orderIdx){
    const w = Math.round(stageH * m.ratio);

    const el = document.createElement('div');
    el.className = 'item';
    el.style.width = w + 'px';

    let videoEl = null;
    if(m.type === 'photo'){
      const img = document.createElement('img');
      img.src = m.src;
      img.alt = m.title;
      img.decoding = 'async';
      img.draggable = false;
      el.appendChild(img);
    } else {
      videoEl = document.createElement('video');
      videoEl.src = m.src;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.autoplay = true;
      videoEl.preload = 'auto';
      videoEl.setAttribute('muted','');
      videoEl.setAttribute('playsinline','');
      videoEl.setAttribute('autoplay','');
      el.appendChild(videoEl);
      videoEl.play().catch(() => {});
      allVideos.push(videoEl);
    }

    return { el, w, m, orderIdx, videoEl, x: 0 };
  }

  function destroySlot(slot){
    if(slot.videoEl){
      const i = allVideos.indexOf(slot.videoEl);
      if(i>=0) allVideos.splice(i,1);
      slot.videoEl.pause();
      slot.videoEl.removeAttribute('src');
      slot.videoEl.load();
    }
    slot.el.remove();
  }

  // autoplay fallback: first user gesture unlocks all videos
  function unlockVideos(){
    allVideos.forEach(v => { if(v.paused) v.play().catch(() => {}); });
  }
  window.addEventListener('pointerdown', unlockVideos, { passive:true });
  window.addEventListener('keydown',    unlockVideos);
  window.addEventListener('wheel',      unlockVideos, { passive:true });


  // -------- conveyor bookkeeping --------
  const slots = [];
  const fullOrder = [];

  function setX(slot, x){
    slot.x = x;
    slot.el.style.transform = `translate3d(${x}px,0,0)`;
  }

  function appendRight(){
    const idx = fullOrder.length;
    const m = nextItem();
    fullOrder.push(m);
    const slot = createSlot(m, idx);
    const prev = slots.length ? slots[slots.length-1] : null;
    const x = prev
      ? (prev.x + prev.w - overlap)
      : -Math.max(360, stageW*0.5);
    track.appendChild(slot.el);
    setX(slot, x);
    slots.push(slot);
  }

  function prependLeft(){
    if(!slots.length) return false;
    const idx = slots[0].orderIdx - 1;
    if(idx < 0) return false;
    const slot = createSlot(fullOrder[idx], idx);
    track.insertBefore(slot.el, track.firstChild);
    setX(slot, slots[0].x - slot.w + overlap);
    slots.unshift(slot);
    return true;
  }

  function ensureFilled(){
    let guard = 0;
    while(
      (slots.length === 0 || (slots[slots.length-1].x + slots[slots.length-1].w) < stageW + 200)
      && guard++ < 40
    ){
      appendRight();
    }
    guard = 0;
    while(slots.length && slots[0].x > -200 && guard++ < 40){
      if(!prependLeft()) break;
    }
    while(slots.length > 2 && slots[0].x + slots[0].w < -stageW*1.5){
      destroySlot(slots.shift());
    }
    while(slots.length > 2 && slots[slots.length-1].x > stageW*2.5){
      destroySlot(slots.pop());
    }
  }


  // -------- schermformaat verandert (draaien, venster slepen) --------
  // breedtes hangen aan de schermhoogte, dus die moeten allemaal opnieuw;
  // we ankeren op het beeld in het midden zodat de band niet lijkt te springen
  function relayout(){
    const prevW = stageW;
    measure();
    if(!slots.length) return;

    const centerX = stageW/2;
    let anchorIdx = slots.findIndex(s => s.x <= (prevW/2) && (prevW/2) < s.x + s.w);
    if(anchorIdx < 0) anchorIdx = 0;
    const anchor = slots[anchorIdx];
    // welk punt van het ankerbeeld stond er in het midden? dat houden we vast
    const frac = (prevW/2 - anchor.x) / anchor.w;

    for(const s of slots){
      s.w = Math.round(stageH * s.m.ratio);
      s.el.style.width = s.w + 'px';
    }

    setX(anchor, centerX - frac * anchor.w);
    for(let i = anchorIdx-1; i >= 0; i--) setX(slots[i], slots[i+1].x - slots[i].w + overlap);
    for(let i = anchorIdx+1; i < slots.length; i++) setX(slots[i], slots[i-1].x + slots[i-1].w - overlap);

    ensureFilled();
  }

  let relayoutQueued = false;
  function queueRelayout(){
    if(relayoutQueued) return;
    relayoutQueued = true;
    requestAnimationFrame(() => { relayoutQueued = false; relayout(); });
  }
  window.addEventListener('resize', queueRelayout);
  window.addEventListener('orientationchange', queueRelayout);


  // -------- interaction: drag/swipe + scrollwheel with momentum --------
  const EASE_RATE     = reduceMotion ? 8 : (CONFIG.remkracht ?? 2.2);
  const WHEEL_IMPULSE = CONFIG.wielimpuls ?? 6;
  const FADE_MS       = CONFIG.fade_duur_ms ?? 160;
  const SNAP_RATE     = 8;   // hoe strak het beeld naar het midden 'springt'
  const TAP_THRESHOLD = 4;   // pixels; onder deze afstand geldt een pointerdown/-up als tap

  let dragging = false, dragLastX = 0, dragStartX = 0, dragMoved = false;
  let velocity = 0;
  let dragSamples = [];
  let snapRemaining = 0; // px die nog naar het midden geanimeerd moeten worden
  // pauze zet alleen de horizontale drift stil; videos blijven altijd afspelen.
  // Je pauzeert door op een beeld te tikken, en hervat met een tik, swipe of scroll.
  let paused = false;

  function snapSlotToCenter(slot){
    snapRemaining = stageW/2 - (slot.x + slot.w/2);   // positief = slot moet naar rechts
    velocity = 0;
    paused = true;
  }

  function findSlotAt(clientX){
    // items may extend past the stage edges; a click at any X finds the visible slot under it
    for(const s of slots){
      if(clientX >= s.x && clientX < s.x + s.w) return s;
    }
    return null;
  }

  stage.addEventListener('pointerdown', (e) => {
    dragging = true; dragMoved = false;
    dragLastX = dragStartX = e.clientX;
    dragSamples = [{ t: performance.now(), x: e.clientX }];
    stage.classList.add('dragging');
    try{ stage.setPointerCapture(e.pointerId); }catch(err){}
  });
  stage.addEventListener('pointermove', (e) => {
    if(!dragging) return;
    const dx = e.clientX - dragLastX;
    if(Math.abs(e.clientX - dragStartX) > TAP_THRESHOLD) dragMoved = true;
    dragLastX = e.clientX;
    // during a drag, cancel any pending snap and let the finger take over
    if(dragMoved){
      if(snapRemaining !== 0) snapRemaining = 0;
      // swiping while paused resumes normal drift
      paused = false;
    }
    for(const s of slots) setX(s, s.x + dx);
    const now = performance.now();
    dragSamples.push({ t: now, x: e.clientX });
    while(dragSamples.length > 6) dragSamples.shift();
    while(dragSamples.length > 2 && now - dragSamples[0].t > 120) dragSamples.shift();
  });
  function endDrag(){
    if(!dragging) return;
    dragging = false;
    stage.classList.remove('dragging');
    if(dragMoved){
      if(dragSamples.length >= 2){
        const first = dragSamples[0], last = dragSamples[dragSamples.length-1];
        const dt = (last.t - first.t) / 1000;
        velocity = dt > 0.001 ? (last.x - first.x) / dt : (paused ? 0 : REST_VELOCITY);
        velocity = Math.max(-MAX_V, Math.min(MAX_V, velocity));
      } else {
        velocity = paused ? 0 : REST_VELOCITY;
      }
    } else {
      // tap: als de show al gepauzeerd is, hervatten we hem (net als bij swipe/scroll).
      // Anders: het aangetikte beeld naar het midden animeren en pauzeren.
      if(paused){
        paused = false;
      } else {
        const tapped = findSlotAt(dragStartX);
        if(tapped) snapSlotToCenter(tapped);
      }
    }
  }
  stage.addEventListener('pointerup',     endDrag);
  stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('pointerleave',  endDrag);

  window.addEventListener('wheel', (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    // wheel input cancels a snap and takes over the motion
    if(snapRemaining !== 0) snapRemaining = 0;
    // scrolling while paused resumes normal drift
    paused = false;
    velocity += -delta * WHEEL_IMPULSE;
    velocity = Math.max(-MAX_V*1.25, Math.min(MAX_V*1.25, velocity));
  }, { passive:true });

  // spatiebalk pauzeert en hervat de band. Tikken op een beeld doet hetzelfde,
  // maar dat kan alleen met muis of vinger — dit is het aanknopingspunt voor
  // wie met het toetsenbord werkt.
  document.addEventListener('keydown', (e) => {
    if(e.code !== 'Space' && e.key !== ' ') return;
    // staat de focus op de titel of het e-mailadres, dan bedient spatie díé
    const t = e.target;
    if(t && (t.tagName === 'BUTTON' || t.tagName === 'A')) return;
    e.preventDefault();
    snapRemaining = 0;
    paused = !paused;
  });


  // -------- main loop --------
  const titleEl     = document.getElementById('title');
  const cornerEl    = document.getElementById('corner');
  const panelEl     = document.getElementById('info-panel');
  const infoTextEl  = document.getElementById('info-text');

  let currentInfo = '';
  let panelOpen = false;

  function updateTitleAffordance(){
    // no info text? title acts as plain label, no click needed
    const hasInfo = currentInfo.trim().length > 0;
    titleEl.style.cursor = hasInfo ? 'pointer' : 'default';
    titleEl.setAttribute('aria-expanded', String(panelOpen));
    titleEl.setAttribute('aria-label', hasInfo
      ? (panelOpen ? 'verberg informatie over dit project' : 'toon informatie over dit project')
      : 'projecttitel');
  }

  function setPanelOpen(open){
    if(open && !currentInfo.trim()) return; // niks te tonen
    panelOpen = open;
    panelEl.classList.toggle('open', open);
    panelEl.setAttribute('aria-hidden', String(!open));
    updateTitleAffordance();
  }

  titleEl.addEventListener('click', () => setPanelOpen(!panelOpen));
  // klik buiten het paneel sluit het weer
  document.addEventListener('click', (e) => {
    if(!panelOpen) return;
    if(e.target === titleEl || titleEl.contains(e.target)) return;
    if(panelEl.contains(e.target)) return;
    setPanelOpen(false);
  });
  // Escape sluit ook
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && panelOpen) setPanelOpen(false);
  });

  let lastProject = null;
  let lastMediaUid = null;
  let lastTime = performance.now();

  function frameLoop(now){
    const dt = Math.min(0.05, (now - lastTime)/1000);
    lastTime = now;

    if(!dragging){
      if(snapRemaining !== 0){
        // exponential ease toward zero remaining offset — smooth stop
        const step = snapRemaining * (1 - Math.exp(-dt*SNAP_RATE));
        for(const s of slots) setX(s, s.x + step);
        snapRemaining -= step;
        if(Math.abs(snapRemaining) < 0.5){
          for(const s of slots) setX(s, s.x + snapRemaining);
          snapRemaining = 0;
        }
        velocity = 0;
      } else {
        // when paused, velocity eases to 0 (smooth stop after a swipe)
        // when not paused, velocity eases to the ambient drift speed
        const target = paused ? 0 : REST_VELOCITY;
        velocity += (target - velocity) * (1 - Math.exp(-dt*EASE_RATE));
        const step = velocity*dt;
        if(step !== 0){
          for(const s of slots) setX(s, s.x + step);
        }
      }
    }
    ensureFilled();

    const centerX = stageW/2;
    const center = slots.find(s => s.x <= centerX && centerX < s.x + s.w);
    if(center && center.m.project !== lastProject){
      lastProject = center.m.project;
      // sluit het paneel bij projectwissel — anders staat oude info bij nieuw beeld
      if(panelOpen) setPanelOpen(false);
      titleEl.classList.add('fade');
      setTimeout(() => {
        // bij snel swipen staan er meerdere fades klaar; alleen de laatste telt
        if(lastProject !== center.m.project) return;
        titleEl.textContent  = center.m.title;
        currentInfo = center.m.info || '';
        infoTextEl.textContent = currentInfo;
        updateTitleAffordance();
        titleEl.classList.remove('fade');
      }, FADE_MS);
    }
    if(center && center.m.uid !== lastMediaUid){
      lastMediaUid = center.m.uid;
      cornerEl.classList.add('fade');
      setTimeout(() => {
        if(lastMediaUid !== center.m.uid) return;
        cornerEl.textContent = center.m.photographer;
        cornerEl.classList.remove('fade');
      }, FADE_MS);
    }

    requestAnimationFrame(frameLoop);
  }

  // -------- boot --------
  // de loader blijft staan tot de beelden die meteen in beeld staan geladen
  // zijn — maar nooit langer dan LOADER_TIMEOUT, anders houdt één traag
  // bestand de hele site gegijzeld
  const LOADER_TIMEOUT = 4000;

  function slotReady(slot){
    const v = slot.videoEl;
    if(v){
      if(v.readyState >= 2) return Promise.resolve();
      return new Promise(res => {
        v.addEventListener('loadeddata', res, { once:true });
        v.addEventListener('error',      res, { once:true });
      });
    }
    const img = slot.el.querySelector('img');
    if(!img || img.complete) return Promise.resolve();
    return new Promise(res => {
      img.addEventListener('load',  res, { once:true });
      img.addEventListener('error', res, { once:true });
    });
  }

  function hideLoader(){
    const loader = document.getElementById('loader');
    if(!loader) return;
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 550);
  }

  measure();
  ensureFilled();
  velocity = REST_VELOCITY;
  lastTime = performance.now();
  requestAnimationFrame(frameLoop);

  const onScreen = slots.filter(s => s.x < stageW && s.x + s.w > 0);
  Promise.race([
    Promise.all(onScreen.map(slotReady)),
    new Promise(res => setTimeout(res, LOADER_TIMEOUT))
  ]).then(hideLoader);

})();
