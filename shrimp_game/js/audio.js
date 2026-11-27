/* Original lighthearted tycoon-style soundtrack and game sounds.
   Everything is synthesized locally with Web Audio. No external requests.
   Autoplay is attempted on page load; restricted browsers resume on the first existing game gesture. */
(() => {
  'use strict';
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const state = {ctx:null, master:null, music:null, effects:null, musicTimer:null,
    startTime:0, step:0, tempo:106, muted:false, duckEnds:0, talking:0,
    boilTimer:null, boilOn:false, fryBed:null, fryNodes:null};
  const stage = document.querySelector('#gameStage');
  const button = document.querySelector('#soundToggle');
  const NOTE = n => 440 * Math.pow(2, (n - 69) / 12);
  function ready(){
    if (!AudioContextClass) return false;
    if (!state.ctx){
      const c = state.ctx = new AudioContextClass();
      state.master = c.createGain(); state.master.gain.value = .72;
      state.music = c.createGain(); state.music.gain.value = .39;
      state.effects = c.createGain(); state.effects.gain.value = .60;
      state.music.connect(state.master); state.effects.connect(state.master);
      state.master.connect(c.destination);
      c.onstatechange = () => { if (c.state === 'running') syncMusic(); };
    }
    if (state.ctx.state === 'suspended') state.ctx.resume().catch(()=>{});
    if (!state.musicTimer) {
      state.startTime = state.ctx.currentTime + .09;
      state.step = 0;
      state.musicTimer = setInterval(scheduleMusic, 85);
      scheduleMusic();
    }
    return true;
  }
  function osc(freq, time, dur, amp, type='sine', bus=state.effects, opts={}){
    if (!state.ctx || state.muted) return;
    const c=state.ctx, o=c.createOscillator(), g=c.createGain();
    o.type=type;
    o.frequency.setValueAtTime(Math.max(20,freq),time);
    if (opts.end) o.frequency.exponentialRampToValueAtTime(Math.max(20,opts.end),time+dur);
    g.gain.setValueAtTime(.0001,time);
    g.gain.exponentialRampToValueAtTime(Math.max(.0002,amp),time+Math.min(dur*.16,.028));
    g.gain.exponentialRampToValueAtTime(.0001,time+dur);
    o.connect(g);g.connect(bus);o.start(time);o.stop(time+dur+.015);
  }
  function noise(time,dur,amp,highpass=1200){
    if (!state.ctx || state.muted) return;
    const c=state.ctx, count=Math.max(32,Math.ceil(c.sampleRate*dur));
    const buf=c.createBuffer(1,count,c.sampleRate), arr=buf.getChannelData(0);
    for(let i=0;i<count;i++)arr[i]=(Math.random()*2-1)*Math.pow(1-i/count,.55);
    const src=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();
    src.buffer=buf; f.type='highpass'; f.frequency.value=highpass;
    g.gain.setValueAtTime(Math.max(.0002,amp),time);
    g.gain.exponentialRampToValueAtTime(.0001,time+dur);
    src.connect(f);f.connect(g);g.connect(state.effects);
    src.start(time);src.stop(time+dur);
  }
  function bell(n,t,a=.32, dur=.3, bus=state.music){
    const f=NOTE(n); osc(f,t,dur,a,'sine',bus);
    osc(f*2.01,t,dur*.56,a*.16,'sine',bus);
    osc(f*3.02,t,dur*.25,a*.08,'sine',bus);
  }
  function pluck(n,t,a=.16,dur=.19){
    const f=NOTE(n);osc(f,t,dur,a,'triangle',state.music);
    osc(f*2,t,dur*.55,a*.18,'sine',state.music);
  }
  // Eight bars, 4/4, G major, 106 bpm. Entirely original melody.
  const chords=[[55,59,62,67],[52,55,59,64],[48,52,55,60],[50,54,57,62],
    [55,59,62,67],[52,55,59,64],[48,52,55,60],[50,54,57,62]];
  const melody=[
    74,null,76,null,79,76,74,null, 71,null,74,76,74,null,71,null,
    72,null,76,null,79,76,72,null, 69,null,72,74,72,null,69,null,
    74,null,76,79,81,null,79,76, 76,null,74,null,71,74,76,null,
    72,null,74,76,79,null,76,74, 71,null,69,71,74,null,67,null
  ];
  const beat=60/state.tempo, eighth=beat/2;
  function scheduleMusic(){
    if (!state.ctx || state.muted || state.ctx.state!=='running') return;
    const c=state.ctx;
    const until=c.currentTime+.32;
    let count=0;
    while(state.startTime+state.step*eighth < until && count++<18){
      const s=state.step, time=state.startTime+s*eighth;
      const bar=Math.floor(s/8)%8, i=s%8, ch=chords[bar];
      if (i===0){
        pluck(ch[0]-12,time,.13,.40);
        osc(90,time,.13,.19,'sine',state.music,{end:46});
        noise(time,.04,.028,3000);
      }
      if (i===4){
        pluck(ch[0]-12,time,.095,.28);
        noise(time,.07,.032,2400);
      }
      if(i===2||i===6)noise(time,.035,.014,5500);
      // light eighth-note pizzicato arpeggio, with rhythmic gaps
      if([0,2,3,5,7].includes(i))pluck(ch[[1,2,3,1,2][[0,2,3,5,7].indexOf(i)]],time,.055,.16);
      if (melody[s%64]!==null) bell(melody[s%64],time+.015,.105,.23);
      state.step++;
    }
  }
  function syncMusic(){
    if(!state.ctx)return;
    // Background audio can be suspended while browser tab is hidden.
    if(state.startTime+state.step*eighth < state.ctx.currentTime-.8){
      state.startTime=state.ctx.currentTime+.08-state.step*eighth;
    }
  }
  function duck(duration=1.4){
    if (!state.ctx) return;
    state.duckEnds=Math.max(state.duckEnds,state.ctx.currentTime+duration);
    state.music.gain.cancelScheduledValues(state.ctx.currentTime);
    state.music.gain.setTargetAtTime(.12,state.ctx.currentTime,.10);
    setTimeout(()=>{
      if(!state.ctx)return;
      const remain=state.duckEnds-state.ctx.currentTime;
      if(remain>0){setTimeout(()=>duckRelease(), Math.ceil(remain*1000)+60);}else duckRelease();
    },Math.ceil(duration*1000)+80);
  }
  function duckRelease(){
    if(!state.ctx || state.ctx.currentTime<state.duckEnds-.025)return;
    state.music.gain.cancelScheduledValues(state.ctx.currentTime);
    state.music.gain.setTargetAtTime(.39,state.ctx.currentTime,.30);
  }
  function sound(type){
    if(!state.ctx || state.ctx.state!=='running' || state.muted)return;
    const t=state.ctx.currentTime+.008;
    switch(type){
      case 'type':
        // 부드러운 두 박자의 귀여운 키보드 톡톡 소리. 텍스트 한 단어마다 한 번.
        noise(t,.023,.047,2100);
        osc(680+Math.random()*120,t,.041,.047,'triangle',state.effects,{end:465});
        noise(t+.067,.016,.031,2650);
        osc(910+Math.random()*85,t+.067,.034,.029,'sine',state.effects,{end:670});
        break;
      case 'pickup':
        osc(440,t,.095,.15,'triangle',state.effects,{end:620});
        bell(79,t+.065,.13,.19,state.effects);break;
      case 'place':
        osc(420,t,.13,.12,'sine',state.effects,{end:290});
        osc(780,t+.035,.075,.055,'sine');break;
      case 'eat':
        osc(360,t,.11,.10,'sine',state.effects,{end:670});
        osc(630,t+.075,.12,.12,'triangle',state.effects,{end:820});break;
      case 'gem':
        [79,83,86,91].forEach((n,i)=>bell(n,t+i*.088,.19-i*.018,.38,state.effects));break;
      case 'win':
        [74,78,81,86,90].forEach((n,i)=>bell(n,t+i*.135,.24,.48,state.effects));
        bell(98,t+.75,.13,.8,state.effects);break;
      case 'salt':
        for(let i=0;i<8;i++){
          noise(t+i*.075,.045,.032,2800);
          osc(660+i%3*70,t+i*.075,.045,.033,'sine');
        }break;
      case 'fry':
        noise(t,.19,.085,2100);
        osc(265,t,.19,.08,'sine',state.effects,{end:420});break;
      case 'boil':
        // Irregular small crackles over the continuous oil sizzle.
        noise(t,.035+Math.random()*.085,.024+Math.random()*.028,1100+Math.random()*2800);
        if(Math.random()<.48) osc(135+Math.random()*170,t,.045+Math.random()*.055,.010+Math.random()*.016,'sine',state.effects,{end:180+Math.random()*160});
        break;
      case 'button':
        // Rounded, clearly audible two-part "bbo-jjak" stage-start cue.
        osc(390,t,.125,.23,'triangle',state.effects,{end:690});
        osc(580,t+.045,.095,.13,'sine',state.effects,{end:820});
        noise(t+.118,.068,.095,1900);
        osc(800,t+.132,.15,.20,'triangle',state.effects,{end:1040});
        osc(1240,t+.175,.12,.085,'sine');
        break;
      case 'whoosh-in':
        // Airy descending page slide.
        noise(t,.43,.13,650);
        osc(700,t,.38,.075,'triangle',state.effects,{end:240});
        break;
      case 'whoosh-out':
        // Airy ascending page slide.
        noise(t,.35,.115,950);
        osc(270,t,.34,.082,'triangle',state.effects,{end:880});
        break;
      case 'pop':
        // Party popper: strong but soft-edged attack.
        noise(t,.18,.26,550);
        osc(170,t,.19,.18,'sine',state.effects,{end:75});
        osc(630,t+.035,.14,.075,'triangle',state.effects,{end:1020});
        break;
      case 'applause':
        // Short original synthesized group applause, with staggered claps.
        for(let i=0;i<32;i++){
          const at=t+i*.057+(Math.random()-.5)*.018;
          const strength=.040+Math.random()*.046;
          noise(at,.026+Math.random()*.025,strength,620+Math.random()*740);
          if(i%3!==0) noise(at+.019,.016,strength*.44,1550);
        }
        break;
    }
  }
  function babble(duration=1.35){
    if(!state.ctx || state.muted)return;
    duck(duration+.22);
    let ms=0;
    while(ms<duration*1000){
      const at=ms;
      setTimeout(()=>{
        if(!state.ctx||state.muted)return;
        const t=state.ctx.currentTime+.005;
        const f=600+Math.random()*390;
        const len=.048+Math.random()*.072;
        // Short, vowel-like high-pitched electronic syllables, not words.
        osc(f,t,len,.07,'sawtooth',state.effects,{end:f*(.82+Math.random()*.34)});
        osc(f*.50,t,len*.85,.035,'triangle');
      },at);
      ms+=70+Math.random()*85;
    }
  }
  function startFryBed(){
    if (!state.ctx || state.ctx.state!=='running' || state.muted || state.fryBed) return;
    const c=state.ctx;
    // Continuous, gently bubbling oil: band-limited noise with slow volume variation.
    const length=Math.floor(c.sampleRate*1.5), buffer=c.createBuffer(1,length,c.sampleRate);
    const data=buffer.getChannelData(0);
    let low=0;
    for(let i=0;i<length;i++){
      low=low*.68+(Math.random()*2-1)*.32;
      data[i]=low;
    }
    const src=c.createBufferSource();src.buffer=buffer;src.loop=true;
    const hi=c.createBiquadFilter();hi.type='highpass';hi.frequency.value=470;
    const lo=c.createBiquadFilter();lo.type='lowpass';lo.frequency.value=5200;
    const gain=c.createGain();gain.gain.value=.12;
    const lfo=c.createOscillator(),depth=c.createGain();
    lfo.type='sine';lfo.frequency.value=4.4;depth.gain.value=.025;
    lfo.connect(depth);depth.connect(gain.gain);
    src.connect(hi);hi.connect(lo);lo.connect(gain);gain.connect(state.effects);
    src.start();lfo.start();state.fryBed=src;state.fryNodes={gain,lfo};
  }
  function stopFryBed(){
    if(state.fryBed){try{state.fryBed.stop();}catch(e){}state.fryBed.disconnect();state.fryBed=null;}
    if(state.fryNodes){try{state.fryNodes.lfo.stop();}catch(e){}state.fryNodes.lfo.disconnect();state.fryNodes.gain.disconnect();state.fryNodes=null;}
  }
  function scheduleBoilCrackle(){
    if(!state.boilOn || state.muted || !state.ctx || state.ctx.state!=='running') return;
    sound('boil');
    state.boilTimer=setTimeout(scheduleBoilCrackle,75+Math.random()*135);
  }
  function boilStart(){
    if(state.boilOn)return;
    state.boilOn=true;
    if(!state.ctx || state.muted)return;
    startFryBed();
    scheduleBoilCrackle();
  }
  function boilStop(){
    state.boilOn=false;
    if(state.boilTimer){clearTimeout(state.boilTimer);state.boilTimer=null;}
    stopFryBed();
  }
  function updateButton(){
    if(!button)return;
    button.textContent=state.muted?'🔇 소리 켜기':'🔊 소리 끄기';
    button.setAttribute('aria-pressed',String(!state.muted));
  }
  function toggle(){
    if(!state.ctx)ready();
    state.muted=!state.muted;
    if(state.ctx){
      const t=state.ctx.currentTime;
      state.master.gain.setTargetAtTime(state.muted?0:.72,t,.04);
      if(!state.muted){
        syncMusic();
        if(state.boilOn){startFryBed();if(!state.boilTimer)scheduleBoilCrackle();}
      }else{
        if(state.boilTimer){clearTimeout(state.boilTimer);state.boilTimer=null;}
        stopFryBed();
      }
    }
    updateButton();
  }
  button?.addEventListener('click',e=>{e.stopPropagation();toggle();});
  // Try to start as soon as the title screen appears. Most browsers block
  // audible autoplay without prior site permission; then the existing game
  // click resumes audio, without requiring an extra music-start button.
  ready();
  window.addEventListener('pageshow',()=>ready());
  stage?.addEventListener('pointerdown',()=>ready(),{capture:true});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){ if(state.ctx)state.ctx.suspend().catch(()=>{}); }
    else if(state.ctx&& !state.muted){state.ctx.resume().then(()=>{syncMusic();if(state.boilOn){startFryBed();if(!state.boilTimer)scheduleBoilCrackle();}}).catch(()=>{});}
  });
  updateButton();
  window.GameAudio={start:ready,play:sound,talk:babble,boilStart,boilStop,duck};
})();
