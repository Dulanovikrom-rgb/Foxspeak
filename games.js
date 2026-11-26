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
window.FoxGames={open:trOpen,close:trClose,init(){$('#trx').onclick=trClose}};
