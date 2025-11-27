---
title: {{model_name}} Model
tags: [monstrino, model, domain]
created: {{date}}
---

# {{model_name}} Model

{{description}}

This document includes:

- Canonical schema
- Field definitions
- Relations
- Lifecycle stages
- Mapping across services
- Example {{model_name}} object

---

## 📦 Summary

### **Purpose**
{{purpose}}

### **Used By**
{{used_by}}

---

# 🧬 Schema

```python
{{schema}}
```

---

# 🧩 Field-by-Field Description

{{fields}}

> 💡 Tip: Keep fields atomic, explicit and normalized.

---

# 🔗 Relations

{{relations}}

---

# 🧪 Lifecycle

1. **Parsed → structured**  
2. **Imported → validated**  
3. **Resolved → enriched**  
4. **Linked to other domain entities**  
5. **Stored and exposed to UI**

{{lifecycle_extra}}

---

# 🔁 Mapping Across Services

| Service | Responsibility |
|--------|----------------|
| Parser | Extracts raw metadata |
| Importer | Validates, normalizes, deduplicates |
| Resolver | Infers types, exclusives, pack sizes |
| Image Service | Attaches & processes images |
| UI (FSD) | Displays entity in cards/pages |

{{mapping_extra}}

---

# 🧩 Example {{model_name}} Object

```json
{{example}}
```

---

# 📚 Related Documentation

- [[Models Index]]
- [[{{related_1}}]]
- [[{{related_2}}]]
- [[{{related_3}}]]

---

# 📝 Notes

{{notes}}