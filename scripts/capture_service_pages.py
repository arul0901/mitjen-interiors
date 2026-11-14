import json
import os
import subprocess
import time
import urllib.request
import base64
import asyncio
import websockets

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 9222
OUT_DIR = r"C:\Users\arulb\.gemini\antigravity\brain\9a118500-3726-4f27-8f86-3d9da4f62cd2"

async def send_cmd(ws, req_id, method, params=None, session_id=None):
    payload = {"id": req_id, "method": method}
    if params:
        payload["params"] = params
    if session_id:
        payload["sessionId"] = session_id
    await ws.send(json.dumps(payload))
    while True:
        raw = await ws.recv()
        msg = json.loads(raw)
        if msg.get("id") == req_id:
            return msg

def run():
    proc = subprocess.Popen([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        f"--remote-debugging-port={PORT}",
        "--remote-allow-origins=*",
        "about:blank"
    ])
    time.sleep(2)

    try:
        req = urllib.request.urlopen(f"http://localhost:{PORT}/json/version")
        ver_info = json.loads(req.read().decode())
        ws_url = ver_info["webSocketDebuggerUrl"]

        async def capture_pages():
            async with websockets.connect(ws_url, max_size=50_000_000) as ws:
                pages = [
                    ("service_residential", "http://localhost:5173/services/residential-interior-design"),
                    ("service_commercial", "http://localhost:5173/services/commercial-interior-design"),
                    ("service_corporate", "http://localhost:5173/services/corporate-interior-design"),
                ]

                req_id = 1
                for name, url in pages:
                    res = await send_cmd(ws, req_id, "Target.createTarget", {"url": url})
                    req_id += 1
                    target_id = res["result"]["targetId"]

                    res = await send_cmd(ws, req_id, "Target.attachToTarget", {"targetId": target_id, "flatten": True})
                    req_id += 1
                    session_id = res["result"]["sessionId"]

                    await send_cmd(ws, req_id, "Page.enable", session_id=session_id)
                    req_id += 1

                    await send_cmd(ws, req_id, "Emulation.setDeviceMetricsOverride", {
                        "width": 1440,
                        "height": 900,
                        "deviceScaleFactor": 1.5,
                        "mobile": False
                    }, session_id=session_id)
                    req_id += 1

                    await asyncio.sleep(2.0)

                    res = await send_cmd(ws, req_id, "Page.captureScreenshot", {"format": "png"}, session_id=session_id)
                    req_id += 1

                    img_data = base64.b64decode(res["result"]["data"])
                    filepath = os.path.join(OUT_DIR, f"{name}.png")
                    with open(filepath, "wb") as f:
                        f.write(img_data)
                    print(f"Captured {name}: {len(img_data)} bytes -> {filepath}")

                    await send_cmd(ws, req_id, "Target.closeTarget", {"targetId": target_id})
                    req_id += 1

        asyncio.run(capture_pages())

    except Exception as e:
        print("Error during screenshot capture:", e)
    finally:
        proc.terminate()
        proc.wait()

if __name__ == "__main__":
    run()

