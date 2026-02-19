# Deep Sea

Deep Sea is a browser-based game engine that utilizes the Canvas API for rendering graphics.

## Getting Started

To start a new project, simply clone this repository and start building!

## File Structure

Deep Sea uses an opinionated file structure to allow for predictable loading paths. Assets should be organized as followed:

```
src/
├─ assets/
│  ├─ audio/
│  │  ├─ [audio].mp4
│  ├─ images/
│  │  ├─ [image].png
│  ├─ scenes/
│  │  ├─ [scene].ts
│  ├─ scripts/
│  │  ├─ [script].ts
│  ├─ spriteSheets/
│  │  ├─ [spriteSheet].json
```

When Scripts are loaded, the default export is assumed to be the Script class.