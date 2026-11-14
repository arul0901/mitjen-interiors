import urllib.request, json, base64, subprocess, time, asyncio, websockets
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
PORT = 9233
proc = subprocess.Popen([CHROME, '--headless=new', '--disable-gpu', f'--remote-debugging-port={PORT}', '--remote-allow-origins=*', 'about:blank'])
time.sleep(2)
try:
    req = urllib.request.urlopen(f'http://localhost:{PORT}/json/version')
    ws_url = json.loads(req.read().decode())['webSocketDebuggerUrl']
    async def run_audit():
        async with websockets.connect(ws_url, max_size=50_000_000) as ws:
            async def cmd(i, m, p=None, sid=None):
                d = {'id': i, 'method': m}
                if p: d['params'] = p
                if sid: d['sessionId'] = sid
                await ws.send(json.dumps(d))
                while True:
                    r = json.loads(await ws.recv())
                    if r.get('id') == i: return r
            i = 1
            res = await cmd(i, 'Target.createTarget', {'url': 'http://localhost:5173/about'}); i += 1
            tid = res['result']['targetId']
            res = await cmd(i, 'Target.attachToTarget', {'targetId': tid, 'flatten': True}); i += 1
            sid = res['result']['sessionId']
            await cmd(i, 'Page.enable', sid=sid); i += 1
            await cmd(i, 'Emulation.setDeviceMetricsOverride', {'width': 390, 'height': 844, 'deviceScaleFactor': 2.0, 'mobile': True}, sid=sid); i += 1
            await asyncio.sleep(2)

            r = await cmd(i, 'Runtime.evaluate', {'expression': 'document.querySelector(".cs_cta_style_1").getBoundingClientRect().top + window.scrollY'}, sid=sid); i += 1
            cta_top = r['result']['result']['value']
            print(f'CTA top: {cta_top}')

            await cmd(i, 'Runtime.evaluate', {'expression': f'window.scrollTo(0, {cta_top - 50})'}, sid=sid); i += 1
            await asyncio.sleep(0.8)
            res = await cmd(i, 'Page.captureScreenshot', {'format': 'png'}, sid=sid); i += 1
            with open('about_mobile_12_cta_exact.png', 'wb') as f:
                f.write(base64.b64decode(res['result']['data']))
            print('Captured CTA exact')
            await cmd(i, 'Target.closeTarget', {'targetId': tid})
    asyncio.run(run_audit())
finally:
    proc.terminate()
    proc.wait()

