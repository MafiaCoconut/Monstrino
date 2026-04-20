import pytest
from datetime import datetime
import base64
from icecream import ic
from app.interfaces.ollama_client_interface import OllamaClientInterface
from domain.enum import OllamaModels

def prompt() -> str:
    return "Analyze image and extract Monster High related data in JSON format."


def system_prompt() -> str:
    return """
    You are a Monster High JSON data extraction engine.
Goal: Read INPUT IMAGE, analyze characters, items on the image, and return OUTPUT JSON.
**MUST** output ONLY a single, valid JSON object. **NEVER** output natural language, explanations, or chain-of-thought.

**INPUT STRUCTURE (Always):**
<image>

**OUTPUT STRUCTURE (Always):** 

**STRICT FAILURE/ERROR RULE:**
If input is invalid image or something is wrong with image analysis, output:
{"success": false, "error": "INVALID_INPUT"}
"""


release_3_pack_image_url = "tests/data/Boo-York-City-Ghouls-3-Pack-s.jpg"

@pytest.mark.asyncio
async def test_image_request(ollama_client: OllamaClientInterface) -> None:
    with open(release_3_pack_image_url, "rb") as f:
        img = base64.b64encode(f.read()).decode()

    start_time = datetime.now()

    await ollama_client.generate(
        OllamaRequest(
            model=OllamaModels.LLAVA_PHI_3,
            system=system_prompt(),
            prompt=prompt(),
            format=format(),
            images=[img]
        )
    )
    ic(datetime.now() - start_time)


def format() -> dict:
    return {
  "type": "object",
  "properties": {
    "success": { "type": "boolean" },

    "characters_description": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {

          "body": {
            "type": "object",
            "properties": {
              "body_type": { "type": "string" },
              "body_color": { "type": "string" },
              "body_texture": { "type": "array", "items": { "type": "string" } },
              "skin_patterns": { "type": "array", "items": { "type": "string" } },
              "skin_finish": { "type": "string" },
              "body_transparent": { "type": "boolean" },
              "extra_body_parts": { "type": "array", "items": { "type": "string" } },
              "arm_count": { "type": "integer" },
              "leg_count": { "type": "integer" },
              "height_style": { "type": "string" }
            },
            "required": [
              "body_type", "body_color", "body_texture", "skin_patterns",
              "skin_finish", "body_transparent", "extra_body_parts",
              "arm_count", "leg_count", "height_style"
            ]
          },

          "face": {
            "type": "object",
            "properties": {
              "face_shape": { "type": "string" },
              "eye_color": { "type": "string" },
              "eye_shape": { "type": "string" },
              "eyebrow_shape": { "type": "string" },
              "eyebrow_color": { "type": "string" },
              "makeup_style": { "type": "string" },
              "makeup_colors": { "type": "array", "items": { "type": "string" } },
              "lipstick_color": { "type": "string" },
              "face_markings": { "type": "array", "items": { "type": "string" } },
              "teeth_type": { "type": "string" }
            },
            "required": [
              "face_shape", "eye_color", "eye_shape", "eyebrow_shape",
              "eyebrow_color", "makeup_style", "makeup_colors", "lipstick_color",
              "face_markings", "teeth_type"
            ]
          },

          "hair": {
            "type": "object",
            "properties": {
              "hair_color": { "type": "string" },
              "hair_mix_colors": { "type": "array", "items": { "type": "string" } },
              "hair_length": { "type": "string" },
              "hair_style": { "type": "string" },
              "hair_accessories": { "type": "array", "items": { "type": "string" } },
              "highlights": { "type": "array", "items": { "type": "string" } }
            },
            "required": [
              "hair_color", "hair_mix_colors", "hair_length",
              "hair_style", "hair_accessories", "highlights"
            ]
          },

          "clothes": {
            "type": "object",
            "properties": {
              "clothes_style": { "type": "string" },
              "clothes_type": { "type": "string" },
              "outfit_items": { "type": "array", "items": { "type": "string" } },
              "outfit_patterns": { "type": "array", "items": { "type": "string" } },
              "outfit_dominant_colors": { "type": "array", "items": { "type": "string" } },
              "outfit_secondary_colors": { "type": "array", "items": { "type": "string" } },
              "outfit_material": { "type": "string" },
              "sleeves_type": { "type": "string" },
              "neckline_type": { "type": "string" }
            },
            "required": [
              "clothes_style", "clothes_type", "outfit_items",
              "outfit_patterns", "outfit_dominant_colors",
              "outfit_secondary_colors", "outfit_material",
              "sleeves_type", "neckline_type"
            ]
          },

          "shoes": {
            "type": "object",
            "properties": {
              "shoes_color": { "type": "string" },
              "shoes_color_secondary": { "type": "string" },
              "shoes_type": { "type": "string" },
              "shoes_shape": { "type": "string" },
              "shoes_height": { "type": "string" },
              "shoes_details": { "type": "array", "items": { "type": "string" } },
              "shoes_material": { "type": "string" }
            },
            "required": [
              "shoes_color", "shoes_color_secondary", "shoes_type",
              "shoes_shape", "shoes_height", "shoes_details", "shoes_material"
            ]
          },

          "accessories": {
            "type": "object",
            "properties": {
              "bags": { "type": "array", "items": { "type": "string" } },
              "glasses": { "type": "array", "items": { "type": "string" } },
              "headpieces": { "type": "array", "items": { "type": "string" } },
              "belts": { "type": "array", "items": { "type": "string" } },
              "jewellery_neck": { "type": "array", "items": { "type": "string" } },
              "jewellery_wrist": { "type": "array", "items": { "type": "string" } },
              "jewellery_ear": { "type": "array", "items": { "type": "string" } },
              "other_accessories": { "type": "array", "items": { "type": "string" } }
            },
            "required": [
              "bags", "glasses", "headpieces",
              "belts", "jewellery_neck", "jewellery_wrist",
              "jewellery_ear", "other_accessories"
            ]
          },

          "monster_traits": {
            "type": "object",
            "properties": {
              "ears_type": { "type": "string" },
              "horns_type": { "type": "string" },
              "tail_type": { "type": "string" },
              "wings_type": { "type": "string" },
              "fins_type": { "type": "string" },
              "stitches": { "type": "boolean" },
              "monster_specific_traits": { "type": "array", "items": { "type": "string" } }
            },
            "required": [
              "ears_type", "horns_type", "tail_type", "wings_type",
              "fins_type", "stitches", "monster_specific_traits"
            ]
          },

          "pose": {
            "type": "object",
            "properties": {
              "pose_type": { "type": "string" },
              "hand_pose": { "type": "string" },
              "articulation_visible": { "type": "boolean" }
            },
            "required": ["pose_type", "hand_pose", "articulation_visible"]
          },

          "release_cues": {
            "type": "object",
            "properties": {
              "variant": { "type": "string" },
              "signature_style_cues": { "type": "array", "items": { "type": "string" } },
              "character_probability": {
                "type": "object",
                "additionalProperties": { "type": "number" }
              },
              "similarity_to": { "type": "array", "items": { "type": "string" } }
            },
            "required": [
              "variant", "signature_style_cues",
              "character_probability", "similarity_to"
            ]
          },

          "packaging": {
            "type": "object",
            "properties": {
              "box_type": { "type": "string" },
              "box_series_logo": { "type": "string" },
              "box_colors": { "type": "array", "items": { "type": "string" } },
              "box_front_text": { "type": "array", "items": { "type": "string" } },
              "box_icons": { "type": "array", "items": { "type": "string" } }
            },
            "required": [
              "box_type", "box_series_logo", "box_colors",
              "box_front_text", "box_icons"
            ]
          }
        },
        "required": [
          "body",
          "face",
          "hair",
          "clothes",
          "shoes",
          "accessories",
          "monster_traits",
          "pose",
          "release_cues",
          "packaging"
        ]
      }
    }
  },
  "required": ["success", "characters_description"]
}



"""
LIBRARY


"packaging": {
"box_type": "string",
"box_series_logo": "string",
"box_colors": ["string"],
"box_front_text": ["string"],
"box_icons": ["string"]
},

"pose": {
"pose_type": "string",
"hand_pose": "string",
"articulation_visible": false
},

"release_cues": {
"variant": "string",
"signature_style_cues": ["string"],
"character_probability": {
  "name": 0.0
},
"similarity_to": ["string"]
},


-----------
{
  "success": true,

  "characters_description": [
    {
      "body": {
        "body_type": "string",
        "body_color": "string",
        "body_texture": ["string"],
        "skin_patterns": ["string"],
        "skin_finish": "string",
        "body_transparent": false,
        "extra_body_parts": ["string"],
        "arm_count": 2,
        "leg_count": 2,
        "height_style": "string"
      },

      "face": {
        "face_shape": "string",
        "eye_color": "string",
        "eye_shape": "string",
        "eyebrow_shape": "string",
        "eyebrow_color": "string",
        "makeup_style": "string",
        "makeup_colors": ["string"],
        "lipstick_color": "string",
        "face_markings": ["string"],
        "teeth_type": "string"
      },

      "hair": {
        "hair_color": "string",
        "hair_mix_colors": ["string"],
        "hair_length": "string",
        "hair_style": "string",
        "hair_accessories": ["string"],
        "highlights": ["string"]
      },

      "clothes": {
        "clothes_style": "string",
        "clothes_type": "string",
        "outfit_items": ["string"],
        "outfit_patterns": ["string"],
        "outfit_dominant_colors": ["string"],
        "outfit_secondary_colors": ["string"],
        "outfit_material": "string",
        "sleeves_type": "string",
        "neckline_type": "string"
      },

      "shoes": {
        "shoes_color": "string",
        "shoes_color_secondary": "string",
        "shoes_type": "string",
        "shoes_shape": "string",
        "shoes_height": "string",
        "shoes_details": ["string"],
        "shoes_material": "string"
      },

      "accessories": {
        "bags": ["string"],
        "glasses": ["string"],
        "headpieces": ["string"],
        "belts": ["string"],
        "jewellery_neck": ["string"],
        "jewellery_wrist": ["string"],
        "jewellery_ear": ["string"],
        "other_accessories": ["string"]
      },

      "monster_traits": {
        "ears_type": "string",
        "horns_type": "string",
        "tail_type": "string",
        "wings_type": "string",
        "fins_type": "string",
        "stitches": false,
        "monster_specific_traits": ["string"]
      },
    }
  ]
}
"""