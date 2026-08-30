const HOT=["Counter-UAS"], COOL=["Manufacturing","Logistics","Training-Sim"];
const catClass=c=>HOT.includes(c)?"hot":COOL.includes(c)?"cool":"n";
const uniq=a=>[...new Set(a)];
const tally=(arr,f)=>Object.entries(arr.reduce((a,d)=>{const k=f(d);a[k]=(a[k]||0)+1;return a},{})).sort((a,b)=>b[1]-a[1]);

/* stats */
document.getElementById("stats").innerHTML=[
 {k:COMPANIES.length,l:"Companies"},
 {k:COMPANIES.filter(d=>d.stage.startsWith("Series")).length,l:"Series A / B"},
 {k:COMPANIES.filter(d=>d.stage==="Seed"||d.stage==="Pre-Seed").length,l:"Seed / Pre-seed"},
 {k:uniq(COMPANIES.map(d=>d.country)).length,l:"Countries"},
 {k:COMPANIES.filter(d=>d.cat==="Counter-UAS").length,l:"Counter-UAS"},
 {k:COMPANIES.filter(d=>d.ver==="y").length,l:"Age verified"}
].map(s=>`<div class="stat"><div class="k">${s.k}</div><div class="l">${s.l}</div></div>`).join("");

/* bars */
function bars(el,pairs,cls){
  const max=Math.max(...pairs.map(p=>p[1]));
  el.innerHTML=pairs.map(([n,v])=>{
    const c=typeof cls==="function"?cls(n):"";
    return `<div class="bar-row"><span class="nm">${n}</span>
    <span class="bar-track"><span class="bar-fill ${c}" style="width:${v/max*100}%"></span></span>
    <span class="n">${v}</span></div>`}).join("");
}
bars(document.getElementById("catbars"),tally(COMPANIES,d=>d.cat),n=>catClass(n));
const se=document.getElementById("stagebars");se.innerHTML="";
const a=document.createElement("div");bars(a,tally(COMPANIES,d=>d.stage));
const div=document.createElement("div");div.style.cssText="height:1px;background:var(--line-2);margin:12px 0";
const b=document.createElement("div");bars(b,tally(COMPANIES,d=>d.country));
se.append(a,div,b);

/* filters — multi-select within a group, AND across groups */
const active={stage:new Set(),geo:new Set(),cat:new Set(),tag:new Set()};
const GROUPS={
  stage:["Series B","Series A","Seed","Pre-Seed","Growth"],
  geo:["US","Europe","Ukraine","Other"],
  cat:tally(COMPANIES,d=>d.cat).map(p=>p[0]),
  tag:tally(COMPANIES.flatMap(d=>d.tags),t=>t).map(p=>p[0])
};
Object.entries(GROUPS).forEach(([g,vals])=>{
  const box=document.getElementById("f-"+g);
  vals.forEach(v=>{
    const btn=document.createElement("button");
    btn.type="button";btn.className="chip";btn.textContent=v;
    btn.setAttribute("aria-pressed","false");
    btn.onclick=()=>{
      active[g].has(v)?active[g].delete(v):active[g].add(v);
      btn.setAttribute("aria-pressed",String(active[g].has(v)));
      render();
    };
    box.appendChild(btn);
  });
});
document.getElementById("reset").onclick=()=>{
  Object.values(active).forEach(s=>s.clear());
  document.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed","false"));
  document.getElementById("q").value="";
  render();
};

function pass(d){
  if(active.stage.size&&!active.stage.has(d.stage))return false;
  if(active.geo.size&&!active.geo.has(d.geo))return false;
  if(active.cat.size&&!active.cat.has(d.cat))return false;
  if(active.tag.size&&!d.tags.some(t=>active.tag.has(t)))return false;
  const q=document.getElementById("q").value.trim().toLowerCase();
  if(q&&!(d.name+" "+d.lead+" "+d.desc+" "+d.cat+" "+d.city+" "+d.tags.join(" ")).toLowerCase().includes(q))return false;
  return true;
}

let sortK="id",sortDir=1;
document.querySelectorAll("thead th.s").forEach(th=>th.onclick=()=>{
  const k=th.dataset.k;
  if(sortK===k)sortDir*=-1;else{sortK=k;sortDir=(k==="amount"||k==="val")?-1:1}
  render();
});

function render(){
  const rows=COMPANIES.filter(pass).sort((x,y)=>{
    let p=x[sortK],q=y[sortK];
    if(p===null)return 1; if(q===null)return -1;
    if(typeof p==="number")return (p-q)*sortDir;
    return String(p).localeCompare(String(q))*sortDir;
  });
  document.getElementById("count").textContent=`${rows.length} of ${COMPANIES.length}`;
  document.querySelectorAll("thead th.s").forEach(th=>{
    const base=th.textContent.replace(/ [▲▼]$/,"");
    th.textContent=th.dataset.k===sortK?base+(sortDir>0?" ▲":" ▼"):base;
  });
  document.getElementById("empty").hidden=rows.length>0;
  document.getElementById("tb").innerHTML=rows.map(d=>{
    const icon=d.linkType==="site"?"↗":d.linkType==="yc"?"YC":"src";
    const tg=d.tags.length?`<div class="rowtags">${d.tags.map(t=>`<span class="tag n mini">${t}</span>`).join("")}</div>`:"";
    return `<tr>
    <td class="idx">${String(d.id).padStart(2,"0")}</td>
    <td><a class="co" href="${d.link}" target="_blank" rel="noopener noreferrer">${d.name}<span class="ext">${icon}</span></a>
        <div class="desc">${d.desc}</div>${tg}</td>
    <td><span class="geo">${d.country}</span>${d.city?`<span class="city">${d.city}</span>`:""}</td>
    <td><span class="ver ${d.ver}">${d.founded}${d.ver==="y"?" ✓":""}</span></td>
    <td><span class="tag ${d.stage.startsWith("Series")?"b":"n"}">${d.stage}</span></td>
    <td class="amt">${d.amount!==null?`<span class="cur">${d.cur}</span>${d.amount}M`:'<span class="dash">n/d</span>'}</td>
    <td class="amt">${d.val?`<span class="cur">$</span>${(d.val/1000).toFixed(1)}B`:'<span class="dash">—</span>'}</td>
    <td class="lead">${d.lead}</td>
    <td><span class="tag ${catClass(d.cat)}">${d.cat}</span></td></tr>`}).join("");
}
document.getElementById("q").addEventListener("input",render);
render();
