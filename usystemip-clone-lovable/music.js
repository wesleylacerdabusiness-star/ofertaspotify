export const TRACKS = [
  {id:'0VjIjW4GlUZAMYd2vXMi3b',title:'Blinding Lights',artist:'The Weeknd',tags:['pop','everyday'],color:'#923537'},
  {id:'39LLxExYz6ewLAcYrzQQyP',title:'Levitating',artist:'Dua Lipa',tags:['pop','everyday'],color:'#3e4295'},
  {id:'0nrRP2bk19rLc0orkWPQk2',title:'Wake Me Up',artist:'Avicii',tags:['electronic','nostalgia','everyday'],color:'#70521e'},
  {id:'69kOkLUCkxIZYexIgSG8rq',title:'Get Lucky (feat. Pharrell Williams and Nile Rodgers)',artist:'Daft Punk, Pharrell Williams, Nile Rodgers',tags:['electronic','nostalgia'],color:'#4a4b38'},
  {id:'2WfaOiMkCvy7F5fcp2zZ8L',title:'Take on Me',artist:'a-ha',tags:['classics','nostalgia'],color:'#435f7d'},
  {id:'4RvWPyQ5RL0ao9LPZeSouE',title:'Everybody Wants To Rule The World',artist:'Tears For Fears',tags:['classics','nostalgia','everyday'],color:'#476558'},
];
export const DEFAULT_TRACKS={'first-impression':TRACKS[0].id,playlist:TRACKS[2].id,standout:TRACKS[4].id};
export const findTrack=id=>TRACKS.find(t=>t.id===id);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ── Player ────────────────────────────────────────────────────────────────
   Uses the official Spotify embed iframe, exactly like the live site, so the
   layout is pixel-identical. (A local <audio> player is still available: the
   sp-* CSS rules and initPlayers()/pausePlayers() below stay in place.) */
const ICON_PLAY='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.6-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z"/></svg>';
const ICON_PAUSE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h3.4v16H7zM13.6 4H17v16h-3.4z"/></svg>';
const SPOTIFY_LOGO='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.42a.78.78 0 0 1-1.07.26c-2.93-1.79-6.62-2.2-10.97-1.2a.78.78 0 1 1-.35-1.52c4.76-1.09 8.84-.62 12.13 1.39.37.22.48.7.26 1.07Zm1.23-2.73a.97.97 0 0 1-1.34.32c-3.35-2.06-8.46-2.66-12.42-1.45a.97.97 0 1 1-.57-1.86c4.52-1.37 10.15-.7 14 1.66.46.28.6.88.33 1.33Zm.1-2.85C14.1 8.45 7.6 8.23 4.1 9.3a1.17 1.17 0 1 1-.68-2.23c4.02-1.22 11.2-.98 15.6 1.63a1.17 1.17 0 0 1-1.19 2Z"/></svg>';
const fmt=t=>{t=Math.max(0,Math.floor(t||0));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');};

export function renderSingleTrack(id,confirmed=false){
 const track=findTrack(id)||TRACKS[0];
 return `<div class="review-player"><div class="review-track-info" data-no-translate><strong class="review-track-title">${escape(track.title)}</strong><span class="review-track-artist">${escape(track.artist)}</span></div><iframe title="Official Spotify player" src="https://open.spotify.com/embed/track/${track.id}?utm_source=organic&theme=0&utm_campaign=&utm_medium=&utm_content=&utm_term=" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe><a class="spotify-external" href="https://open.spotify.com/track/${track.id}" target="_blank" rel="noopener noreferrer">Open in Spotify</a><button type="button" class="btn ${confirmed?'green':'outline'} full" data-listened aria-pressed="${confirmed}">${confirmed?'Listening confirmed':'I listened to this track'}</button></div>`;
}

export function initPlayers(root){
 if(!root)return;
 root.querySelectorAll('[data-player]').forEach(box=>{
  if(box.dataset.ready)return;
  box.dataset.ready='1';
  const audio=box.querySelector('audio');
  const play=box.querySelector('[data-play]');
  const fill=box.querySelector('[data-fill]');
  const time=box.querySelector('[data-time]');
  const bar=box.querySelector('[data-seek]');
  if(!audio||!play||!fill||!time||!bar)return;
  let dragging=false;
  const paint=()=>{
   const d=audio.duration||0,c=audio.currentTime||0;
   fill.style.width=(d?Math.min(100,c/d*100):0)+'%';
   time.textContent=fmt(c)+(d?' / '+fmt(d):'');
   bar.setAttribute('aria-valuenow',String(Math.round(c)));
   bar.setAttribute('aria-valuemax',String(Math.round(d)));
  };
  const icon=()=>{
   const paused=audio.paused;
   play.innerHTML=paused?ICON_PLAY:ICON_PAUSE;
   play.setAttribute('aria-label',paused?'Play':'Pause');
   play.classList.toggle('is-playing',!paused);
   box.classList.toggle('is-playing',!paused);
  };
  const seekTo=x=>{
   const r=bar.getBoundingClientRect();
   if(!r.width||!audio.duration)return;
   audio.currentTime=Math.min(1,Math.max(0,(x-r.left)/r.width))*audio.duration;
   paint();
  };
  play.addEventListener('click',()=>{
   if(audio.paused){
    document.querySelectorAll('audio').forEach(a=>{if(a!==audio)a.pause();});
    if(audio.ended)audio.currentTime=0;
    const p=audio.play();
    if(p&&p.catch)p.catch(()=>{});
   }else audio.pause();
  });
  audio.addEventListener('play',icon);
  audio.addEventListener('pause',icon);
  audio.addEventListener('ended',()=>{audio.currentTime=0;paint();icon();});
  audio.addEventListener('timeupdate',paint);
  audio.addEventListener('loadedmetadata',paint);
  audio.addEventListener('durationchange',paint);
  bar.addEventListener('pointerdown',e=>{dragging=true;try{bar.setPointerCapture(e.pointerId);}catch(_){}seekTo(e.clientX);});
  bar.addEventListener('pointermove',e=>{if(dragging)seekTo(e.clientX);});
  bar.addEventListener('pointerup',()=>{dragging=false;});
  bar.addEventListener('pointercancel',()=>{dragging=false;});
  bar.addEventListener('keydown',e=>{
   if(e.key==='ArrowRight'&&audio.duration){audio.currentTime=Math.min(audio.duration,audio.currentTime+5);paint();e.preventDefault();}
   else if(e.key==='ArrowLeft'&&audio.duration){audio.currentTime=Math.max(0,audio.currentTime-5);paint();e.preventDefault();}
   else if(e.key===' '||e.key==='Enter'){play.click();e.preventDefault();}
  });
  paint();icon();
  const p=audio.play();
  if(p&&p.catch)p.catch(()=>{});
 });
}

export function pausePlayers(root){
 if(!root)return;
 root.querySelectorAll('audio').forEach(a=>a.pause());
}
