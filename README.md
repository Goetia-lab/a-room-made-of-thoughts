# A Room Made of Thoughts

Cozy typing rhythm game. Pixel-art isometric room that grows as you write.
Working title. Status: Phase 0 complete (GDD + architecture + art direction).

## Docs

- GDD (source of truth): [`docs/gdd/gdd.md`](docs/gdd/gdd.md)
- Architecture / design-tech report (GDD §28.2): [`docs/architecture/architecture.md`](docs/architecture/architecture.md)
- GDD pack + art direction deliverables (vault): `C:\Users\acer\Documents\Goetia's-Grimoire\A Room Made of Thoughts\`

## Stack

Vanilla JS + Canvas 2D + Web Audio API. No bundler, no runtime dependencies.
Art: `pxl-pixel-art` (sprites/scenes) + `pixelfx` (VFX). Original assets, MIT.

## Structure

```
art/     pxl source + out/ (generated)
data/    song registry, sentences, room layout (JSON)
docs/    gdd/, architecture/
src/     game modules (core, typing, rhythm, audio, room, atmosphere, ui, content, debug)
tests/   smoke tests (node --test)
```

## Art

```bash
node <pxl-skill>/bin/pxl.js build art/prototype.px.js --scale 2
```

Output: `art/out/scenes/*.png`, previews in `art/out/_preview/`.
