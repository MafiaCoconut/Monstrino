# API Examples

This file contains practical examples for using the Background Removal Service API.

## Basic Examples

### 1. Extract a person

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=person" \
  -F "mode=best" \
  -o person.png
```

### 2. Extract a specific object

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@room.jpg" \
  -F "prompt=the red chair" \
  -F "mode=best" \
  -o chair.png
```

### 3. Extract with JSON response

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=dog" \
  -F "mode=best" \
  -F "return_json=true" | jq .
```

### 4. Extract largest object

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@scene.jpg" \
  -F "prompt=car" \
  -F "mode=largest" \
  -o car.png
```

### 5. Extract all matching objects

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@table.jpg" \
  -F "prompt=bottles" \
  -F "mode=all" \
  -o bottles.png
```

### 6. WebP output format

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=person" \
  -F "output_format=webp" \
  -o person.webp
```

## Advanced Examples

### 7. Complex prompts

```bash
# Extract person wearing specific clothing
curl -X POST http://localhost:8000/cutout \
  -F "image=@group.jpg" \
  -F "prompt=the person wearing a blue jacket" \
  -o person_blue.png

# Extract object with color and description
curl -X POST http://localhost:8000/cutout \
  -F "image=@kitchen.jpg" \
  -F "prompt=the white coffee mug on the table" \
  -o mug.png

# Extract animals
curl -X POST http://localhost:8000/cutout \
  -F "image=@pets.jpg" \
  -F "prompt=the black cat" \
  -o cat.png
```

### 8. Check response headers

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=person" \
  -v -o person.png 2>&1 | grep "^< X-"
```

Output:
```
< X-Score: 0.87
< X-BBox: 123,456,789,1011
< X-Label: person
< X-Inference-Time-Ms: 1234.5
```

### 9. Decode base64 response

```bash
# Get JSON response and decode image
RESPONSE=$(curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=person" \
  -F "return_json=true")

# Extract and decode base64 image
echo $RESPONSE | jq -r '.image_base64' | base64 -d > output.png

# Get metadata
echo $RESPONSE | jq '{score: .score, bbox: .bbox, timings: .timings_ms}'
```

### 10. Batch processing script

```bash
#!/bin/bash
# Process multiple images with the same prompt

PROMPT="person"
OUTPUT_DIR="./cutouts"
mkdir -p "$OUTPUT_DIR"

for image in images/*.jpg; do
    filename=$(basename "$image" .jpg)
    echo "Processing $filename..."
    
    curl -X POST http://localhost:8000/cutout \
      -F "image=@$image" \
      -F "prompt=$PROMPT" \
      -F "mode=best" \
      -o "$OUTPUT_DIR/${filename}_cutout.png"
    
    echo "Saved to $OUTPUT_DIR/${filename}_cutout.png"
done
```

## Python Examples

### 11. Using `requests` library

```python
import requests

# Binary response
with open("photo.jpg", "rb") as f:
    response = requests.post(
        "http://localhost:8000/cutout",
        files={"image": f},
        data={
            "prompt": "person",
            "mode": "best",
            "output_format": "png",
        }
    )

if response.status_code == 200:
    with open("output.png", "wb") as f:
        f.write(response.content)
    
    # Get metadata from headers
    print(f"Score: {response.headers['X-Score']}")
    print(f"BBox: {response.headers['X-BBox']}")
```

### 12. JSON response with Python

```python
import requests
import base64
from PIL import Image
from io import BytesIO

with open("photo.jpg", "rb") as f:
    response = requests.post(
        "http://localhost:8000/cutout",
        files={"image": f},
        data={
            "prompt": "person",
            "mode": "best",
            "return_json": True,
        }
    )

if response.status_code == 200:
    data = response.json()
    
    # Decode image
    image_bytes = base64.b64decode(data["image_base64"])
    image = Image.open(BytesIO(image_bytes))
    image.save("output.png")
    
    # Print metadata
    print(f"Score: {data['score']}")
    print(f"BBox: {data['bbox']}")
    print(f"Inference time: {data['timings_ms']['inference_ms']:.1f}ms")
    print(f"Device: {data['model_info']['device']}")
```

### 13. Process multiple images

```python
import requests
from pathlib import Path

images_dir = Path("images")
output_dir = Path("cutouts")
output_dir.mkdir(exist_ok=True)

for image_path in images_dir.glob("*.jpg"):
    print(f"Processing {image_path.name}...")
    
    with open(image_path, "rb") as f:
        response = requests.post(
            "http://localhost:8000/cutout",
            files={"image": f},
            data={"prompt": "person", "mode": "best"},
        )
    
    if response.status_code == 200:
        output_path = output_dir / f"{image_path.stem}_cutout.png"
        with open(output_path, "wb") as f:
            f.write(response.content)
        print(f"  Saved to {output_path}")
    else:
        print(f"  Error: {response.status_code}")
```

## JavaScript Examples

### 14. Using `fetch` API

```javascript
async function cutoutImage(imageFile, prompt) {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('prompt', prompt);
    formData.append('mode', 'best');
    formData.append('return_json', 'true');
    
    const response = await fetch('http://localhost:8000/cutout', {
        method: 'POST',
        body: formData
    });
    
    if (response.ok) {
        const data = await response.json();
        console.log('Score:', data.score);
        console.log('BBox:', data.bbox);
        
        // Decode base64 image
        const imageData = atob(data.image_base64);
        const blob = new Blob([imageData], { type: 'image/png' });
        return blob;
    } else {
        throw new Error(`Error: ${response.status}`);
    }
}

// Usage
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];
const blob = await cutoutImage(file, 'person');

// Display or download
const url = URL.createObjectURL(blob);
const img = document.createElement('img');
img.src = url;
document.body.appendChild(img);
```

## Health Check

### 15. Check service health

```bash
curl http://localhost:8000/health | jq .
```

Output:
```json
{
  "status": "healthy",
  "device": {
    "device_type": "rocm",
    "device": "cuda:0",
    "gpu_name": "AMD Radeon RX 7900 XTX",
    "gpu_count": "1"
  },
  "models_loaded": {
    "grounding_dino": true,
    "sam2": true
  }
}
```

## Error Handling

### 16. Handle errors

```bash
# Invalid prompt (empty)
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=" \
  -v

# Response: 400 Bad Request
# {"detail":"Prompt cannot be empty"}

# Object not found
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=dinosaur" \
  -v

# Response: 422 Unprocessable Entity
# {"detail":"No objects matching 'dinosaur' found in the image"}
```

## Performance Testing

### 17. Benchmark inference time

```bash
#!/bin/bash
# Test inference time for different image sizes

SIZES=("640x480" "1920x1080" "3840x2160")

for size in "${SIZES[@]}"; do
    echo "Testing $size..."
    
    START=$(date +%s%3N)
    
    curl -X POST http://localhost:8000/cutout \
      -F "image=@test_${size}.jpg" \
      -F "prompt=person" \
      -s -o /dev/null -w "%{time_total}\n"
    
    END=$(date +%s%3N)
    TIME=$((END - START))
    
    echo "  Total time: ${TIME}ms"
done
```

## Multi-language Examples

### 18. Russian prompts

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=чёрная кошка" \
  -o cat.png
```

### 19. Chinese prompts

```bash
curl -X POST http://localhost:8000/cutout \
  -F "image=@photo.jpg" \
  -F "prompt=红色背包" \
  -o backpack.png
```

## Tips

1. **Specific prompts work better**: Use "the red backpack" instead of just "backpack"
2. **Mode selection**:
   - `best`: Highest confidence score (recommended)
   - `largest`: Biggest object by area
   - `all`: All matching objects (may combine multiple masks)
3. **Image size**: Images larger than `MAX_IMAGE_SIZE` (default 2048) are automatically resized
4. **Response format**: Use `return_json=true` when you need metadata (score, bbox, timings)
5. **Output format**: PNG supports better transparency, WebP is more compact
