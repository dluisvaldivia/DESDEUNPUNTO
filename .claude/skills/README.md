# Skills del proyecto

Cada skill es una carpeta con un archivo `SKILL.md`:

```
.claude/skills/
  nombre-de-la-skill/
    SKILL.md
    (archivos de apoyo opcionales: scripts, plantillas, referencias)
```

Formato de `SKILL.md`:

```markdown
---
name: nombre-de-la-skill
description: Cuándo debe usarse esta skill (Claude la elige leyendo esto). Incluir frases gatillo, ej. "usar cuando se pida agregar una obra nueva".
---

Instrucciones paso a paso que Claude sigue al invocar la skill.
```

- El `name` va en kebab-case y se invoca como `/nombre-de-la-skill`.
- La `description` es lo más importante: define cuándo se activa.
- Las skills se versionan con el repo (se commitean), así funcionan en cualquier máquina.
