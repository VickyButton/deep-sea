# Deep Sea

Deep Sea is a browser-based game engine that utilizes the Canvas API for rendering graphics.

## Getting Started

To start a new project, simply clone this repository and start building!

## File Structure

Deep Sea uses an opinionated file structure to allowing for predictable loading paths. Custom content should be organized as followed:

```
src/
├─ assets/
│  ├─ audio/
│  ├─ images/
├─ nodes/
├─ scenes/
│  ├─ [sceneName]/
│  │  ├─ [sceneName].ts
```

When Scenes are loaded, the default export is assumed to be the Scene class.