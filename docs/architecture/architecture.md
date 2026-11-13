# DESIGN-TECH REPORT — A Room Made of Thoughts

Deliverable pertama GDD §28.2. Tanpa perubahan destruktif.
Tanggal: 2026-11-13.

## 1. Pemahaman desain

**Core loop (GDD §7.1):** pemain masuk kamar → mulai sesi → kalimat muncul → mengetik → feedback per karakter + anchor beat → kalimat selesai → objek muncul di kamar → atmosfer bereaksi → sesi diakhiri dengan ringkasan → kamar tersimpan.

**Empat pilar:**
- A — Typing feel is the gameplay: input instan, feedback lembut, completion jelas.
- B — Rhythm without pressure: beat jadi bonus rasa, bukan hukuman.
- C — Thoughts become a room: kalimat selesai → objek fisik di kamar.
- D — Atmosphere responds, never punishes: hujan/embus/cahaya mengikuti sesi.

MVP membuktikan 4 hal: typing enak, rhythm menambah rasa, kalimat → reward kamar, atmosfer menyatu (§22.1).

## 2. Pemisahan proyek baru vs archive

| Item | Status |
|---|---|
| Archive lama | `Goetia-lab/typing-fever-prototype` — public, read-only |
| Isi archive | Tidak berubah (`pushedAt` = `2026-11-13T05:40:51Z`) |
| Dependency runtime | Nol |
| Carry-over kode/aset | Nol. Hanya pelajaran (review v1.2.0) |
| Proyek baru | Repo terpisah, identitas sendiri |

Pelajarang dari archive yang dipakai: timing audio berbasis clock (bukan frame), guard angka word pool, sprite pipeline `.px.js` → PNG, smoke check statik. Tidak ada file yang dicopy.

## 3. Audit workspace

- Vault: `C:\Users\acer\Documents\Goetia's-Grimoire\A Room Made of Thoughts\` — 6 file GDD pack (63,9 KB GDD).
- Repo baru: **belum ada**.
- Mesin dev: laptop 6 GB RAM, Windows. Stack Hermes background ~870 MB.
- Alat tersedia: Node.js, Python, browser desktop. Tidak ada Docker/DB/service.
- Ketersediaan asset: belum ada; semua placeholder/original.

## 4. Evaluasi engine (GDD §5.5)

Kriteria 1–8, skor 1 (buruk) – 5 (baik).

| Kriteria | Vanilla JS + Canvas 2D | Phaser | PixiJS |
|---|:---:|:---:|:---:|
| 1. Ketepatan timing audio & sinkronisasi | 5 | 3 | 3 |
| 2. Performa laptop lama | 5 | 3 | 4 |
| 3. Kualitas rendering pixel/isometric | 4 | 4 | 4 |
| 4. Layering, animasi, object pooling | 3 | 5 | 5 |
| 5. Ukuran bundle & kompleksitas dependency | 5 | 2 | 3 |
| 6. Debug & pemeliharaan | 5 | 4 | 4 |
| 7. Jalankan lokal | 5 | 4 | 4 |
| 8. Save lokal & offline | 5 | 5 | 5 |
| **Total** | **37** | **30** | **32** |

**Rekomendasi: Vanilla JS + Canvas 2D + Web Audio API.**

Alasan:
- Zero dependency → bundle minimal, cara jalan paling gampang (static server), paling hemat di laptop 6 GB.
- Audio clock Web Audio diakses langsung (kriteria 1) — kunci rhythm hybrid.
- Pixel-art scaling konsisten gampang diatur (`imageSmoothingEnabled = false`, integer scale).
- Scope MVP kecil (1 kamar, 1 lagu, 20–30 kalimat) → layering/pooling manual cukup.

Konsekuensi: partikel hujan & depth sorting ditulis manual. Mitigasi: batasi particle count, static layer di-render terpisah, pooling hanya kalau profiling perlu.

**Upgrade path:** kalau partikel/layer jadi bottleneck → pindah ke PixiJS (WebGL). Kontrak modul (§6) sengaja tidak mengunci renderer.

## 5. Struktur folder (diusulkan)

```
a-room-made-of-thoughts/
  index.html
  styles/main.css
  src/
    main.js                 # app shell + screen router
    core/                   # clock, events, save, rng, input bus
    typing/                 # typing engine + feedback
    rhythm/                 # beatmap, beat clock, evaluator
    audio/                  # audio manager + unlock
    room/                   # state, slots, renderer, evolution
    atmosphere/             # rain, fog, light, particles
    ui/                     # screens, HUD, settings, summary
    content/                # thought loader + validator
    debug/                  # QA overlay, timing log, content check
  data/
    songs.json
    thoughts.json
    objects.json
  assets/
    sprites/  audio/  fonts/
  docs/architecture/architecture.md
  tests/smoke/
  README.md
```

Aturan: `src/` modul ES native, tanpa bundler. `data/` JSON statis. `assets/` dipuat oleh pipeline pxl/pixelfx.

## 6. Arsitektur modul

12 modul logis GDD §20.1 → ownership:

| Modul | Folder | Tanggung jawab |
|---|---|---|
| App Shell | `main.js` | bootstrap, lifecycle, screen routing |
| Input / Typing Engine | `typing/` | key capture, normalisasi, cursor, correctness, backspace |
| Text Content | `content/` | guided/free thoughts, metadata, validasi |
| Rhythm / Beatmap | `rhythm/` | BPM, beat clock, anchors, timing grades, offset |
| Audio Manager | `audio/` | music, loops, SFX, volume, unlock |
| Room State | `room/state.js` | objek, slot, varian, state persisten |
| Room Renderer | `room/renderer.js` | scene isometric, layer, sorting, animasi |
| Atmosphere Controller | `atmosphere/` | rain, fog, light, partikel, transisi |
| Progression | `room/evolution.js` | completion event, unlock, milestone, summary |
| Save Manager | `core/save.js` | schema version, persistence, migration, reset |
| UI / Accessibility | `ui/` | menu, settings, text sizing, reduced effects |
| Debug / QA Tools | `debug/` | beat viz, timing log, perf overlay, content validator |

Aturan layer (control manifest ringkas):
- `core/` tidak boleh import `ui/`, `room/`, `atmosphere/`.
- `rhythm/` hanya baca clock dari `core/`, tidak bergantung frame rate.
- `room/renderer.js` hanya membaca state, tidak mengubah state.
- `audio/` adalah satu-satunya pemilik `AudioContext`.
- Event lewat `core/events.js`, bukan global mutation.

## 7. Data flow & event contract

Alur: input → typing engine → `typing.characterCorrect/Incorrect` → `typing.wordCompleted` → `typing.anchorEvaluated` (rhythm) → `thought.completed` → `room.objectSpawnRequested` → `room.objectSpawned` → `atmosphere.changed` → `save.requested`.

Event contract memakai daftar GDD §20.2. Implementasi: callback sederhana / EventTarget, bukan event bus berat.

## 8. Rencana audio clock & beatmap

- Sumber waktu: `AudioContext.currentTime`. Jangan pakai `setInterval` sebagai jam musik.
- Scheduler lookahead: timer 25 ms, lookahead 100 ms; jadwalkan anchor audio ke depan.
- Beat time: `t = beatOffsetMs/1000 + (beatIndex * 60/BPM)`. Semua anchor disimpan sebagai audio time.
- Input timestamp: catat `performance.now()` saat kata anchor selesai → petakan ke audio clock terdekat.
- Penilaian: Perfect ≤ 45 ms, Good ≤ 90 ms, Flow ≤ 140 ms (proposal awal; TBD setelah tes laptop).
- Frame drop tidak mengubah penilaian (evaluasi berbasis timestamp, bukan frame).
- BPM final & offset: TBD (GDD §26.3).
- Fallback: audio gagal → visual beat fallback, rhythm tidak menghukum.

## 9. Rencana typing engine

- Tangkap `keydown`; abaikan auto-repeat (`event.repeat`).
- Normalisasi teks NFKC; trimming whitespace di anchor.
- State per karakter: pending / correct / incorrect / current.
- Backspace: hanya kembali ke karakter yang bisa dikoreksi; jangan proses dua kali.
- IME composition: tangani `compositionstart/end` supaya tidak duplikat.
- Fokus: pulihkan ke typing area setelah interaksi UI; jangan tangkap shortcut browser saat mengetik.
- Anchor: dievaluasi saat kata ke-`wordIndex` selesai (bukan per karakter).
- SFX keypress: satu bunyi lembut, rate-limit bila perlu.

## 10. Rencana room evolution & object placement

- Slot-based: `data/objects.json` mendefinisikan `allowedSlots`; slot dijamin tidak merusak komposisi.
- Pemilihan objek: dari `objectRewardPool` thought + `moodAffinity`; deterministik via seed tersimpan.
- Spawn animation: `soft_reveal` (fade + naik halus), 1–2 detik.
- Evolusi bertahap: `evolutionStage` naik tiap N kalimat; varian objek bisa berubah (mis. lampu off → warm_on).
- Save: `roomState` eksplisit (objek, slot, varian, seed, stage, atmosfer).
- Reload: hasil sama karena seed tersimpan; random tidak menentukan hasil.

## 11. Asset pipeline ringan

- Sprite: `pxl-pixel-art` → PNG per objek/pose. Nol pembelian asset pack.
- VFX: `pixelfx` untuk hujan, embun, denyut beat, spawn.
- Font: system font stack + fallback; jangan unduh font berat kalau tidak perlu.
- Audio: 1 lagu OGG + SFX pendek; kompres, loop aman.
- Tanpa atlas dulu (YAGNI); gabung jadi atlas kalau profiling menunjukkan banyak draw call.
- Validasi: sprite diuji di dalam scene, bukan terpisah (§15.4).

## 12. Milestone implementasi

Urutan wajib GDD §28.3:

1. Phase 0 — separation & audit (sedang berjalan).
2. Phase 1 — typing feel prototype (1 layar, 1 kalimat).
3. Phase 2 — rhythm hybrid prototype (1 lagu, beat clock, anchor).
4. Phase 3 — room evolution prototype (1 kamar, 3–5 objek, save).
5. Phase 4 — atmosphere prototype (hujan, fog, cahaya).
6. Phase 5 — vertical slice gabungan.
7. Phase 6 — konten & polish (20–30 kalimat).

Tiap fase punya exit criteria (§23) + cara uji + acceptance criteria.

## 13. Risiko teknis & TBD

Risiko:
- Partikel hujan manual bisa berat di laptop 6 GB → batasi count, reduce particles setting.
- Audio clock vs visual pulse drift → scheduler lookahead + kalibrasi offset.
- IME/composition di browser beda → tes manual sejak Phase 1.
- Pixel scaling pecah di jendela non-integer → integer scale + letterbox.

TBD yang menghambat produksi (GDD §26.3):
- Judul final, engine final, resolusi internal + grid, BPM final, room layout final, daftar kalimat final, Free Thoughts history, mood selection, aturan slot, distribusi.
- Yang paling menghambat: **resolusi internal + grid** dan **BPM** (butuh tes visual & audio).

## 14. Rekomendasi repo baru

- Nama: **`a-room-made-of-thoughts`** (bukan `typing-fever` — GDD §1.2 melarang identitas lanjutan).
- Visibility: public (D3).
- Isi awal: `README.md`, `docs/architecture/architecture.md` (report ini), `data/` kosong, `src/` kosong, `tests/smoke/`.
- Nol dependency dari archive.

## Next step

1. Owner konfirmasi nama repo → buat repo + scaffold minimal.
2. Art direction deliverables (`ART_DIRECTION.md`, `MVP_ASSET_MATRIX`, `VISUAL_PROTOTYPE_PLAN.md`).
3. Baru Phase 1 typing prototype.
