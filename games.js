/* FoxSpeak: тренажёры (вынесено из index.html). Порядок подключения: data.js → games.js → app.js */
/* тренажёры */
let trk,ti=0,tsc=0,tm_,trTok=0,rec;
function trOpen(k){trk=k;ti=0;tsc=0;$('#tr').classList.add('on');$('#trt').textContent=['🎬 ','🎵 ','🗣️ ','🐾 '][k]+t('n'+(k+1));trStep()}
function trClose(){trTok++;clearInterval(tm_);try{speechSynthesis.cancel();rec&&rec.stop()}catch(e){}$('#tr').classList.remove('on');render()}
function trStep(){trTok++;clearInterval(tm_);$('#trs').textContent='⭐ '+tsc;[dub,rhy,sha,trl][trk]()}
function tick(a){AC();ac.resume&&ac.resume();const T=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.frequency.value=a?1200:800;g.gain.setValueAtTime(.2*S.vol,T);g.gain.exponentialRampToValueAtTime(.001,T+.06);o.connect(g);g.connect(ac.destination);o.start(T);o.stop(T+.07)}
function dub(){const D2=[[3,1],[5,4],[9,7],[6,2]],p=D2[ti%4];
 $('#trb').innerHTML=`<div class="glass" style="padding:16px"><div class="mut">🎬 A</div><h2 style="margin:6px 0">${P[p[0]][0]}</h2><div class="mut">${tr(p[0])}</div><button class="btn g" id="d1" style="margin-top:8px">▶</button></div><div class="glass" style="padding:16px"><div class="mut">🎭 B — 🎤</div><h2 style="margin:6px 0">${P[p[1]][0]}</h2><div class="mut">${tr(p[1])}</div><button class="btn g" id="d2" style="margin-top:8px">🔊</button></div><button class="btn big" id="dn">✔</button>`;
 $('#d1').onclick=()=>say(P[p[0]][0],'en-GB');$('#d2').onclick=()=>say(P[p[1]][0],'en-US');$('#dn').onclick=()=>{tsc++;ti++;trStep()};setTimeout(()=>say(P[p[0]][0],'en-GB'),300)}
const syl=w=>w.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy]+$)?|[^aeiouy]+$/gi)||[w];
function rhy(){const i=ti%P.length,sy=P[i][0].split(' ').flatMap(w=>syl(w.replace(/[^\w']/g,''))),tok=trTok;let j=0,fin=0;
 $('#trb').innerHTML=`<div class="mut">${tr(i)}</div><div style="font-size:30px;font-weight:800;line-height:1.7">${sy.map((x,k)=>`<span class="sy" id="sy${k}" style="padding:2px 6px;border-radius:10px">${x}</span>`).join('·')}</div><label class="mut">🥁 <input type="range" id="bp" min="60" max="120" value="${S.bpm||80}"></label>`;
 const go=()=>{$$('.sy').forEach(e=>e.style.background='');if(j<sy.length){$('#sy'+j).style.background='var(--or)';tick(j%4===0);j++}else{fin=1;clearInterval(tm_);say(P[i][0]);tsc++;$('#trs').textContent='⭐ '+tsc;setTimeout(()=>{if(tok===trTok){ti++;trStep()}},2400)}};
 const run=()=>{clearInterval(tm_);tm_=setInterval(go,60000/(S.bpm||80))};$('#bp').oninput=e=>{S.bpm=+e.target.value;save();if(!fin)run()};run()}
function sha(){const i=ti%P.length,en=P[i][0],tok=trTok,SR=window.SpeechRecognition||window.webkitSpeechRecognition;let got=0;
 $('#trb').innerHTML=`<div class="mut">${tr(i)}</div><h1>${en}</h1><div id="sr" style="font-size:44px">🔊</div><button class="btn g" id="sn">▶▶</button>`;
 const next=()=>{if(tok===trTok){ti++;trStep()}};$('#sn').onclick=()=>{try{rec&&rec.stop()}catch(e){}speechSynthesis.cancel();next()};
 const u=new SpeechSynthesisUtterance(en);u.lang=S.acc;u.rate=S.rate;u.pitch=S.pitch;u.volume=S.vol;
 u.onend=()=>{if(tok!==trTok)return;$('#sr').textContent='🎤';if(!SR){setTimeout(next,Math.max(1500,en.length*110));return}
  try{rec=new SR();rec.lang='en-US';rec.onresult=e=>{got=1;const h=e.results[0][0].transcript.toLowerCase().replace(/[^a-z' ]/g,'').split(' '),w=en.toLowerCase().replace(/[^a-z' ]/g,'').split(' '),q=Math.round(w.filter(x=>h.includes(x)).length/w.length*100);if(q>=70)tsc++;$('#sr').textContent=(q>=70?'✅ ':'🔁 ')+q+'%';$('#trs').textContent='⭐ '+tsc;setTimeout(next,1500)};rec.onerror=()=>setTimeout(next,800);rec.onend=()=>{if(!got)setTimeout(next,600)};rec.start()}catch(e){setTimeout(next,2000)}};
 speechSynthesis.cancel();speechSynthesis.speak(u)}
function trl(){if(ti>=5){$('#trb').innerHTML=`<div style="font-size:64px">🏁</div><h1>${tsc} / 5</h1><button class="btn big" id="ra">🔁</button>`;$('#ra').onclick=()=>{ti=0;tsc=0;trStep()};return}
 const i=(ti*3+1)%P.length,ws=P[i][0].split(' '),sh=ws.map((w,k)=>w).sort(()=>Math.random()-.5),tok=trTok;let pos=0,tl=20;
 $('#trb').innerHTML=`<div class="bar"><i id="tlb"></i></div><div class="mut">${tr(i)} · ${ti+1}/5</div><h2 id="bt" style="min-height:40px">…</h2><div class="pills">${sh.map(x=>`<button class="pill tw">${x}</button>`).join('')}</div>`;
 const fin=ok=>{clearInterval(tm_);if(ok){tsc++;say(P[i][0])}else $('#bt').textContent=P[i][0];ti++;$('#trs').textContent='⭐ '+tsc;setTimeout(()=>{if(tok===trTok)trl()},ok?900:1500)};
 $$('.tw').forEach(b=>b.onclick=()=>{if(b.disabled)return;if(b.textContent===ws[pos]){b.disabled=true;b.style.opacity=.3;pos++;$('#bt').textContent=ws.slice(0,pos).join(' ');if(pos===ws.length)fin(true)}else{b.style.background='#d94a4a';tl-=3}});
 tm_=setInterval(()=>{tl-=.1;$('#tlb').style.width=Math.max(0,tl/20*100)+'%';if(tl<=0)fin(false)},100)}
/* интервалы повторений (закон 2.2): стадии 0 → 10 мин → 1 день → 3 дня → 7 дней. Хранится в S.sr = {i:{s:стадия,d:время возврата}} — это часть S, S пишется в IndexedDB (foxspeak, ключ S) */
const FoxSR=(()=>{
 const GAP=[0,6e5,864e5,2592e5,6048e5],MAXS=4,now=()=>Date.now(),ks=o=>Object.keys(o).map(Number),get=i=>S.sr[i]||{s:0,d:0};
 return{GAP,
  /* старые сохранения: «выученные» по прежнему правилу не доказаны — вернутся на проверку через 10 мин */
  init(){S.sr=S.sr||{};ks(S.learned).forEach(k=>{if(!S.sr[k])S.sr[k]={s:1,d:now()+GAP[1]}})},
  /* порядок: немедленные повторы (до 2) → срок вышел (самые просроченные первыми) → новые. Прошлую фразу не даём никогда; нечего дать — null */
  pick(last){const n=now(),cy=ks(S.cyc).filter(i=>i!==last);
   if(cy.length)return{i:cy[Math.random()*cy.length|0],k:'rep'};
   const du=ks(S.sr).filter(i=>i!==last&&!(i in S.cyc)&&S.sr[i].d<=n).sort((a,b)=>S.sr[a].d-S.sr[b].d);
   if(du.length)return{i:du[0],k:'due'};
   const nw=P.map((_,i)=>i).filter(i=>i!==last&&!(i in S.sr)&&!S.learned[i]);
   return nw.length?{i:nw[Math.random()*nw.length|0],k:'new'}:null},
  /* верный ответ: k = 'new' | 'rep' | 'due'; h = была подсказка */
  ok(i,k,h){const n=now(),e=get(i);
   if(h){e.d=n+GAP[Math.max(e.s,1)];S.sr[i]=e;return}
   if(k==='rep'){delete S.cyc[i];e.d=n+GAP[Math.max(e.s,1)];S.sr[i]=e;return}
   if(k==='due')S.learned[i]=1;
   e.s=Math.min(MAXS,e.s+1);e.d=n+GAP[e.s];delete S.cyc[i];S.sr[i]=e},
  /* ошибка: стадия вниз на одну, возврат не раньше чем через 10 мин, до 2 немедленных повторов */
  bad(i){const e=get(i);e.s=Math.max(0,e.s-1);e.d=now()+GAP[Math.max(e.s,1)];S.sr[i]=e;if(!(i in S.cyc))S.cyc[i]=0}}})();
/* ответ на карточке спринта: большая кнопка + режимы «Слова» / «Микрофон» (S.amode: 'w' | 'm') */
const FoxAns=(()=>{
 let st=0,rc,sm=0,ch=[],url,au,stm,tt,tk=0;
 const M=()=>S.amode==='m'?'m':'w';
 const sfx=a=>{try{AC();ac.resume&&ac.resume();const T=ac.currentTime;a.forEach(([f,d,s,y])=>{const o=ac.createOscillator(),g=ac.createGain();o.type=y||'sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,T+s);g.gain.exponentialRampToValueAtTime(Math.max(.0002,.18*S.vol),T+s+.02);g.gain.exponentialRampToValueAtTime(.0001,T+s+d);o.connect(g);g.connect(ac.destination);o.start(T+s);o.stop(T+s+d+.03)})}catch(e){}};
 const SND={on:[[660,.09,0],[880,.13,.1]],off:[[880,.09,0],[660,.13,.1]],ok:[[660,.1,0],[880,.1,.1],[1320,.24,.2]],no:[[330,.18,0,'triangle'],[247,.24,.17,'triangle']]};
 function cls(){tk++;clearTimeout(tt);if(au){try{au.pause()}catch(e){}au=null}if(url){URL.revokeObjectURL(url);url=null}
  if(rc){rc.onstop=null;try{rc.state!=='inactive'&&rc.stop()}catch(e){}rc=null}
  if(stm){stm.getTracks().forEach(x=>x.stop());stm=null}st=0}
 function seg(){['w','m'].forEach(m=>{const b=$('#am'+m);if(!b)return;b.textContent=t('am'+m);b.classList.toggle('sel',M()===m);b.setAttribute('aria-pressed',M()===m)})}
 function render(){if(cur<0)return;const m=M();
  $('#fr').innerHTML=`<div class="em">${EM[cur]}</div><h1 style="font-size:28px">${tr(cur)}</h1><div class="ins">${t(m==='m'?'ainm':'ainw')}</div><button class="btn big abtn" id="ab" type="button">${t(m==='m'?'abm':'abw')}</button>`;
  $('#ab').onclick=e=>{e.stopPropagation();go()}}
 function go(){if(busy)return;if(M()==='w'){flip();return}if(st===1)stop();else if(st===0)start()}
 async function start(){
  if(!navigator.mediaDevices||!window.MediaRecorder){drop(t('anomic'));return}
  const my=++tk,b=$('#ab');b.disabled=true;let s;
  try{s=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){if(my===tk&&$('#ab'))$('#ab').disabled=false;if(my===tk)drop(t('anomic'));return}
  if(my!==tk){s.getTracks().forEach(x=>x.stop());return}
  stm=s;const ty=['audio/webm;codecs=opus','audio/mp4','audio/webm'].find(x=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(x));
  try{rc=ty?new MediaRecorder(s,{mimeType:ty}):new MediaRecorder(s)}catch(e){cls();$('#ab').disabled=false;drop(t('anomic'));return}
  ch=[];rc.ondataavailable=e=>{e.data&&e.data.size&&ch.push(e.data)};rc.onstop=done;rc.start();st=1;
  clearInterval(tmr);$('#tb').style.width='100%';tmr=setInterval(()=>{S.secs+=.1},100);
  const a=$('#ab');a.disabled=false;a.classList.add('rec');a.textContent=t('abs');sfx(SND.on);tt=setTimeout(stop,20000)}
 function stop(){clearTimeout(tt);try{rc&&rc.state==='recording'&&rc.stop()}catch(e){}}
 function done(){const ty=(rc&&rc.mimeType)||'audio/webm';if(stm){stm.getTracks().forEach(x=>x.stop());stm=null}
  if(!ch.length){cls();render();drop(t('anomic'));return}
  url=URL.createObjectURL(new Blob(ch,{type:ty}));st=2;sfx(SND.off);panel()}
 function panel(){
  $('#fr').innerHTML=`<h1 style="font-size:26px">${tr(cur)}</h1><button class="btn g" id="al" type="button">${t('alis')}</button><button class="btn g" id="ar" type="button">${t('aref')}</button><div class="row" style="gap:10px"><button class="btn g" id="an" type="button" style="flex:1">${t('aretry')}</button><button class="btn" id="ay" type="button" style="flex:1">${t('aok')}</button></div>`;
  $('#al').onclick=e=>{e.stopPropagation();try{au&&au.pause();au=new Audio(url);au.play().catch(()=>{})}catch(x){}};
  $('#ar').onclick=e=>{e.stopPropagation();$('#ar').textContent='🔊 '+P[cur][0];say(P[cur][0])};
  $('#an').onclick=e=>{e.stopPropagation();if(!sm){sm=1;FoxSR.bad(cur);run=0;S.tele.push({t:Date.now(),i:cur,type:'self'});S.tele=S.tele.slice(-200);save()}sfx(SND.no);cls();say(P[cur][0]);render()};
  $('#ay').onclick=e=>{e.stopPropagation();if(busy)return;sfx(SND.ok);cls();win()}}
 function setMode(m){if(M()===m)return;S.amode=m;save();seg();if(!busy&&cur>=0){cls();$('#cd').classList.remove('f');render()}}
 return{render,seg,reset(){cls();sm=0},init(){$('#amw').onclick=()=>setMode('w');$('#amm').onclick=()=>setMode('m');seg()}}})();
window.FoxGames={open:trOpen,close:trClose,init(){$('#trx').onclick=trClose;FoxAns.init()}};
