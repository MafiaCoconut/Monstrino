[//]: # (---)

[//]: # (title: Release Type Model)

[//]: # (tags:)

[//]: # (  - monstrino)

[//]: # (  - model)

[//]: # (  - domain)

[//]: # (created: 27-11-2025)

[//]: # (---)

[//]: # ()
[//]: # (# Release Type Model)

[//]: # ()
[//]: # (Release Type model is used to handle all possible types of releases)

[//]: # ()
[//]: # (This document includes:)

[//]: # ()
[//]: # (- Canonical schema)

[//]: # (- Field definitions)

[//]: # (- Relations)

[//]: # (- Lifecycle stages)

[//]: # (- Mapping across services)

[//]: # (- Example Release Type object)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 📦 Summary)

[//]: # ()
[//]: # (### **Purpose**)

[//]: # (Contain possible release types)

[//]: # ()
[//]: # (### **Used By**)

[//]: # (Release Type Link Model)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (# 🧬 Schema)

[//]: # ()
[//]: # (```python)

[//]: # (class ReleaseType&#40;BaseModel&#41;:   )

[//]: # (    id: Optional[int] = None  )

[//]: # (    name: str  )

[//]: # (    display_name: str  )

[//]: # (    category: str  )

[//]: # (  )
[//]: # (    updated_at: Optional[datetime | str] = Field&#40;default=None&#41;  )

[//]: # (    created_at: Optional[datetime | str] = Field&#40;default=None&#41;)

[//]: # (```)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (# 🧩 Field-by-Field Description)

[//]: # ()
[//]: # (id - primary id)

[//]: # (name - name of type &#40;Example: 2-pack, tier-deluxe, fashion-pack&#41;)

[//]: # (display_name - Variant of the name to display this record)

[//]: # (category)

[//]: # ()
[//]: # (> 💡 Tip: Keep fields atomic, explicit and normalized.)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (# 🔗 Relations)

[//]: # ()
[//]: # ()
[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (# 🧪 Lifecycle)

[//]: # (%% )

[//]: # (1. **Parsed → structured**  )

[//]: # (2. **Imported → validated**  )

[//]: # (3. **Resolved → enriched**  )

[//]: # (4. **Linked to other domain entities**  )

[//]: # (5. **Stored and exposed to UI** )

[//]: # (6. %%)

[//]: # ()
[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (# 🧩 Example Release Type Object)

[//]: # ()
[//]: # (```json)

[//]: # (ReleaseType&#40;  )

[//]: # (    name="vinyl-figure",  )

[//]: # (    display_name="Vinyl Figure",  )

[//]: # (    category=ReleaseTypeCategory.CONTENT,  )

[//]: # (&#41;)

[//]: # (```)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (# 📚 Related Documentation)

[//]: # ()
[//]: # ([[Models Index]])

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (# 📝 Notes)

[//]: # ()
