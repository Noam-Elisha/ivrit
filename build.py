import os, io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

parts = []
for f in sorted(os.listdir('src')):
    if f.endswith('.js'):
        parts.append(open('src/' + f, encoding='utf-8').read())
data = '\n'.join(parts)

tpl = open('template.html', encoding='utf-8').read()
page = tpl.replace('/*__DATA__*/', data)

# ---- 1. artifact build: bare fragment, the Artifact host supplies the skeleton
open('index.html', 'w', encoding='utf-8').write(page)
print("wrote index.html            %6.1f KB" % (len(page.encode('utf-8')) / 1024.0))

# ---- 2. standalone build for GitHub Pages: a complete HTML document
head_part, body_part = page.split('<div class="app">', 1)
body_part = '<div class="app">' + body_part

FAVICON = ("data:image/svg+xml,"
           "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E"
           "%3Ctext y='.9em' font-size='90'%3E%F0%9F%93%96%3C/text%3E%3C/svg%3E")

DESC = ("A 26-week Hebrew study plan: 503 words in themed daily sets, each with a "
        "memory hook and an example sentence, plus tiered spaced review.")

doc = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="{DESC}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#EEF0F3" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0F1217" media="(prefers-color-scheme: dark)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Ivrit">
<meta name="mobile-web-app-capable" content="yes">
<link rel="icon" href="{FAVICON}">
<link rel="apple-touch-icon" href="{FAVICON}">
<meta property="og:title" content="Six Months of Ivrit">
<meta property="og:description" content="{DESC}">
<meta property="og:type" content="website">
{head_part.strip()}
</head>
<body>
{body_part.strip()}
</body>
</html>
"""

os.makedirs('docs', exist_ok=True)
open('docs/index.html', 'w', encoding='utf-8').write(doc)
print("wrote docs/index.html       %6.1f KB" % (len(doc.encode('utf-8')) / 1024.0))

# sanity
print()
print("word entries: %d   lesson blocks: %d" % (len(re.findall(r'en:"', page)), len(re.findall(r'\{t:"', page))))
for tag in ('<!doctype html>', '<meta charset', 'viewport', '<title>', '</html>'):
    assert tag.lower() in doc.lower(), "missing " + tag
print("standalone document structure: OK")
