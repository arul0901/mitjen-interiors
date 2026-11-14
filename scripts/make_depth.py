"""
Depth map generation and stock image processor for Mitjen Architecture Studio Parallax Hero.
Uses HuggingFace pipeline with Depth-Anything-V2-Small-hf.
"""
import os
import urllib.request
from io import BytesIO
import numpy as np
from PIL import Image, ImageFilter, ImageOps

# Ensure directories exist
os.makedirs("raw", exist_ok=True)
os.makedirs("public/rooms", exist_ok=True)

# 6 Curated high-res minimal luxury architectural interior photos from Unsplash
ROOM_SOURCES = [
    {
        "id": "01-living",
        "name": "Living Pavilion",
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2560&q=85",
        "photographer": "R ARCHITECTURE",
        "unsplash_url": "https://unsplash.com/photos/photo-1600210492486-724fe5c67fb0",
        "license": "Unsplash Free License (Commercial use allowed, no attribution required)"
    },
    {
        "id": "02-kitchen",
        "name": "Culinary Studio",
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=85",
        "photographer": "R ARCHITECTURE",
        "unsplash_url": "https://unsplash.com/photos/photo-1600585154340-be6161a56a0c",
        "license": "Unsplash Free License (Commercial use allowed, no attribution required)"
    },
    {
        "id": "03-bedroom",
        "name": "Master Sanctuary",
        "url": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2560&q=85",
        "photographer": "Spacejoy",
        "unsplash_url": "https://unsplash.com/photos/photo-1616594039964-ae9021a400a0",
        "license": "Unsplash Free License (Commercial use allowed, no attribution required)"
    },
    {
        "id": "04-bathroom",
        "name": "Spa Retreat",
        "url": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2560&q=85",
        "photographer": "Christian Mackie",
        "unsplash_url": "https://unsplash.com/photos/photo-1584622650111-993a426fbf0a",
        "license": "Unsplash Free License (Commercial use allowed, no attribution required)"
    },
    {
        "id": "05-dining",
        "name": "Dining Hall",
        "url": "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2560&q=85",
        "photographer": "Spacejoy",
        "unsplash_url": "https://unsplash.com/photos/photo-1617806118233-18e1de247200",
        "license": "Unsplash Free License (Commercial use allowed, no attribution required)"
    },
    {
        "id": "06-terrace",
        "name": "Panoramic Terrace",
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2560&q=85",
        "photographer": "R ARCHITECTURE",
        "unsplash_url": "https://unsplash.com/photos/photo-1600607687939-ce8a6c25118c",
        "license": "Unsplash Free License (Commercial use allowed, no attribution required)"
    }
]

def center_crop_3_2(img, target_width=2560):
    target_height = int(target_width * (2.0 / 3.0)) # 1707
    w, h = img.size
    current_ratio = w / h
    target_ratio = 3.0 / 2.0

    if current_ratio > target_ratio:
        # Crop width
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        # Crop height
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))

    return img.resize((target_width, target_height), Image.Resampling.LANCZOS)

def process_images_and_depth():
    print("=== Step 1: Downloading & Processing Room Photos ===")
    processed_images = {}

    for item in ROOM_SOURCES:
        rid = item["id"]
        raw_path = os.path.join("raw", f"{rid}.jpg")
        webp_path = os.path.join("public", "rooms", f"{rid}.webp")

        if not os.path.exists(raw_path):
            print(f"Downloading {rid} from {item['url']}...")
            req = urllib.request.Request(item["url"], headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req) as resp:
                data = resp.read()
                with open(raw_path, "wb") as f:
                    f.write(data)
                print(f"Saved raw image to {raw_path} ({len(data)} bytes)")
        else:
            print(f"Using cached raw image {raw_path}")

        img = Image.open(raw_path).convert("RGB")
        # Crop to 3:2 at 2560px long edge
        cropped_img = center_crop_3_2(img, 2560)
        
        # Save webp with quality 84
        cropped_img.save(webp_path, "WEBP", quality=84)
        file_size_kb = os.path.getsize(webp_path) / 1024
        print(f"Output {webp_path}: {cropped_img.size}, {file_size_kb:.1f} KB")
        processed_images[rid] = cropped_img

    print("\n=== Step 2: Generating Depth Maps with Depth-Anything-V2-Small-hf ===")
    from transformers import pipeline
    depth_pipe = pipeline(task="depth-estimation", model="depth-anything/Depth-Anything-V2-Small-hf")

    for item in ROOM_SOURCES:
        rid = item["id"]
        depth_path = os.path.join("public", "rooms", f"{rid}-depth.png")
        print(f"Estimating depth for {rid}...")
        img = processed_images[rid]

        # Run inference
        result = depth_pipe(img)
        raw_depth_pil = result["depth"]
        depth_arr = np.array(raw_depth_pil).astype(np.float32)

        # Normalize to full 0..255 range (auto-levels)
        d_min = depth_arr.min()
        d_max = depth_arr.max()
        if d_max > d_min:
            depth_norm = (depth_arr - d_min) / (d_max - d_min) * 255.0
        else:
            depth_norm = np.zeros_like(depth_arr)

        # In Depth Anything V2: larger values represent closer objects (WHITE = NEAR, BLACK = FAR).
        # We ensure near is bright (> 128) and far is dark (< 128).
        depth_img = Image.fromarray(depth_norm.astype(np.uint8), mode="L")

        # Resize to 1280px on long edge with exact same 3:2 aspect ratio (1280 x 853)
        depth_img = depth_img.resize((1280, 853), Image.Resampling.LANCZOS)

        # Apply 1.5px Gaussian blur to hide stair-stepping
        depth_img = depth_img.filter(ImageFilter.GaussianBlur(1.5))

        # Save 8-bit grayscale PNG
        depth_img.save(depth_path, "PNG", optimize=True)
        size_kb = os.path.getsize(depth_path) / 1024
        print(f"Generated {depth_path}: {depth_img.size}, {size_kb:.1f} KB")

    print("\nAll 6 rooms and depth maps successfully generated!")

if __name__ == "__main__":
    process_images_and_depth()

