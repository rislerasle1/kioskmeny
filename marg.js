// Felles innhold i margen på menysidene: åpent/stengt, klokke, dato og kioskvert.
// Siden må ha elementene #hours, #hoursNote, #clock, #date, #hostBox og #host.
const MARG_DAYS=["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"];
let margData=null;
(function(){
  const months=["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"],two=n=>String(n).padStart(2,"0");
  function update(){const n=new Date();clock.textContent=`${two(n.getHours())}:${two(n.getMinutes())}`;const d=MARG_DAYS[n.getDay()];date.textContent=`${d[0].toUpperCase()+d.slice(1)} ${n.getDate()}. ${months[n.getMonth()]}`;if(margData)showHours(margData);}
  update();setInterval(update,1000);
})();
function showHost(d){
  const sod=x=>new Date(x.getFullYear(),x.getMonth(),x.getDate()),n=sod(new Date());
  const p=d.dutyPeriods.find(x=>n>=sod(x.start)&&n<=sod(x.end));
  hostBox.style.display=p?"":"none";
  if(p)host.textContent=`Hasle-Løren ${p.team}`+(p.born?` (${p.born})`:"");
}
// Dagens kamper i Lørenhallen, hentet fra istidene i iceice. null = ukjent (henting feilet).
// Kolonne A har dagsoverskrifter som "søn. 11/10"; radene under hører til den dagen.
// Motstanderen står ofte alene i lag-kolonnen på raden under kampen.
let kampData=null;
async function loadKamper(){
  try{
    const r=await fetch(window.ISTIDER_CSV+"?t="+Date.now(),{cache:"no-store"});if(!r.ok)throw new Error("HTTP "+r.status);
    const rows=Papa.parse(await r.text(),{skipEmptyLines:true}).data,n=new Date(),today=`${n.getDate()}/${n.getMonth()+1}`;
    let day=null;const out=[];
    rows.forEach((row,i)=>{
      const m=txt(row[0]).match(/(\d{1,2})\/(\d{1,2})/);if(m)day=`${+m[1]}/${+m[2]}`;
      const lag=txt(row[3]);if(day!==today||!txt(row[1])||!/\bkamp\b/i.test(lag))return;// "treningskamp" telles ikke
      if(!/hasle|løren|^J?U\d|a-lag/i.test(lag)||/\bHL2\b|veteran/i.test(lag))return;// bare egne lag (ikke HL2/veteran), ikke andre klubber som leier is
      const nx=rows[i+1],mot=nx&&!txt(nx[1])&&txt(nx[3])?txt(nx[3]).replace(/^mot\s+/i,""):"";
      const k=txt(row[4]).match(/(\d{1,2}):?(\d{2})\s*-\s*\d{1,2}:?\d{2}\s*Kamp/i);// "16:00-18:15 Kamp" / "1600-1800 Kamp"
      out.push({slot:txt(row[1]),from:k?`${k[1].padStart(2,"0")}:${k[2]}`:txt(row[1]),to:txt(row[2]),name:lag.replace(/\s*kamp\s*$/i,""),mot});
    });
    kampData=out;
  }catch(e){console.warn("Kampdata:",e);kampData=null;}
  if(margData)showHours(margData);
}
// "Kiosken er åpen til …" / "… til kampslutt" eller "Kiosken åpner …", med fotnote om dagens kamper.
function showHours(d){
  if(!margData&&window.ISTIDER_CSV)loadKamper();
  margData=d;
  const toMin=s=>{const [h,m]=String(s).split(/[:.]/).map(Number);return h*60+(m||0)},fmt=x=>`${String(Math.floor(x/60)).padStart(2,"0")}:${String(x%60).padStart(2,"0")}`;
  const hoursOn=i=>d.openingHours.find(x=>x.day.toLowerCase()===MARG_DAYS[i]&&x.open&&x.close);
  const n=new Date(),now=n.getHours()*60+n.getMinutes(),today=hoursOn(n.getDay());
  const kamper=kampData||[],close=today?toMin(today.close):0;
  // En kamp som starter før stengetid og slutter etter, holder kiosken åpen til kampslutt.
  const forlenget=today?kamper.filter(k=>toMin(k.slot)<close&&toMin(k.to)>close):[];
  const slutt=forlenget.length?Math.max(...forlenget.map(k=>toMin(k.to))):close;
  const open=today&&now>=toMin(today.open)&&now<slutt;
  const neste=kamper.filter(k=>toMin(k.to)>now).slice(0,3);
  if(kampData===null){hoursNote.style.display=open?"":"none";hoursNote.textContent="* "+(d.settings.matchNote||"Ved kamp holdes kiosken åpen til kampslutt.");}
  else{hoursNote.style.display=neste.length?"":"none";hoursNote.innerHTML=neste.map(k=>`* Kamp kl. ${esc(k.from)}: ${esc(k.name)}${k.mot?` mot ${esc(k.mot)}`:""}`).join("<br>");}
  if(open){hours.textContent=forlenget.length?`Kiosken er åpen til kampslutt, ca. ${fmt(slutt)}`:`Kiosken er åpen til ${today.close}`;return;}
  if(today&&now<toMin(today.open)){hours.textContent=`Kiosken åpner klokken ${today.open}`;return;}
  for(let k=1;k<=7;k++){const o=hoursOn((n.getDay()+k)%7);if(o){hours.textContent=`Kiosken åpner ${k===1?"i morgen":MARG_DAYS[(n.getDay()+k)%7]} klokken ${o.open}`;return;}}
  hours.textContent="Kiosken er stengt";
}
