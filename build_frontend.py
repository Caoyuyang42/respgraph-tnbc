"""Build the static site from readable sources. No model output is recomputed."""
import copy, hashlib, json, shutil
from pathlib import Path

APP = Path(__file__).resolve().parent
PUBLIC = APP / 'github-pages' if (APP/'github-pages').is_dir() else APP

def dump(value):
    return json.dumps(value, ensure_ascii=False, separators=(',', ':'))

def emit(name, text):
    (PUBLIC / name).write_text(text, encoding='utf-8')
    return {'file': name, 'version': hashlib.sha256(text.encode()).hexdigest()[:12], 'bytes': len(text.encode())}

def build():
    data = json.loads((PUBLIC/'data.json').read_text(encoding='utf-8'))
    explain = json.loads((PUBLIC/'explain-data.json').read_text(encoding='utf-8'))
    core = copy.deepcopy(data)
    core.pop('sandbox', None)  # Legacy single-patient examples are never used by this UI.
    presets = core.pop('cohort_presets')
    runs = [r.pop('runs') for r in core['robustness']]
    folds = core['graph']['fold_graphs']
    assert all(g['edges'] == folds[0]['edges'] for g in folds)
    core['graph']['fold_graphs'] = [folds[0]] + [{k:v for k,v in g.items() if k!='edges'} for g in folds[1:]]
    heads = explain['attention'].pop('models')
    explain['attention']['model_count'] = len(heads)
    explain['attention']['head_count'] = len(heads[0])
    assets = {}
    assets['core'] = emit('data-core.js', 'window.RESPGRAPH_DATA='+dump(core)+';\nwindow.RESPGRAPH_DATA.graph.fold_graphs.forEach(g=>{if(!g.edges)g.edges=window.RESPGRAPH_DATA.graph.fold_graphs[0].edges;});\nwindow.RESPGRAPH_EXPLAIN='+dump(explain)+';\n')
    assets['stability'] = emit('stability-data.js', '('+dump(runs)+').forEach((runs,i)=>window.RESPGRAPH_DATA.robustness[i].runs=runs);\n')
    assets['cohort'] = emit('cohort-data.js', 'window.RESPGRAPH_DATA.cohort_presets='+dump(presets)+';\n')
    assets['attention'] = emit('attention-detail.js', 'window.RESPGRAPH_EXPLAIN.attention.models='+dump(heads)+';\n')
    js = ['graph3d.js','mri-data.js','mri-viewer.js','architecture.js','input-schema.js','browser-inference.js','dashboard-charts.js','dashboard-help.js','dashboard.js']
    assets['runtime'] = emit('dashboard-runtime.js', '\n'.join('// SOURCE: '+name+'\n'+(PUBLIC/name).read_text(encoding='utf-8') for name in js))
    css = ['mri-viewer.css','dashboard.css']
    assets['styles'] = emit('dashboard-style.css', '\n'.join('/* SOURCE: '+name+' */\n'+(PUBLIC/name).read_text(encoding='utf-8') for name in css))
    emit('asset-map.js', 'window.RESPGRAPH_ASSETS='+dump(assets)+';\n')
    template = (APP/'index.template.html').read_text(encoding='utf-8')
    for key,value in assets.items():
        template = template.replace('{{'+key+'}}', value['file']+'?v='+value['version'])
    template = template.replace('{{map}}', 'asset-map.js?v='+hashlib.sha256(dump(assets).encode()).hexdigest()[:12])
    template = template.replace('{{boot}}', 'bootstrap.js?v='+hashlib.sha256((PUBLIC/'bootstrap.js').read_bytes()).hexdigest()[:12])
    emit('index.html', template)
    # Synchronize the local inference server without touching private runtime data.
    if PUBLIC != APP:
        local = APP/'site'/'dist'
        local.mkdir(parents=True,exist_ok=True)
        for f in PUBLIC.iterdir():
            if f.is_file() and f.suffix in {'.js','.css','.html','.md','.svg','.json'}:
                shutil.copy2(f, local/f.name)
        shutil.copytree(PUBLIC/'browser-model',local/'browser-model',dirs_exist_ok=True)
        shutil.copy2(__file__,PUBLIC/'build_frontend.py')
        shutil.copy2(APP/'index.template.html',PUBLIC/'index.template.html')
    print(json.dumps({'assets':assets,'initial_bytes':sum(assets[k]['bytes'] for k in ['core','runtime','styles'])},ensure_ascii=False))

if __name__ == '__main__':
    build()
