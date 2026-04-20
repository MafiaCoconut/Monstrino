from enum import StrEnum


class OllamaModels(StrEnum):
    PHI3_MINI = "phi3:mini"
    QWEN3_14B = "qwen3-14b:latest"
    QWEN3_30B = "qwen3-vl:30b-a3b-instruct-q4_K_M"
    PHI_3_MINI_4K_V4= "phi-3-mini-4k-instruct-version-4:latest"
    MISTRAL = "mistral"
    LLAVA_PHI_3 = "llava-phi3:latest"
    
    
    
    
    
    
    
"""

PHI3_MINI        - 3.8B,  4K  context, TEXT
QWEN3_14B        - 14.8B, 32K context TEXT
QWEN3_30B        - 30B,   32K context, TEXT + IMAGES
PHI_3_MINI_4K_V4 - 3.8B,  4k  context
MISTRAL          - 7B,    4K  context, TEXT
LLAVA_PHI_3      -        4k  context, IMAGES


"""