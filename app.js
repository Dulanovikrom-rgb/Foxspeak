/* FoxSpeak: логика приложения (вынесено из index.html). Порядок подключения: data.js → games.js → app.js */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* ---------- данные ---------- */
const N={ru:["Главная","Материалы","Профиль","Голосовой Спринт"],tt:["Баш бит","Материаллар","Профиль","Тавыш спринты"],uz:["Bosh sahifa","Materiallar","Profil","Ovozli Sprint"],tg:["Асосӣ","Маводҳо","Профил","Спринти овозӣ"],kk:["Басты бет","Материалдар","Профиль","Дауыстық спринт"],ky:["Башкы бет","Материалдар","Профиль","Үн спринти"],tr:["Ana sayfa","Materyaller","Profil","Sesli Sprint"],tk:["Baş sahypa","Materiallar","Profil","Ses sprinti"]};
const LN={ru:'Русский',tt:'Татарча',uz:'O‘zbekcha',tg:'Тоҷикӣ',kk:'Қазақша',ky:'Кыргызча',tr:'Türkçe',tk:'Türkmençe'};
const P=[["Smile, baby!","Улыбнись, малыш!","Gülümse, bebeğim!","Jilmay, bolam!"],["Let's hit the road!","Поехали!","Haydi yola çıkalım!","Yo'lga chiqdik!"],["I want to sleep","Я хочу спать","Uyumak istiyorum","Men uxlagim keladi"],["How are you?","Как дела?","Nasılsın?","Ahvollar qalay?"],["I can help you","Я могу тебе помочь","Sana yardım edebilirim","Men sizga yordam bera olaman"],["Where is my phone?","Где мой телефон?","Telefonum nerede?","Telefonim qayerda?"],["We need to talk","Нам нужно поговорить","Konuşmamız lazım","Gaplashishimiz kerak"],["Thank you very much","Большое спасибо","Çok teşekkürler","Katta rahmat"],["She is going to run","Она собирается бежать","O koşacak","U yugurmoqchi"],["Do you want some water?","Хочешь воды?","Su ister misin?","Suv xohlaysizmi?"]];
const AS={0:["Кто в телефоне улыбается?","В телефоне улыбается <b>СМАЙЛ</b>ик → <b>SMILE</b>"],7:["Что мы говорим, когда нам налили чай?","<b>СЭНК</b> тебе, друг → <b>THANK</b> you"]};
const EM=["😊","🛣️","😴","👋","🤝","📱","💬","🙏","🏃","💧"];
const ALPHA="A [æ] Apple,B [b] Boy,C [k] Cat,D [d] Dog,E [e] Egg,F [f] Fox,G [g] Girl,H [h] Hat,I [ɪ] Ink,J [dʒ] Jam,K [k] King,L [l] Lion,M [m] Moon,N [n] Nose,O [ɒ] Orange,P [p] Pen,Q [kw] Queen,R [r] Red,S [s] Sun,T [t] Tea,U [ʌ] Up,V [v] Van,W [w] Water,X [ks] Box,Y [j] Yes,Z [z] Zoo".split(',');
const DIG=[["th","[θ]","think"],["sh","[ʃ]","ship"],["ch","[tʃ]","chair"],["ph","[f]","phone"],["oo","[uː]","moon"],["ee","[iː]","tree"]];
const PR=["I","You","We","They","He","She"],CO=["can","want to","need to","going to"],QS=["Do you","Does he","Will you"];
const cf=(p,c)=>{const t3=p==='He'||p==='She';if(c==='want to'||c==='need to')return p+' '+c.replace(/^(\w+)/,(m)=>t3?m+'s':m);if(c==='going to'){const be={I:"I'm",You:"You're",We:"We're",They:"They're",He:"He's",She:"She's"}[p];return be+' going to'}return p+' '+c};
/* ---------- методики ---------- */
const METH=[['🧘','Комфортный темп','Без гонки и стыда','Таймер от 12 секунд до ∞ ты выбираешь сам. Мозг запоминает лучше, когда ему не страшно: начни спокойно и ускоряйся, когда рука сама тянется к нужному слову.'],['⚡','Скорость речи','Слов в час — твой счётчик','Спидометр считает, сколько слов ты собрал за час практики. Цель — говорить без паузы на мысленный перевод. Растёт скорость — растёт ранг: от Лисёнка до Альфа-Лиса.'],['📚','Живая база','Фразы, которые реально говорят','Только живые реплики, а не списки слов. Каждая фраза — готовый кирпичик, который ты потом переставляешь под себя.'],['🌺','Ассоциации','Созвучие вместо зубрёжки','Лис находит русское созвучие и рисует сцену: в телефоне улыбается СМАЙЛик — SMILE. Смешная картинка запоминается с первого раза.'],['♾️','Максимум 2 повтора','Без зубрёжки','Ошибся или попросил подсказку — фраза вернётся сразу, но не больше 2 раз подряд; дальше она придёт позже.'],['🏋️','Мощная практика','Собери, услышь, скажи','Ты собираешь фразу по словам, слышишь голос носителя и повторяешь вслух. Глаз, ухо и рот работают вместе — запоминание быстрее.']];
function meth(i){const m=METH[i];$('#mb').innerHTML=`<div style="font-size:56px">${m[0]}</div><h2 style="margin:6px 0">${mth(i,0)}</h2><p>${mth(i,1)}</p><button class="btn" id="mx">${t('ok')}</button>`;$('#md').classList.add('on');$('#mx').onclick=()=>$('#md').classList.remove('on')}
$('#md').onclick=e=>{if(e.target.id==='md')$('#md').classList.remove('on')};
const FOXSRC='fox_hero.png';
const D={"tap": "Жми — включим режим охоты!|Бас — аучы режимын кабызабыз!|Bos — ov rejimini yoqamiz!|Пахш кун — реҷаи шикорро фаъол мекунем!|Бас — аң аулау режимін қосамыз!|Бас — аңчылык режимин күйгүзөбүз!|Dokun — av modunu açıyoruz!|Bas — awçylyk režimini açýarys!", "wph": "слов/час|сүз/сәг|so‘z/soat|калима/соат|сөз/сағ|сөз/саат|kelime/saat|söz/sagat", "wd": "слов|сүз|so‘z|калима|сөз|сөз|kelime|söz", "bell": "🔔 Включить|🔔 Кабызу|🔔 Yoqish|🔔 Фаъол кардан|🔔 Қосу|🔔 Күйгүзүү|🔔 Aç|🔔 Işjeň et", "all": "Все слова усвоены|Барлык сүзләр истә|Barcha so‘zlar o‘zlashtirildi|Ҳамаи калимаҳо азхуд шуданд|Барлық сөз меңгерілді|Бардык сөз өздөштүрүлдү|Tüm kelimeler öğrenildi|Ähli sözler öwrenildi", "rep": "Повторить: {n} слов|Кабатларга: {n} сүз|Takrorlash: {n} ta so‘z|Такрор: {n} калима|Қайталау: {n} сөз|Кайталоо: {n} сөз|Tekrar: {n} kelime|Gaýtala: {n} söz", "trn": "Тренажёры|Күнегүләр|Trenajyorlar|Машқҳо|Жаттығулар|Көнүгүүлөр|Egzersizler|Maşklar", "lv": "Уровни CEFR|CEFR дәрәҗәләре|CEFR darajalari|Сатҳҳои CEFR|CEFR деңгейлері|CEFR деңгээлдери|CEFR seviyeleri|CEFR derejeleri", "k1": "Конструктор|Конструктор|Konstruktor|Конструктор|Конструктор|Конструктор|Kurucu|Gurujy", "k2": "Алфавит|Әлифба|Alifbo|Алифбо|Әліпби|Алиппе|Alfabe|Elipbiý", "k3": "Шпаргалки|Шпаргалкалар|Yordamchi jadvallar|Хатчӯбҳо|Шпаргалкалар|Шпаргалкалар|Kopya kâğıtları|Şpargalkalar", "pv": "Настройки голоса и Лиса|Тавыш һәм Төлке көйләүләре|Ovoz va Tulki sozlamalari|Танзимоти овоз ва Рӯбоҳ|Дауыс және Түлкі баптаулары|Үн жана Түлкү жөндөөлөрү|Ses ve Tilki ayarları|Ses we Tilki sazlamalary", "sp": "Скорость|Тизлек|Tezlik|Суръат|Жылдамдық|Ылдамдык|Hız|Tizlik", "pt": "Высота|Биеклек|Balandlik|Баландӣ|Биіктік|Бийиктик|Ton|Belentlik", "vl": "Громкость Лиса|Төлке тавышы|Tulki ovozi|Овози Рӯбоҳ|Түлкі дауысы|Түлкү үнү|Tilki sesi|Tilkiniň sesi", "chk": "🗣️ Проверить|🗣️ Тикшерү|🗣️ Tekshirish|🗣️ Санҷидан|🗣️ Тексеру|🗣️ Текшерүү|🗣️ Dene|🗣️ Barla", "pm": "Скачать Premium голоса ⓘ|Premium тавышлар ⓘ|Premium ovozlarni yuklash ⓘ|Овозҳои Premium ⓘ|Premium дауыстар ⓘ|Premium үндөр ⓘ|Premium sesleri indir ⓘ|Premium sesleri ýükle ⓘ", "dt": "Сложность и Таймер|Кыенлык һәм таймер|Qiyinlik va taymer|Душворӣ ва таймер|Қиындық және таймер|Кыйынчылык жана таймер|Zorluk ve Zamanlayıcı|Kynlyk we taýmer", "d1": "Низкая|Түбән|Past|Паст|Төмен|Төмөн|Düşük|Pes", "d2": "Средняя|Уртача|O‘rta|Миёна|Орташа|Орточо|Orta|Orta", "d3": "Высокая|Югары|Yuqori|Баланд|Жоғары|Жогору|Yüksek|Ýokary", "d4": "Авто|Авто|Avto|Авто|Авто|Авто|Otomatik|Awto", "lf": "Lo-Fi музыка|Lo-Fi музыка|Lo-Fi musiqa|Lo-Fi мусиқӣ|Lo-Fi музыка|Lo-Fi музыка|Lo-Fi müzik|Lo-Fi aýdym-saz", "von": "Вкл|Кабыз|Yoq|Фаъол|Қос|Күй|Açık|Aç", "voff": "Выкл|Сүнд|O‘ch|Хомӯш|Өшір|Өчүр|Kapalı|Öçür", "mh": "Методики Лиса|Төлке методикалары|Tulki metodikalari|Методикаҳои Рӯбоҳ|Түлкі әдістері|Түлкү методикалары|Tilki yöntemleri|Tilki usullary", "hint": "💡 Подсказка (Ассоциация)|💡 Ишарә (ассоциация)|💡 Maslahat (assotsiatsiya)|💡 Маслиҳат (ассотсиатсия)|💡 Кеңес (ассоциация)|💡 Кеңеш (ассоциация)|💡 İpucu (çağrışım)|💡 Maslahat (assosiasiýa)", "ok": "Понятно|Аңлашылды|Tushunarli|Фаҳмо шуд|Түсінікті|Түшүнүктүү|Anladım|Düşnükli", "tans": "Нажми, чтобы ответить|Җавап бирү өчен бас|Javob berish uchun bosing|Барои ҷавоб пахш кунед|Жауап беру үшін бас|Жооп берүү үчүн бас|Yanıtlamak için dokun|Jogap bermek üçin bas", "rt": "Правильно:|Дөрес:|To‘g‘ri:|Дуруст:|Дұрыс:|Туура:|Doğrusu:|Dogrusy:", "r4": "Повторим — максимум 2 раза|Кабатлыйбыз — иң күбе 2 тапкыр|Takrorlaymiz — ko‘pi bilan 2 marta|Такрор мекунем — ҳадди аксар 2 бор|Қайталаймыз — ең көбі 2 рет|Кайталайбыз — эң көп 2 жолу|Tekrar — en fazla 2 kez|Gaýtalaýarys — iň köp 2 gezek"};const LK=Object.keys(LN);
Object.assign(D,DA);
const t=k=>{const v=(D[k]||k).split('|');return v[LK.indexOf(S.lang)]||v[0]};
const FL={"ru": "<rect width=\"30\" height=\"20\" fill=\"#fff\"/><rect y=\"6.67\" width=\"30\" height=\"6.67\" fill=\"#0039a6\"/><rect y=\"13.33\" width=\"30\" height=\"6.67\" fill=\"#d52b1e\"/>", "tt": "<rect width=\"30\" height=\"20\" fill=\"#00a550\"/><rect y=\"13.4\" width=\"30\" height=\"6.6\" fill=\"#e4002b\"/><rect y=\"12.4\" width=\"30\" height=\"1\" fill=\"#fff\"/>", "uz": "<rect width=\"30\" height=\"20\" fill=\"#fff\"/><rect width=\"30\" height=\"6.5\" fill=\"#0099b5\"/><rect y=\"13.5\" width=\"30\" height=\"6.5\" fill=\"#1eb53a\"/><rect y=\"6.5\" width=\"30\" height=\".6\" fill=\"#ce1126\"/><rect y=\"12.9\" width=\"30\" height=\".6\" fill=\"#ce1126\"/><circle cx=\"5\" cy=\"3.2\" r=\"2\" fill=\"#fff\"/><circle cx=\"5.8\" cy=\"3.2\" r=\"1.7\" fill=\"#0099b5\"/>", "tg": "<rect width=\"30\" height=\"20\" fill=\"#fff\"/><rect width=\"30\" height=\"5.7\" fill=\"#c00\"/><rect y=\"14.3\" width=\"30\" height=\"5.7\" fill=\"#060\"/><circle cx=\"15\" cy=\"10\" r=\"2.2\" fill=\"#f8c300\"/>", "kk": "<rect width=\"30\" height=\"20\" fill=\"#00afca\"/><circle cx=\"15\" cy=\"10\" r=\"4\" fill=\"#fec50c\"/>", "ky": "<rect width=\"30\" height=\"20\" fill=\"#e8112d\"/><circle cx=\"15\" cy=\"10\" r=\"4.5\" fill=\"#ffef00\"/><circle cx=\"15\" cy=\"10\" r=\"2.2\" fill=\"#e8112d\"/>", "tr": "<rect width=\"30\" height=\"20\" fill=\"#e30a17\"/><circle cx=\"11\" cy=\"10\" r=\"5\" fill=\"#fff\"/><circle cx=\"12.4\" cy=\"10\" r=\"4\" fill=\"#e30a17\"/><circle cx=\"16\" cy=\"10\" r=\"1.4\" fill=\"#fff\"/>", "tk": "<rect width=\"30\" height=\"20\" fill=\"#00843d\"/><rect x=\"4\" width=\"4.5\" height=\"20\" fill=\"#d22630\"/><circle cx=\"14\" cy=\"5\" r=\"2.2\" fill=\"#fff\"/><circle cx=\"14.8\" cy=\"5\" r=\"1.8\" fill=\"#00843d\"/>"};
let fl0;function setFlag(){document.documentElement.lang=S.lang;const f=$('#flag');if(fl0===S.lang)return;const first=!fl0;fl0=S.lang;const set=()=>{f.innerHTML='<svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">'+FL[S.lang]+'</svg>';f.style.opacity=.16};if(first)set();else{f.style.opacity=0;setTimeout(set,450)}}
function applyStatic(){$('#hb').textContent=t('hint');$('#shx').textContent=t('ok');FoxAns.seg()}
const av=(z=46)=>FOXSRC?`<img class="av" style="width:${z}px;height:${z}px" src="${FOXSRC}" alt="" onerror="avFb(this)">`:`<div style="width:${z}px">${fox()}</div>`;
function foxFallback(i){const d=document.createElement('div');d.style.cssText='width:160px;height:150px;margin:0 auto';d.innerHTML=fox();i.replaceWith(d)}
function avFb(i){const d=document.createElement('div');d.style.width=i.style.width;d.innerHTML=fox();i.replaceWith(d)}
function foxHop(){const f=$('#fx');if(!f)return;f.classList.remove('hop');void f.offsetWidth;f.classList.add('hop','talk');setTimeout(()=>f.classList.remove('talk'),1500)}
/* ---------- состояние + IndexedDB ---------- */
const DB={db:null,open(){return new Promise(r=>{try{const q=indexedDB.open('foxspeak',1);q.onupgradeneeded=()=>q.result.createObjectStore('kv');q.onsuccess=()=>{this.db=q.result;r()};q.onerror=()=>r()}catch(e){r()}})},get(k){return new Promise(r=>{try{const q=this.db.transaction('kv').objectStore('kv').get(k);q.onsuccess=()=>r(q.result);q.onerror=()=>r()}catch(e){r()}})},set(k,v){try{this.db.transaction('kv','readwrite').objectStore('kv').put(v,k)}catch(e){}}};
let S={lang:'ru',acc:'en-US',rate:1,pitch:1,vol:1,learned:{},cyc:{},today:0,day:'',days:{},words:0,secs:0,deadline:0,seen:0,lofi:false,amode:'w',sr:{},timer:12,diff:'auto',tele:[]};
const save=()=>DB.set('S',S);
const L=()=>S.lang;
const tr=i=>P[i][L()==='tr'?2:L()==='uz'?3:1];
const today=()=>new Date().toISOString().slice(0,10);
function toast(t,ms){const e=document.createElement('div');e.className='toast';e.textContent=t;document.body.append(e);setTimeout(()=>e.remove(),ms||2200)}
function confetti(){for(let i=0;i<28;i++){const e=document.createElement('span');e.className='cf';e.textContent=['🎉','✨','🦊','⭐'][i%4];e.style.left=Math.random()*100+'vw';e.style.animationDelay=Math.random()*.6+'s';document.body.append(e);setTimeout(()=>e.remove(),2800)}}
/* ---------- звук ---------- */
function say(t,l){if(!window.speechSynthesis)return;const u=new SpeechSynthesisUtterance(t);u.lang=l||S.acc;u.rate=S.rate;u.pitch=S.pitch;u.volume=S.vol;const fx=$("#fx");if(fx){fx.classList.add("talk");u.onend=u.onerror=()=>fx.classList.remove("talk")}speechSynthesis.cancel();speechSynthesis.speak(u)}
let ac,lo;const AC=()=>ac=ac||new(window.AudioContext||window.webkitAudioContext)();
function lofi(on){clearInterval(lo);lo=0;if(!on)return;AC();const ch=[[220,261.6,329.6],[174.6,220,261.6],[196,246.9,293.7],[164.8,196,246.9]];let i=0;const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=900;const g=ac.createGain();g.gain.value=.05*S.vol;f.connect(g);g.connect(ac.destination);const bar=()=>{ch[i++%4].forEach(fr=>{const o=ac.createOscillator(),e=ac.createGain(),t=ac.currentTime;o.type='triangle';o.frequency.value=fr;e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(.5,t+.4);e.gain.linearRampToValueAtTime(0,t+3.4);o.connect(e);e.connect(f);o.start();o.stop(t+3.5)})};bar();lo=setInterval(bar,3500)}
function purr(){AC();ac.resume&&ac.resume();const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type='square';o.frequency.setValueAtTime(900,t);o.frequency.exponentialRampToValueAtTime(300,t+.07);g.gain.setValueAtTime(.12*S.vol,t);g.gain.exponentialRampToValueAtTime(.001,t+.09);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+.1)}
/* ---------- лиса ---------- */
const fox=()=>`<svg class="fox" viewBox="0 0 120 110" aria-hidden="true"><path d="M8 8 L46 30 L74 30 L112 8 L108 62 Q60 114 12 62Z" fill="#ff7a29"/><path d="M8 8 L36 28 L14 44Z M112 8 L84 28 L106 44Z" fill="#6b2a0c"/><path d="M12 62 Q60 114 108 62 Q84 76 60 72 Q36 76 12 62Z" fill="#fff4e6"/><g class="eye"><ellipse cx="42" cy="52" rx="6" ry="8" fill="#2a1200"/><ellipse cx="78" cy="52" rx="6" ry="8" fill="#2a1200"/></g><circle cx="60" cy="80" r="6" fill="#2a1200"/></svg>`;
function drop(t,sy){toast(t,3800);if(sy)say(sy)}
/* ---------- рендер ---------- */
let view='home';
function rank(w){return w>=3000?t('r4'):w>=1500?t('r3'):w>=800?t('r2'):t('r1')}
const wph=()=>S.secs>5?Math.round(S.words/S.secs*3600):0;
function setNav(){const V=[['home','🏠',N[L()][0]],['mat','📚',N[L()][1]],['voc','📖',t('vk')],['prof','🦊',N[L()][2]]];$('#nav').innerHTML=V.map(v=>`<button class="${v[0]===view?'on':''}" data-v="${v[0]}">${v[1]}<br>${v[2]}</button>`).join('');$$('#nav button').forEach(b=>b.onclick=()=>{view=b.dataset.v;render()})}
function render(){setNav();setFlag();applyStatic();({home,mat,voc,prof}[view])();$('#app').scrollTop=0}
function home(){
 const w=wph(),a=Math.min(w/3000,1)*172,g=Math.min(S.today/30,1)*214;
 const left=P.length-Object.keys(S.learned).length,cy=Object.keys(S.cyc).length;
 const dl=S.deadline>Date.now()?Math.ceil((S.deadline-Date.now())/36e5):0;
 const wk=[1,2,3,4,5,6,7].map(i=>{try{return new Intl.DateTimeFormat(S.lang,{weekday:'short'}).format(new Date(2024,0,i))}catch(e){return['Пн','Вт','Ср','Чт','Пт','Сб','Вс'][i-1]}}),d0=new Date(),mon=new Date(d0);mon.setDate(d0.getDate()-((d0.getDay()+6)%7));
 $('#app').innerHTML=`<div class="row sp"><h1 style="font-size:26px">FoxSpeak</h1><div class="row"><select id="lg" aria-label="Язык">${Object.keys(LN).map(k=>`<option value="${k}" ${k===L()?'selected':''}>${k.toUpperCase()} ${LN[k]}</option>`).join('')}</select></div></div>
 <div class="glass hero row" style="margin-top:10px;padding:10px 12px;gap:6px;text-align:left"><div class="tilt" id="tl" style="flex:0 0 46%"><div id="fx" class="hero-fox" role="button" aria-label="Fox"><img id="fimg" alt="" src="${FOXSRC||'fox_hero.png'}" onerror="foxFallback(this)"></div></div><div style="flex:1;min-width:0;text-align:center"><div class="note" id="fq" style="font-size:17px;line-height:1.15;min-height:40px">${t('tap')}</div><svg viewBox="0 0 140 80" style="width:100%;max-width:130px"><path d="M14 70 A56 56 0 0 1 126 70" fill="none" stroke="#fff2" stroke-width="12" stroke-linecap="round"/><path d="M14 70 A56 56 0 0 1 126 70" fill="none" stroke="#ff7a29" stroke-width="12" stroke-linecap="round" stroke-dasharray="${a} 172"/></svg><div><b style="font-size:22px">${w}</b> <span class="mut">${t('wph')}</span></div><div class="note" style="font-size:19px">${rank(w)}</div><div class="row" style="justify-content:center;gap:8px;margin-top:4px"><svg viewBox="0 0 80 80" width="38"><circle cx="40" cy="40" r="34" fill="none" stroke="#fff2" stroke-width="10"/><circle cx="40" cy="40" r="34" fill="none" stroke="#6ef0c2" stroke-width="10" stroke-linecap="round" stroke-dasharray="${g} 214" transform="rotate(-90 40 40)"/></svg><span><b>${S.today}/30</b> <span class="mut">${t('wd')}</span></span></div></div></div>
 <button class="btn big" id="go" style="margin-top:12px">⚡ ${N[L()][3]}</button>
 ${dl?`<div class="glass" style="padding:14px;margin-top:12px"><b>⏳ ${dl} ч</b> — у тебя 2 дня, чтобы продолжить, иначе начнём заново!</div>`:''}
 
 <div class="glass row sp" style="padding:12px;margin-top:12px">${wk.map((x,i)=>{const d=new Date(mon);d.setDate(mon.getDate()+i);const k=d.toISOString().slice(0,10);return`<div style="text-align:center"><div class="mut">${x}</div><div style="font-size:20px">${S.days[k]?'🔥':'○'}</div></div>`}).join('')}</div>
 <div class="row sp" style="margin:12px 0"><span class="chip" style="flex:1">${cy+left===0?t('all'):t('rep').replace('{n}',cy||left)}</span><button class="btn g" id="bell">${t('bell')}</button></div>
 <h2>${t('trn')}</h2><div class="grid">${['🎬','🎵','🗣️','🐾'].map((e,i)=>`<button class="chip tr" data-i="${i}" style="color:var(--tx);font:inherit;font-weight:700">${e} ${t('n'+(i+1))}</button>`).join('')}</div>
 <h2>${t('lv')}</h2><div class="tabs">${['Pre-A1','A1','A2','B1','B2'].map(x=>`<button class="pill lv">${x} · 10</button>`).join('')}</div>`;
 $('#lg').onchange=e=>{S.lang=e.target.value;save();render()};
 $('#go').onclick=openSprint;$$('.lv').forEach(b=>b.onclick=openSprint);$$('.tr').forEach(b=>b.onclick=()=>FoxGames.open(+b.dataset.i));
 $('#bell').onclick=reminder;
 $('#fx').onclick=()=>{askTilt();purr();foxHop();const i=Math.random()*P.length|0;$('#fq').textContent=P[i][0]+' — '+tr(i);say(P[i][0])};
 tilt();
}
let tiltAsked=0;function askTilt(){if(tiltAsked)return;tiltAsked=1;const DO=window.DeviceOrientationEvent;if(DO&&DO.requestPermission)DO.requestPermission().catch(()=>{})}
function tilt(){const t=$('#tl');if(!t)return;const set=(x,y)=>t.style.transform=`rotateY(${x}deg) rotateX(${-y}deg)`;
 addEventListener('deviceorientation',e=>{if(e.gamma!=null)set(Math.max(-20,Math.min(20,e.gamma/2)),Math.max(-20,Math.min(20,(e.beta-45)/3)))});
 t.parentNode.addEventListener('touchmove',e=>{const r=t.getBoundingClientRect(),p=e.touches[0];set((p.clientX-r.left-r.width/2)/10,(p.clientY-r.top-r.height/2)/10)},{passive:true});
 t.parentNode.addEventListener('touchend',()=>set(0,0))}
function fxModal(h){$('#mb').innerHTML=h;$('#md').classList.add('on')}
function reminder(){fxModal(`<h2>${t('bell')}</h2><input id="rt" type="time" value="19:00" style="font-size:30px;text-align:center;margin:10px 0"><button class="btn big" id="rk">${t('ok')}</button>`);$('#rk').onclick=()=>{const v=$('#rt').value;$('#md').classList.remove('on');if(/^\d\d:\d\d$/.test(v))mkIcs(v)}}
function mkIcs(t){const [h,m]=t.split(':'),d=new Date().toISOString().slice(0,10).replace(/-/g,'');
 const ics=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nUID:fox-${Date.now()}\r\nDTSTAMP:${d}T000000Z\r\nDTSTART:${d}T${h}${m}00\r\nRRULE:FREQ=DAILY\r\nSUMMARY:FoxSpeak — 30 слов 🦊\r\nBEGIN:VALARM\r\nTRIGGER:PT0M\r\nACTION:DISPLAY\r\nDESCRIPTION:Пора заниматься\r\nEND:VALARM\r\nEND:VEVENT\r\nEND:VCALENDAR`;
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='foxspeak.ics';a.click()}
/* материалы */
let mt='c';
function mat(){
 const tabs=[['c',t('k1')],['a',t('k2')],['s',t('k3')]];
 let h=`<h2 style="margin-top:4px">${N[L()][1]}</h2><div class="tabs">${tabs.map(t=>`<button class="pill ${t[0]===mt?'sel':''}" data-t="${t[0]}">${t[1]}</button>`).join('')}</div>`;
 if(mt==='c'){h+=`<div class="glass" style="padding:14px"><div class="mut">Нажми — услышишь</div><div class="grid" style="margin-top:8px">${CO.flatMap(c=>PR.map(p=>`<button class="pill sp1" data-s="${cf(p,c)}">${cf(p,c)}</button>`)).join('')}</div></div><h2>Вопросы</h2><div class="grid">${QS.map(q=>`<button class="pill sp1" data-s="${q}...?">${q}...?</button>`).join('')}</div>`}
 if(mt==='a'){h+=`<div class="kb">${ALPHA.map(x=>{const p=x.split(' ');return`<button class="pill sp1" style="padding:10px 0" data-s="${p[0]}. ${p[2]}">${p[0]}</button>`}).join('')}</div><h2>Звуки</h2><div class="grid">${DIG.map(d=>`<button class="pill sp1" data-s="${d[0]}. ${d[2]}">${d[0]} ${d[1]} ${d[2]}</button>`).join('')}</div>`}
 if(mt==='s'){h+=`<p class="mut">27 шпаргалок — нажми на название, чтобы открыть</p>`+CH2.map((c,i)=>`<details class="glass" style="padding:14px;margin-bottom:12px"><summary style="font-weight:800">${i+1}. ${c.t}</summary><table>${c.r.map(r=>`<tr><td>${r[0]}</td><td class="sp1 en" data-s="${r[1].replace(/[^\w' ]/g,'')}"><b>${r[1]}</b> 🔊</td></tr>`).join('')}</table><p class="mut">${c.q[0]}</p><div class="row">${c.q[1].map((o,j)=>`<button class="pill chk" data-ok="${j===c.q[2]?1:0}">${o}</button>`).join('')}</div></details>`).join('')}
 $('#app').innerHTML=h;
 $$('[data-t]').forEach(b=>b.onclick=()=>{mt=b.dataset.t;mat()});
 $$('.sp1').forEach(b=>b.onclick=()=>say(b.dataset.s));
 $$('.chk').forEach(b=>b.onclick=()=>{const ok=b.dataset.ok==='1';b.style.background=ok?'#2fbf8e':'#d94a4a';if(ok)confetti()})}
/* профиль */
function prof(){
 const ac=[['👩 Эмма','en-US'],['👨 Лиам','en-GB'],['👩 Хлоя','en-CA'],['👨 Ноа','en-AU']];
 $('#app').innerHTML=`<h2 style="margin-top:4px">${N[L()][2]}</h2>
 <div class="glass" style="padding:16px"><h3>${t('pv')}</h3><div class="g2">${ac.map(a=>`<button class="pill ac ${a[1]===S.acc?'sel':''}" data-a="${a[1]}">${a[0]}</button>`).join('')}</div>
 <label>${t('sp')} <b id="v1">${S.rate}x</b><input type="range" id="r1" min=".6" max="1.4" step=".1" value="${S.rate}"></label>
 <label>${t('pt')} <b id="v2">${S.pitch}</b><input type="range" id="r2" min=".7" max="1.3" step=".1" value="${S.pitch}"></label>
 <label>${t('vl')} <b id="v3">${Math.round(S.vol*100)}%</b><input type="range" id="r3" min="0" max="1" step=".05" value="${S.vol}"></label>
 <div class="row" style="margin-top:10px"><button class="btn g" id="tv">${t('chk')}</button><button class="btn g" id="pm">${t('pm')}</button></div></div>
 <div class="glass" style="padding:16px;margin-top:12px"><h3>${t('dt')}</h3><div class="g2">${[['🍃 '+t('d1'),'low'],['📊 '+t('d2'),'mid'],['🔥 '+t('d3'),'high'],['✨ '+t('d4'),'auto']].map(d=>`<button class="pill df ${d[1]===S.diff?'sel':''}" data-d="${d[1]}">${d[0]}</button>`).join('')}</div><div class="tabs">${[12,14,16,18,20,0].map(t=>`<button class="pill tm ${t===S.timer?'sel':''}" data-t="${t}">${t||'∞'}</button>`).join('')}</div></div>
 <div class="glass row sp" style="padding:16px;margin-top:12px"><b>🎧 ${t('lf')}</b><button class="pill ${S.lofi?'sel':''}" id="lf">${S.lofi?t('von'):t('voff')}</button></div>
 <h2>${t('mh')}</h2><div class="row" style="gap:6px"><button class="btn g" id="cl" aria-label="Назад" style="padding:12px 14px">‹</button><div class="sl mc" id="mc" style="flex:1;min-width:0">${METH.map((m,i)=>`<div><button class="glass mcard" data-m="${i}"><div style="font-size:44px">${m[0]}</div><b>${mth(i,0)}</b></button></div>`).join('')}</div><button class="btn g" id="cr" aria-label="Вперёд" style="padding:12px 14px">›</button></div>`;
 $$('.ac').forEach(b=>b.onclick=()=>{S.acc=b.dataset.a;save();say('Hello! Nice to meet you');prof()});
 [['r1','rate','v1','x'],['r2','pitch','v2',''],['r3','vol','v3','%']].forEach(([i,k,v,u])=>$('#'+i).oninput=e=>{S[k]=+e.target.value;$('#'+v).textContent=u==='%'?Math.round(S[k]*100)+'%':S[k]+u;save()});
 $('#tv').onclick=()=>say('Wow, oh my God! Let\'s hit the road!');
 $('#pm').onclick=()=>{fxModal(`<h2>${t('pm')}</h2><p style="text-align:left">iPhone: Настройки → Универсальный доступ → Устный контент → Голоса → English → скачай Premium/Enhanced голос (Siri).<br><br>Android: Настройки → Язык → Синтез речи → Google → Установить голосовые данные.</p><button class="btn big" id="pk">${t('ok')}</button>`);$('#pk').onclick=()=>$('#md').classList.remove('on')};
 $$('.df').forEach(b=>b.onclick=()=>{S.diff=b.dataset.d;save();prof()});
 $$('.tm').forEach(b=>b.onclick=()=>{S.timer=+b.dataset.t;save();prof()});
 $('#lf').onclick=()=>{S.lofi=!S.lofi;lofi(S.lofi);save();prof()};
 $$('.mcard').forEach(b=>b.onclick=()=>meth(+b.dataset.m));
 $('#cl').onclick=()=>$('#mc').scrollBy({left:-$('#mc').clientWidth,behavior:'smooth'});$('#cr').onclick=()=>$('#mc').scrollBy({left:$('#mc').clientWidth,behavior:'smooth'})}
/* ---------- спринт ---------- */
let cur=-1,pos=0,built=[],tmr,tleft,lastI=-1,sess=0,run=0,busy=false,hinted=false,srk='new';
const clean=w=>w.replace(/[.,!?]/g,'').toLowerCase();
const POOL=[...new Set(P.flatMap(p=>p[0].split(' ').map(w=>w.replace(/[.,!?]/g,''))))];
function openSprint(){speechSynthesis&&speechSynthesis.cancel();$('#sp').classList.add('on');sess=0;run=0;if(!S.seen){tour();return}nextP()}
function tour(){const T=['1/4 · Сверху — спидометр речи и таймер на фразу. Время бежит!',t('atour'),'3/4 · Лис озвучит ассоциацию вслух — листай точки • • •','4/4 · Выход сверху ✕. Задание будет повторяться, пока не выучишь.'];let i=0;$('#tour').classList.add('on');const s=()=>{$('#tn').textContent='Шаг '+(i+1);$('#tp').textContent=T[i];$('#tb2').textContent=i<3?'Дальше':'Поехали'};s();$('#tb2').onclick=()=>{if(++i<4)s();else{$('#tour').classList.remove('on');S.seen=1;save();nextP()}}}
function nextP(){
 clearInterval(tmr);busy=false;hinted=false;FoxAns.reset();
 Object.keys(S.cyc).forEach(k=>{if(S.cyc[k]>=2)delete S.cyc[k]});
 const pk=FoxSR.pick(lastI);
 if(!pk){if(Object.keys(S.learned).length>=P.length){confetti();drop('Все фразы выучены! 🎉')}else drop(t('afrz'));save();closeSprint(true);return}
 cur=pk.i;srk=pk.k;lastI=cur;pos=0;built=[];if(cur in S.cyc)S.cyc[cur]++;
 const first=Object.keys(S.learned).length+Object.keys(S.cyc).length<3;
 $('#cal').textContent=first?'🔍 Узнаём твой уровень...':(cur in S.cyc?t('rcnt').replace('%n',S.cyc[cur]):'');
 FoxAns.render();
 $('#cd').classList.remove('f');$('#cd').onclick=null;drawBack();hud();
 tleft=S.timer;timerStart()}
function flip(){$('#cd').classList.add('f');$('#cd').onclick=null}
function hud(){$('#hud').textContent=`${wph()} слов/час · ${rank(wph())}`;$('#tt').textContent=S.today+'/30'}
function timerStart(){const T=S.timer;if(!T){$('#tb').style.width='100%';tmr=setInterval(()=>{S.secs+=.1},100);return}$('#tb').style.width='100%';tmr=setInterval(()=>{tleft-=.1;S.secs+=.1;$('#tb').style.width=Math.max(0,tleft/T*100)+'%';if(tleft<=0)miss(true)},100)}
function drawBack(){
 const ws=P[cur][0].split(' '),right=clean(ws[pos]||'');
 const opts=[ws[pos]?.replace(/[.,!?]/g,'')];const d=POOL.filter(w=>clean(w)!==right).sort(()=>Math.random()-.5).slice(0,4);
 const all=[...opts,...d].sort(()=>Math.random()-.5);
 $('#bk').innerHTML=`<div class="mut">${tr(cur)}</div><h2 style="min-height:36px;margin:0">${built.join(' ')||'…'}</h2><div class="pills">${all.map(w=>`<button class="pill wd">${w}</button>`).join('')}</div>`;
 $$('.wd').forEach(b=>b.onclick=e=>{e.stopPropagation();pick(b)})}
function pick(b){if(busy)return;const ws=P[cur][0].split(' ');if(clean(b.textContent)===clean(ws[pos])){built.push(ws[pos]);pos++;if(pos>=ws.length)win();else drawBack()}else{b.style.background='#d94a4a';miss(false)}}
function win(){busy=true;clearInterval(tmr);const wc=P[cur][0].split(' ').length;S.words+=wc;S.today+=wc;S.days[today()]=1;sess++;run++;
 FoxSR.ok(cur,srk,hinted);
 say(P[cur][0]);if(S.today>=30&&S.today-wc<30){confetti();drop('Цель дня закрыта!')}
 else if(run===4)drop("Wow! Oh my God, you're flying!","Wow! Oh my God, you're flying!");
 else if(run===3)drop(`Ещё ${Math.max(1,Math.ceil((wph()+1)/200))} слов до рекорда темпа?`);
 S.deadline=0;save();hud();setTimeout(nextP,900)}
function miss(timeout){if(busy)return;busy=true;clearInterval(tmr);FoxAns.reset();FoxSR.bad(cur);run=0;
 S.tele.push({t:Date.now(),i:cur,type:timeout?'timeout':'wrong'});S.tele=S.tele.slice(-200);save();
 $('#bk').innerHTML=`<div class="mut">${t('rt')}</div><h2>${P[cur][0]}</h2><div class="note">${t('r4')}</div>`;$('#cd').classList.add('f');say(P[cur][0]);setTimeout(nextP,1800)}
function closeSprint(done){clearInterval(tmr);FoxAns.reset();$('#sp').classList.remove('on');$('#sh').classList.remove('on');
 if(!done&&sess>0){S.deadline=Date.now()+48*36e5;S.tele.push({t:Date.now(),type:'exit'});save();setTimeout(()=>drop('У тебя есть 2 дня, чтобы продолжить, иначе начнём заново! А давай закрепим новые слова?'),300)}
 save();render()}
$('#spx').onclick=()=>closeSprint(false);
$('#vb').onclick=()=>{if(cur<0)return;if(!S.voiceAsked){fxModal(`<div style="font-size:40px">🗣️</div><div class="g2">${[['👩 Эмма','en-US'],['👨 Лиам','en-GB'],['👩 Хлоя','en-CA'],['👨 Ноа','en-AU']].map(a=>`<button class="pill vc" data-a="${a[1]}">${a[0]}</button>`).join('')}</div>`);$$('.vc').forEach(b=>b.onclick=()=>{S.voiceAsked=1;S.acc=b.dataset.a;save();$('#md').classList.remove('on');say(P[cur][0])});return}say(P[cur][0])};

$('#hb').onclick=()=>{if(cur<0||busy)return;hinted=true;if(!(cur in S.cyc))S.cyc[cur]=0;run=0;save();const a=AS[cur]||[`Представь сцену: «${tr(cur)}»`,`Скажи по-английски: <b>${P[cur][0]}</b>`];
 const sl=[`${av(64)}<div style="font-size:64px">${EM[cur]}</div><div class="note" style="font-size:26px">${a[0]}</div>`,`<div style="font-size:64px">🧩</div><p style="font-size:20px">${a[1]}</p>`,`<p class="mut">${tr(cur)}</p><h2>${P[cur][0]}</h2><button class="btn" id="sv" style="font-size:28px">🗣️</button><div class="note">💡 Нажми, чтобы услышать</div>`];
 $('#sl').innerHTML=sl.map(x=>`<div>${x}</div>`).join('');$('#dt').innerHTML=sl.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('');$('#sl').scrollLeft=0;$('#sh').classList.add('on');
 $('#sv').onclick=()=>say(P[cur][0]);say(a[0].replace(/<[^>]+>/g,''),'ru-RU')};
$('#sl').onscroll=e=>{const i=Math.round(e.target.scrollLeft/e.target.clientWidth);$$('#dt i').forEach((d,j)=>d.classList.toggle('on',j===i))};
$('#shx').onclick=()=>$('#sh').classList.remove('on');

Object.assign(D,{
n1:'Кино-дублёр|Кино-дублёр|Kino-dublyor|Кино-дублёр|Кино-дублёр|Кино-дублёр|Film Dublörü|Kino-dublýor',
n2:'Ритм-караоке|Ритм-караоке|Ritm-karaoke|Ритм-караоке|Ритм-караоке|Ритм-караоке|Ritim Karaoke|Ritm-karaoke',
n3:'Shadowing (Эхо)|Shadowing (Яңгыраш)|Shadowing (Aks-sado)|Shadowing (Акси садо)|Shadowing (Жаңғырық)|Shadowing (Жаңырык)|Shadowing (Yankı)|Shadowing (Ses)',
n4:'Лисий След|Төлке эзе|Tulki izi|Пайраҳаи Рӯбоҳ|Түлкі ізі|Түлкү изи|Tilki İzi|Tilki yzy',
vk:'Словарь|Сүзлек|Lug‘at|Луғат|Сөздік|Сөздүк|Sözlük|Sözlük',
v1:'Учим|Өйрәнәбез|O‘rganamiz|Меомӯзем|Үйренеміз|Үйрөнөбүз|Öğreniyoruz|Öwrenýäris',
v2:'Выучено|Өйрәнелде|O‘rganildi|Омӯхта шуд|Үйренілді|Үйрөнүлдү|Öğrenildi|Öwrenildi',
v3:'Моя база|Минем база|Mening bazam|Пойгоҳи ман|Менің базам|Менин базам|Benim Kayıtlarım|Meniň bazam',
va:'+ Добавить слова|+ Сүз өстәргә|+ So‘z qo‘shish|+ Илова кардани калима|+ Сөз қосу|+ Сөз кошуу|+ Kelime ekle|+ Söz goş',
a1:'⚡ Усилить повтор|⚡ Кабатлауны көчәйтү|⚡ Takrorni kuchaytirish|⚡ Такрорро қавӣ кардан|⚡ Қайталауды күшейту|⚡ Кайталоону күчөтүү|⚡ Tekrarı güçlendir|⚡ Gaýtalamagy güýçlendir',
a2:'🎓 Перенести в «Выучено»|🎓 «Өйрәнелде»гә күчерү|🎓 «O‘rganildi»ga o‘tkazish|🎓 Ба «Омӯхта шуд» гузарондан|🎓 «Үйренілді» бөліміне көшіру|🎓 «Үйрөнүлдү» бөлүмүнө өткөрүү|🎓 «Öğrenildi»ye taşı|🎓 «Öwrenildi» geçir',
a3:'🔖 Перенести в «Мою базу»|🔖 «Минем база»га күчерү|🔖 «Mening bazam»ga o‘tkazish|🔖 Ба «Пойгоҳи ман» гузарондан|🔖 «Менің базама» көшіру|🔖 «Менин базама» өткөрүү|🔖 «Benim Kayıtlarım»a taşı|🔖 «Meniň bazama» geçir',
a4:'🗑️ Удалить|🗑️ Бетерү|🗑️ O‘chirish|🗑️ Нест кардан|🗑️ Жою|🗑️ Өчүрүү|🗑️ Sil|🗑️ Poz',
r1:'Лисёнок|Төлке баласы|Tulkicha|Рӯбоҳбача|Түлкіш|Түлкү баласы|Tilki Yavrusu|Tilki çagasy',
r2:'Рыжий хвост|Кызыл койрык|Qizil dum|Думи сурх|Қызыл құйрық|Кызыл куйрук|Kızıl Kuyruk|Gyzyl guýruk',
r3:'Хитрый лис|Хәйләкәр төлке|Ayyor tulki|Рӯбоҳи маккор|Айлакер түлкі|Куу түлкү|Kurnaz Tilki|Mekir tilki',
r4:'Альфа-Лис|Альфа-төлке|Alfa-tulki|Рӯбоҳи алфа|Альфа-түлкі|Альфа-түлкү|Alfa Tilki|Alfa tilki'});
const MT=['Комфортный темп|Уңайлы тизлек|Qulay tempo|Суръати қулай|Ыңғайлы қарқын|Ыңгайлуу ылдамдык|Rahat tempo|Amatly tizlik','Скорость речи|Сөйләм тизлеге|Nutq tezligi|Суръати нутқ|Сөйлеу жылдамдығы|Сүйлөө ылдамдыгы|Konuşma hızı|Gürlemek tizligi','Живая база|Тере база|Jonli baza|Пойгоҳи зинда|Тірі база|Тирүү база|Canlı baza|Janly baza','Ассоциации|Ассоциацияләр|Assotsiatsiyalar|Ассотсиатсияҳо|Ассоциациялар|Ассоциациялар|Çağrışımlar|Assosiasiýalar','Максимум 2 повтора|2 кабатлау чиге|Ko‘pi bilan 2 takror|Ҳадди аксар 2 такрор|Көбі 2 қайталау|Эң көп 2 кайталоо|En fazla 2 tekrar|Iň köp 2 gaýtalama','Мощная практика|Көчле практика|Kuchli amaliyot|Амалияи пурқувват|Қуатты практика|Күчтүү практика|Güçlü pratik|Güýçli tejribe'];
const ME=['Выбирай таймер сам: начни спокойно, ускоряйся, когда рука тянется к слову.|Таймерны үзең сайла: акрын башла, тизләнә бар.|Taymerni o‘zing tanla: sekin boshla, keyin tezlash.|Таймерро худат интихоб кун: оҳиста оғоз кун, баъд тез шав.|Таймерді өзің таңда: баяу баста, кейін жеделде.|Таймерди өзүң танда: жай башта, андан соң ылдамда.|Zamanlayıcıyı sen seç: yavaş başla, sonra hızlan.|Taýmeri özüň saýla: ýuwaş başla, soň çalt ýör.','Спидометр считает слова в час: цель — говорить без пауз на перевод.|Спидометр сәгатенә сүзләрне саный: максат — тәрҗемә өчен тукталмау.|Spidometr soatiga so‘zlarni sanaydi: maqsad — tarjima uchun to‘xtamaslik.|Спидометр калимаҳоро дар як соат мешуморад: ҳадаф — бе таваққуф ба тарҷума гап задан.|Спидометр сағатына сөзді санайды: мақсат — аудару үшін тоқтамау.|Спидометр саатына сөздөрдү эсептейт: максат — которуу үчүн токтобой сүйлөө.|Hız göstergesi saatteki kelimeleri sayar: amaç çeviri için durmadan konuşmak.|Spidometr sagatda sözleri sanaýar: maksat — terjime üçin durman gürlemek.','Только живые фразы из разговора — готовые кирпичики, которые ты переставляешь под себя.|Сөйләшү фразалары гына — үзеңә җайлаштырырлык әзер кирпечләр.|Faqat jonli suhbat iboralari — o‘zingga moslashtiriladigan tayyor g‘ishtlar.|Танҳо ибораҳои зинда — хиштҳои тайёр, ки онҳоро ба худ мутобиқ мекунӣ.|Тек тірі сөйлеу фразалары — өзіңе бейімдейтін дайын кірпіштер.|Жандуу сүйлөшүү фразалары — өзүңө ылайыктай турган даяр кирпичтер.|Sadece gerçek konuşma kalıpları: kendine uyarlayacağın hazır tuğlalar.|Diňe janly gürrüň sözlemleri — özüňe uýgunlaşdyrjak taýýar kerpiçler.','Лис находит созвучие и рисует сцену — смешная картинка запоминается с первого раза.|Төлке охшаш яңгырашны таба һәм сәхнә сыза — көлке рәсем бер тапкырда истә кала.|Tulki jaranglashuvni topib, sahna chizadi — kulgili rasm bir martada yodda qoladi.|Рӯбоҳ ҳамоҳангиро меёбад ва саҳна мекашад — тасвири хандовар якбора ҳифз мешавад.|Түлкі үндестікті тауып, көрініс салады — күлкілі сурет бірден жаттылады.|Түлкү үндөштүктү таап, көрүнүш тартат — күлкүлүү сүрөт бир жолуда эсте калат.|Tilki benzer sesi bulur ve sahne çizer: komik resim ilk seferde akılda kalır.|Tilki sesdeşligi tapýar we sahna çekýär — gülkünç surat ilkinji gezekde ýadda galýar.','Ошибся или взял подсказку — фраза вернётся сразу, но не больше 2 раз подряд; дальше она придёт позже.|Хата ясадың яки ярдәм алдың — фраза тиз кире кайта, ләкин рәттән 2 тапкырдан артык түгел; аннан соң соңрак киләчәк.|Xato qilsang yoki maslahat olsang — ibora darrov qaytadi, lekin ketma-ket 2 martadan ko‘p emas; keyin u keyinroq keladi.|Хато кунӣ ё маслиҳат гирӣ — ибора фавран бармегардад, вале на беш аз 2 бор пай дар пай; баъд он дертар меояд.|Қателессең немесе кеңес алсаң — фраза бірден қайтады, бірақ қатарынан 2 реттен көп емес; кейін ол кейінірек келеді.|Ката кетирсең же кеңеш алсаң — фраза дароо кайтат, бирок удаа 2 жолудан көп эмес; андан кийин кийинчерээк келет.|Hata yaparsan ya da ipucu alırsan cümle hemen geri gelir, ama art arda en fazla 2 kez; sonra daha geç gelir.|Ýalňyşsaň ýa-da maslahat alsaň — sözlem derrew gaýdyp gelýär, emma yzly-yzyna 2 gezekden köp däl; soň ol has soň gelýär.','Собери фразу по словам, услышь голос диктора и повтори вслух: глаз, ухо и рот работают вместе.|Фразаны сүзләрдән җый, диктор тавышын ишет һәм кычкырып кабатла: күз, колак, авыз бергә эшли.|Iborani so‘zlardan yig‘, diktor ovozini eshit va baland takrorla: ko‘z, quloq va og‘iz birga ishlaydi.|Иборарро аз калимаҳо ҷамъ кун, овози гӯяндаро шунав ва баланд такрор кун: чашм, гӯш ва даҳон якҷоя кор мекунанд.|Фразаны сөздерден құра, диктор дауысын тыңда да, дауыстап қайтала: көз, құлақ, ауыз бірге жұмыс істейді.|Фразаны сөздөрдөн түз, диктордун үнүн уккула да, катуу кайтала: көз, кулак, оозу бирге иштейт.|Cümleyi kelimelerden kur, spikerin sesini dinle ve yüksek sesle tekrarla: göz, kulak ve ağız birlikte çalışır.|Sözlemi sözlerden düz, diktoryň sesini diňle we ýokary ses bilen gaýtala: göz, gulak we agyz bilelikde işleýär.'];
const mth=(i,k)=>{const v=(k?ME[i]:MT[i]).split('|');return v[LK.indexOf(S.lang)]||v[0]};
/* словарь */
const SEED=['fox|лис|төлке|tulki|рӯбоҳ|түлкі|түлкү|tilki|tilki','smile|улыбка|елмаю|tabassum|табассум|күлкі|жылмаюу|gülümseme|ýylgyryş','water|вода|су|suv|об|су|суу|su|suw','road|дорога|юл|yo‘l|роҳ|жол|жол|yol|ýol','friend|друг|дус|do‘st|дӯст|дос|дос|arkadaş|dost','sleep|сон|йокы|uyqu|хоб|ұйқы|уйку|uyku|uky'];
function vinit(){if(!S.vocab){S.vocab=SEED.map(x=>{const p=x.split('|');return{en:p[0],tr:p.slice(1).join('|'),st:'learn',b:0}});save()}}
const nat=e=>e.tr?(e.tr.split('|')[LK.indexOf(S.lang)]||e.tr.split('|')[0]):e.n;
let vt='learn',vdir=0;
function voc(){const l=S.vocab.filter(e=>e.st===vt).sort((a,b)=>(b.b||0)-(a.b||0)),U=S.lang.toUpperCase();
 $('#app').innerHTML=`<h2 style="margin-top:4px">📖 ${t('vk')}</h2><div class="tabs">${[['learn','v1'],['done','v2'],['base','v3']].map(x=>`<button class="pill vt ${x[0]===vt?'sel':''}" data-s="${x[0]}">${t(x[1])} · ${S.vocab.filter(e=>e.st===x[0]).length}</button>`).join('')}</div>
 <button class="btn g" id="vad" style="width:100%;margin-bottom:10px">${t('va')}</button>
 <div id="vf" class="row" style="display:none;margin-bottom:10px"><input id="vi1" placeholder="EN" autocapitalize="none"><input id="vi2" placeholder="${U}"><button class="btn" id="vok" style="padding:12px 16px">✔</button></div>
 ${l.map(e=>{const n=nat(e);return`<div class="glass row sp" style="padding:12px 14px;margin-bottom:8px"><div class="vw" data-w="${e.en}" style="flex:1;min-width:0"><b style="font-size:19px">${vdir?n:e.en}</b>${e.b?' ⚡'+e.b:''}<div class="mut">${vdir?e.en:n}</div></div><button class="btn g vm" data-w="${e.en}" aria-label="menu" style="padding:8px 16px;font-size:20px">⋮</button></div>`}).join('')}
 <div style="height:76px"></div><button class="btn g" id="vdir" style="position:fixed;left:0;right:0;margin:0 auto;width:max-content;bottom:calc(76px + env(safe-area-inset-bottom));z-index:6;background:#3a2260">${vdir?U+' → EN':'EN → '+U} ⇄</button>`;
 $$('.vt').forEach(b=>b.onclick=()=>{vt=b.dataset.s;voc()});$('#vad').onclick=()=>{const f=$('#vf');f.style.display=f.style.display==='none'?'flex':'none'};
 $('#vok').onclick=()=>{const en=$('#vi1').value.trim(),n=$('#vi2').value.trim();if(en&&n){S.vocab.push({en,n,st:'learn',b:0});save();voc()}};
 $('#vdir').onclick=()=>{vdir^=1;voc()};$$('.vw').forEach(b=>b.onclick=()=>say(b.dataset.w));$$('.vm').forEach(b=>b.onclick=()=>vsheet(b.dataset.w))}
function vsheet(w){const e=S.vocab.find(x=>x.en===w);if(!e)return;
 $('#vsh').innerHTML=`<div style="padding:6px 0 18px"><div style="font-size:42px;font-weight:800;color:var(--or);text-shadow:0 0 26px #ff7a29">${e.en}</div><div class="note" style="font-size:28px">${nat(e)}</div></div>${['a1','a2','a3','a4'].map(k=>`<button class="btn g va" data-k="${k}" style="width:100%;margin-bottom:10px;text-align:left">${t(k)}</button>`).join('')}`;
 $('#vm').classList.add('on');$$('.va').forEach(b=>b.onclick=()=>{const k=b.dataset.k;if(k==='a1'){e.b=(e.b||0)+1;e.st='learn'}if(k==='a2')e.st='done';if(k==='a3')e.st='base';if(k==='a4')S.vocab=S.vocab.filter(x=>x!==e);save();$('#vm').classList.remove('on');voc()})}
$('#vm').onclick=e=>{if(e.target.id==='vm')$('#vm').classList.remove('on')};
/* ---------- старт ---------- */
(async()=>{FoxGames.init();await DB.open();const s=await DB.get('S');if(s)Object.assign(S,s);else{const n=(navigator.language||'ru').slice(0,2);S.lang=LN[n]?n:'ru'}FoxSR.init();
 vinit();if(S.day!==today()){S.day=today();S.today=0}
 if(S.deadline&&S.deadline<Date.now()){S.learned={};S.cyc={};S.deadline=0}
 save();render();
  if(S.lofi)document.body.addEventListener('click',function f(){lofi(true);document.body.removeEventListener('click',f)});
 setTimeout(()=>{const g={ru:'Привет! Я Лис. Давай учить английский!',tr:'Merhaba! Ben Tilki.',uz:'Salom! Men Tulkiman.'}[S.lang]||'Привет!';drop(g)},600)})();
window.FoxApp={render,save,say,t,get S(){return S}};
