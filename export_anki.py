"""Export the curriculum to a CSV that Anki / Quizlet can import.

Columns: Front (English) | Back (Hebrew) | Transliteration | Extra forms |
         Mnemonic | Example (Hebrew) | Example (translit) | Example (English) |
         Category | Day
"""
import os, re, csv, io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Reuse the built bundle so the day numbers match the app exactly.
html = open('index.html', encoding='utf-8').read()
js = re.search(r'<script>([\s\S]*)</script>', html).group(1)

# Run the bundle's curriculum logic under Node and dump JSON.
shim = """
global.document={querySelectorAll:()=>[],querySelector:()=>({style:{},addEventListener(){}}),
 getElementById:()=>({innerHTML:'',value:0,style:{},addEventListener(){},focus(){},setSelectionRange(){}}),
 addEventListener(){},body:{classList:{remove(){},add(){}}}};
global.window={scrollTo(){}};global.localStorage={getItem(){return null},setItem(){}};
"""
dump = """
var rows=[];
LESSONS.forEach(function(L,i){
  var day=lessonDayOf[i];
  L.w.forEach(function(w){
    rows.push([w.en, w.he, w.tr,
      (w.inf ? 'inf. '+w.inf+' '+w.infHe : (w.pl && w.pl!=='\\u2014' ? 'pl. '+w.pl+' '+w.plHe : '')),
      w.mn||'', w.ex?w.ex[1]:'', w.ex?w.ex[0]:'', w.ex?w.ex[2]:'', L.c, day]);
  });
});
process.stdout.write(JSON.stringify(rows));
"""
import subprocess
open('_tmp.js', 'w', encoding='utf-8').write(shim + js + dump)
raw = subprocess.run(['node', '_tmp.js'], stdout=subprocess.PIPE, check=True).stdout
os.remove('_tmp.js')
rows = json.loads(raw.decode('utf-8'))

path = 'hebrew-503-words-anki.csv'
with open(path, 'w', encoding='utf-8-sig', newline='') as f:
    w = csv.writer(f)
    w.writerow(['Front (English)', 'Back (Hebrew)', 'Transliteration', 'Other forms',
                'Mnemonic', 'Example (Hebrew)', 'Example (translit)', 'Example (English)',
                'Category', 'Day'])
    w.writerows(rows)
print('wrote %s  (%d cards)' % (path, len(rows)))
