/* Original decorative geometry. It is never used as a medical image or data chart. */
(()=>{'use strict';
const info={
 background:['01','疾病与治疗','从治疗检查中寻找疗效线索','MRI / TREATMENT'],
 story:['02','研究总览','检查指标、患者关系与预测验证','RESEARCH / OVERVIEW'],
 graph:['03','响应图谱','38位患者的检查变化与相似关系','PATIENT / NETWORK'],
 patient:['04','患者探索','检查变化、相似病例与预测依据','PATIENT / EVIDENCE'],
 evidence:['05','证据实验室','比较连线方式，检验预测表现','MODEL / VALIDATION'],
 sandbox:['06','新病例沙盒','增减队列成员，观察预测变化','COHORT / SIMULATION'],
 boundary:['07','研究方法','数据来源、计算步骤与实验记录','DATA / METHODS']};
const line=(d,c='currentColor',w=1)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"/>`;
const circle=(x,y,r,cls='')=>`<circle cx="${x}" cy="${y}" r="${r}" class="${cls}"/>`;
function motif(page){let out='';
 if(page==='background'){
  for(let j=0;j<3;j++){const x=230+j*270,y=330-j*40;out+=`<g transform="translate(${x} ${y}) rotate(-14)">`;for(let i=0;i<8;i++){const r=110-i*10;out+=`<ellipse cx="0" cy="0" rx="${r}" ry="${r*.72}" fill="none" stroke="currentColor" stroke-opacity="${.3+i*.055}"/>`;}out+=line('M-125 0H125 M0 -100V100')+'</g>';if(j<2)out+=line(`M${x+110} ${y}L${x+245} ${y-35}`);}out+=line('M110 565H950 M230 550V580 M500 550V580 M770 550V580');
 }else if(page==='story'||page==='boundary'){
  for(let j=0;j<4;j++){const x=120+j*225;out+=`<rect x="${x}" y="${270-j%2*55}" width="125" height="170" rx="15" fill="none" stroke="currentColor"/>`;for(let i=0;i<4;i++)out+=line(`M${x+20} ${300-j%2*55+i*30}h${50+i*12}`);if(j<3)out+=line(`M${x+125} 350C${x+170} 350 ${x+170} 295 ${x+225} 295`);}out+=line('M140 530H890 M180 510V550 M440 510V550 M700 510V550');
 }else if(page==='graph'||page==='sandbox'){
  out+='<g transform="translate(550 350) rotate(-20)">';for(let i=0;i<3;i++)out+=`<ellipse rx="${200+i*70}" ry="${70+i*48}" fill="none" stroke="currentColor" stroke-dasharray="${i===1?'3 14':'500 45'}"/>`;out+='</g>';const pts=Array.from({length:16},(_,i)=>[550+Math.cos(i*2.4)* (130+i*14),350+Math.sin(i*2.4)*(70+i*7)]);pts.forEach(([x,y],i)=>{if(i<15)out+=line(`M${x} ${y}L${pts[i+1][0]} ${pts[i+1][1]}`);out+=circle(x,y,i%4===0?6:3);});if(page==='sandbox')out+=line('M100 350H260 M180 270V430 M60 300V400 M65 300H85 M65 400H85', 'currentColor',3);
 }else if(page==='patient'){
  for(let j=0;j<4;j++){const y=210+j*85;out+=line(`M140 ${y}H940`);out+=line(`M180 ${y}C280 ${y} 300 ${y+25} 480 ${y+20-j*8}S710 ${y-25+j*10} 860 ${y-35+j*14}`,'currentColor',2);[180,480,860].forEach(x=>out+=circle(x,y,3));}out+=line('M180 140V580 M480 140V580 M860 140V580');
 }else{
  for(let x=200;x<=900;x+=100)out+=line(`M${x} 150V550`);for(let y=150;y<=550;y+=80)out+=line(`M200 ${y}H900`);out+=line('M200 550V150 M200 550H900','currentColor',2)+line('M200 550L900 150');out+=line('M200 550L270 440L350 440L350 330L480 330L480 250L660 250L660 150H900','currentColor',3);
 }
 return `<svg viewBox="0 0 1100 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${out}</svg>`;
}
const notes={roc:'横轴为假阳性率，纵轴为真阳性率；AUC概括两类结果的区分能力。',calibration:'每个点代表一组患者；点越接近对角线，预测均值越接近实际pCR比例。'};
function enhance(S){const item=info[S.page];if(!item)return;let scene=document.getElementById('chapter-scene');if(!scene){scene=document.createElement('div');scene.id='chapter-scene';scene.setAttribute('aria-hidden','true');document.querySelector('.workspace').prepend(scene);}scene.innerHTML=motif(S.page);scene.dataset.scene=S.page;
 const root=document.getElementById('content'),intro=root.querySelector('.overview-title,.page-intro');
 if(intro){intro.classList.add('chapter-title');const band=document.createElement('div');band.className='chapter-signature';band.innerHTML=`<span class="chapter-index">${item[0]}</span><span><b>${item[1]}</b><small>${item[3]}</small></span><span class="chapter-purpose">${item[2]}</span>`;intro.before(band);const art=document.createElement('div');art.className='chapter-art';art.setAttribute('aria-hidden','true');art.innerHTML=motif(S.page);intro.append(art);}
 root.querySelectorAll('.instrument-head').forEach((head,i)=>{head.dataset.section=String(i+1).padStart(2,'0');});
 Object.entries(notes).forEach(([id,text])=>{const svg=root.querySelector('#'+id);if(svg){const p=document.createElement('p');p.className='chart-reading';p.textContent=text;svg.after(p);}});
}
window.RespScenes={enhance};})();
