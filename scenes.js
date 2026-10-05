/* Chapter labels, chart reading notes and a real anonymous MRI preview. No decorative scene layer. */
(()=>{'use strict';
const info={
 background:['01','疾病与治疗','从治疗检查中寻找疗效线索','MRI / TREATMENT'],
 story:['02','研究总览','检查指标、患者关系与预测验证','RESEARCH / OVERVIEW'],
 graph:['03','响应图谱','38位患者的检查变化与相似关系','PATIENT / NETWORK'],
 patient:['04','患者探索','检查变化、相似病例与预测依据','PATIENT / EVIDENCE'],
 evidence:['05','证据实验室','比较连线方式，检验预测表现','MODEL / VALIDATION'],
 sandbox:['06','新病例沙盒','增减队列成员，观察预测变化','COHORT / SIMULATION'],
 boundary:['07','研究方法','数据来源、计算步骤与实验记录','DATA / METHODS']};
const notes={roc:'横轴为假阳性率，纵轴为真阳性率；AUC概括两类结果的区分能力。',calibration:'每个点代表一组患者；点越接近对角线，预测均值越接近实际pCR比例。'};
function enhance(S){const item=info[S.page];if(!item)return;document.getElementById('chapter-scene')?.remove();
 const root=document.getElementById('content'),intro=root.querySelector('.overview-title,.page-intro');
 if(intro){intro.classList.add('chapter-title');const band=document.createElement('div');band.className='chapter-signature';band.innerHTML=`<span class="chapter-index">${item[0]}</span><span><b>${item[1]}</b><small>${item[3]}</small></span><span class="chapter-purpose">${item[2]}</span>`;intro.before(band);}
 if(S.page==='background'){const features=root.querySelector('.clinical-features');if(features)features.insertAdjacentHTML('beforebegin','<figure class="clinical-mri-preview"><img src="imaging/clinical-preview.webp" alt="EXT-004首次访视MRI与青色分割轮廓" width="256" height="256"><figcaption>EXT-004 · 真实MRI与分割区域<small>首次访视 vis1 / 采集2</small></figcaption></figure>');}
 root.querySelectorAll('.instrument-head').forEach((head,i)=>{head.dataset.section=String(i+1).padStart(2,'0');});
 Object.entries(notes).forEach(([id,text])=>{const svg=root.querySelector('#'+id);if(svg){const p=document.createElement('p');p.className='chart-reading';p.textContent=text;svg.after(p);}});
}
window.RespScenes={enhance};})();
