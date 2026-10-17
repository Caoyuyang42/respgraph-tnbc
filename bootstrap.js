/* Load the core first; larger experiments and model attention heads are on demand. */
(()=>{'use strict';const base=new URL('.',document.currentScript.src),manifest=window.RESPGRAPH_ASSETS,pending=new Map(),done=new Set();
function load(key){if(done.has(key))return Promise.resolve();if(pending.has(key))return pending.get(key);const asset=manifest[key];if(!asset)return Promise.reject(Error('未知资源'));const promise=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL(asset.file+'?v='+asset.version,base);script.onload=()=>{done.add(key);pending.delete(key);resolve();};script.onerror=()=>{pending.delete(key);script.remove();reject(Error('网络连接较慢，请重试'));};document.head.append(script);});pending.set(key,promise);return promise;}
const groups={};
function ready(page){return (groups[page]||[]).every(key=>done.has(key));}
function ensure(page){return Promise.all((groups[page]||[]).map(load));}
function loading(host,title,failed=false,retry){host.innerHTML=`<section class="load-state" role="status" aria-live="polite"><span class="eyebrow">RESPGRAPH · 影见疗效</span><h1>${title}</h1><p>${failed?'资源暂未载入，点击重试继续浏览。':'正在载入患者数据与交互图表…'}</p>${failed?'<button class="primary" id="load-retry">重新载入</button>':'<div class="load-track"></div><div class="load-grid"><i></i><i></i><i></i></div>'}</section>`;if(failed)host.querySelector('button').onclick=retry;}
window.RespAssets={load,ready,ensure,loading};
async function start(){if(manifest.runtime.file==='dashboard-runtime.js'&&!document.body.classList.contains('dashboard')){const fresh=new URL(location.href);fresh.searchParams.set('v','20261017');location.replace(fresh);return;}const host=document.getElementById('content');try{await load('core');await load('runtime');}catch(error){loading(host,'连接研究图谱',true,start);}}
start();})();
