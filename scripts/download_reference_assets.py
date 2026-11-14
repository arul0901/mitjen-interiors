import urllib.request
import os

base_url = 'https://mitijen-interiors-inqb.vercel.app'
headers = {'User-Agent': 'Mozilla/5.0'}

assets_to_download = [
    # Before & After images
    '/assets/mitijen/BF&AF/KitchenBF.jpeg',
    '/assets/mitijen/BF&AF/KitchenAF.jpeg',
    '/assets/mitijen/BF&AF/BFCupboard.jpeg',
    '/assets/mitijen/BF&AF/AFCupboard.jpeg',
    '/assets/mitijen/BF&AF/Wood.jpeg',
    '/assets/mitijen/BF&AF/AFWood.jpeg',
    '/assets/transformations/kitchen_before.jpg',
    '/assets/transformations/kitchen_after.jpg',
    '/assets/transformations/lounge_before.jpg',
    '/assets/transformations/lounge_after.jpg',
    '/assets/transformations/bedroom_before.jpg',
    '/assets/transformations/bedroom_after.jpg',
    # Panoramas
    '/assets/mitijen/panaroma/panaroma1.png',
    '/assets/mitijen/panaroma/panaroma2.png',
    '/assets/mitijen/panaroma/panaroma3.png',
    # Key studio images
    '/assets/mitijen/home1.jpeg',
    '/assets/mitijen/warm1.jpeg',
    '/assets/mitijen/dressing-cupboard.jpeg',
    '/assets/mitijen/home3.jpeg',
]

success = 0
for rel_path in assets_to_download:
    url = base_url + rel_path
    local_path = os.path.join('public', rel_path.lstrip('/'))
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    
    if os.path.exists(local_path) and os.path.getsize(local_path) > 0:
        print(f"Already exists: {local_path}")
        success += 1
        continue
        
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(local_path, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded: {local_path} ({os.path.getsize(local_path)} bytes)")
        success += 1
    except Exception as e:
        print(f"Failed {url}: {e}")

print(f"\nTotal downloaded/verified: {success}/{len(assets_to_download)}")

