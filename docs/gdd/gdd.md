# GAME DESIGN DOCUMENT (GDD)
# A ROOM MADE OF THOUGHTS

**Versi dokumen:** 1.0  
**Status:** Draft desain lengkap untuk validasi dan implementasi prototype  
**Judul game:** *A Room Made of Thoughts* — **working title, belum final**  
**Genre:** Cozy Typing Rhythm / Atmospheric Room-Building  
**Platform target awal:** Desktop web browser  
**Bahasa konten utama:** Bahasa Indonesia  
**Model pengalaman:** Single-player, offline-first, tanpa akun  

---

## 0. Cara Membaca Dokumen Ini

Dokumen ini adalah sumber kebenaran desain (*design source of truth*) untuk proyek game baru. Hermes harus membaca dokumen dari awal sampai akhir sebelum membuat keputusan implementasi.

Istilah normatif:
- **MUST / WAJIB:** persyaratan yang tidak boleh dihilangkan tanpa persetujuan pemilik proyek.
- **SHOULD / SEBAIKNYA:** keputusan yang sangat dianjurkan; penyimpangan harus disertai alasan dan trade-off.
- **MAY / BOLEH:** opsi yang dapat dipilih berdasarkan hasil eksperimen atau keterbatasan teknis.
- **TBD:** masih terbuka dan harus diuji atau diputuskan kemudian. Jangan mengarang keputusan final untuk bagian TBD.

Bila ada konflik antara implementasi lama, asumsi teknis, dan dokumen ini, **dokumen ini menjadi acuan desain**. Namun, jangan melakukan perubahan destruktif terhadap repository atau arsip apa pun tanpa persetujuan eksplisit.

## 1. Batas Proyek dan Hubungannya dengan Typing Fever

Bagian ini sangat penting dan tidak boleh disalahartikan.

### 1.1 Status Typing Fever

- **Typing Fever Prototype adalah proyek eksperimen terdahulu yang telah diubah menjadi prototype dan dipublikasikan sebagai public archive.**
- Arsip tersebut adalah dokumentasi perjalanan eksperimen, bukan fondasi wajib game baru.
- Repository, branch, commit, halaman publik, dan aset arsip Typing Fever harus diperlakukan sebagai **read-only reference**.
- Hermes tidak boleh menghapus, menimpa, merapikan ulang, memindahkan, mengganti nama, atau mengubah arsip publik itu kecuali pemilik proyek memberikan izin eksplisit.

### 1.2 Identitas Proyek Baru

Game di dalam GDD ini adalah **proyek baru yang berdiri sendiri**. Konsep, identitas, core loop, progression, struktur data, arsitektur, UI, dan arah artistiknya dapat berbeda secara mendasar dari Typing Fever Prototype.

Aturan pemisahan:
1. Jangan menyebut game baru ini sebagai update, sequel, remake, atau kelanjutan Typing Fever.
2. Jangan menganggap sistem lama seperti KOKI, coffee-shop progression, Fever, UI, state, atau struktur level sebagai kebutuhan game baru.
3. Jangan memaksakan kompatibilitas ke belakang (*backward compatibility*) dengan prototype lama.
4. Jangan membuat dependency runtime terhadap repository arsip.
5. Kode atau aset lama hanya boleh dipelajari sebagai referensi. Reuse diperbolehkan hanya jika benar-benar cocok, menghemat usaha, tidak membawa dependency yang tidak perlu, dan tidak merusak desain baru.
6. Bila reuse berpotensi mengunci arsitektur atau membuat game baru terasa seperti prototype lama, **jangan reuse**.
7. Rekomendasi default adalah workspace/repository baru yang terpisah. Jangan membuat atau memindahkannya dengan cara yang berisiko mengubah arsip publik.

### 1.3 Prosedur Audit Arsip

Jika akses ke Typing Fever diperlukan, Hermes hanya boleh:
- memeriksa struktur dan riwayat eksperimen;
- mencatat hal yang berhasil, gagal, atau belum terbukti;
- mengidentifikasi aset atau helper yang secara teknis mungkin berguna;
- menyampaikan rekomendasi reuse beserta alasan dan konsekuensinya.

Hermes tidak boleh menyalin seluruh proyek secara otomatis. Hasil audit harus memisahkan **pelajaran desain**, **opsi reuse**, dan **komponen yang sebaiknya ditinggalkan**.

---

## 2. Ringkasan Eksekutif

### 2.1 High Concept

Sebuah game mengetik yang tenang dan intim. Pemain mengetik potongan pikiran pendek mengikuti musik lo-fi. Setiap kalimat yang selesai berubah menjadi benda kecil di sebuah kamar isometrik—lampu, buku, tanaman, poster, cangkir, kucing, atau detail lain. Seiring pemain menulis, kamar yang awalnya dingin, kosong, dan ditemani hujan perlahan menjadi lebih hidup, hangat, dan personal.

Game ini bukan kompetisi mengetik dan bukan rhythm game yang menuntut pemain menekan setiap tombol tepat pada beat. Fokusnya adalah sensasi mengetik yang memuaskan, aliran kata yang natural, musik yang membantu pemain masuk ke *flow state*, dan hadiah emosional berupa kamar yang tumbuh dari pikiran pemain.

### 2.2 Elevator Pitch

**“Type your thoughts. Let your room grow.”**

Pemain mengetik pikiran singkat, mengikuti groove musik dengan ritme yang fleksibel, lalu melihat pikiran itu menjelma menjadi isi kamar. Tidak ada hukuman keras karena salah ketik atau terlambat. Yang dibangun bukan skor tertinggi, melainkan ruang kecil yang terasa makin menjadi milik pemain.

### 2.3 Fantasi Utama Pemain

- “Aku bisa duduk sebentar, mengetik, dan menenangkan pikiran.”
- “Setiap kalimat yang kuselesaikan meninggalkan sesuatu di kamar ini.”
- “Aku tidak sedang dikejar timer atau dibandingkan dengan orang lain.”
- “Kamar ini berubah sesuai suasana dan apa yang kutulis.”
- “Aku boleh bermain beberapa menit, berhenti, lalu kembali tanpa rasa bersalah.”

### 2.4 Genre dan Posisi Produk

Genre utama: **Cozy Typing Rhythm**.  
Lapisan sekunder: **Atmospheric Simulation / Personal Room Evolution**.

Game ini tidak boleh kehilangan identitas typing-nya. Room-building adalah payoff emosional, bukan pengganti gameplay. Rhythm adalah struktur musikal yang memperkaya pengalaman, bukan penghalang bagi pemain yang mengetik lambat.

---

## 3. Visi Produk dan Pilar Desain

### 3.1 Visi

Menciptakan pengalaman mengetik yang terasa seperti ritual kecil untuk merapikan pikiran. Pemain tidak harus menjadi jago mengetik, menyelesaikan tantangan sulit, atau mengejar reward harian. Mereka cukup hadir, mengetik, mendengar musik, dan melihat ruangnya tumbuh.

### 3.2 Empat Pilar Utama

#### Pilar A — Typing Feel Is the Gameplay

Mengetik harus terasa enak sebelum fitur lain ditambahkan. Respons tombol, animasi huruf, progres kata, suara keypress, koreksi kesalahan, dan penyelesaian kalimat harus memiliki kualitas yang konsisten.

Implikasi:
- Input harus langsung terasa responsif.
- Tidak boleh ada lag visual yang membuat teks tertinggal dari input.
- Animasi karakter muncul halus dan tidak mengganggu pembacaan.
- Salah ketik diberi feedback lembut, bukan hukuman.
- Penyelesaian kalimat harus memiliki momen *completion* yang jelas dan memuaskan.

#### Pilar B — Rhythm Without Pressure

Musik memberikan beat, groove, aksen, dan suasana. Pemain dapat menyelaraskan progres mengetik dengan beat untuk bonus rasa dan feedback, tetapi tidak dipaksa memainkan not seperti rhythm game kompetitif.

Implikasi:
- Tidak ada game over karena miss beat.
- Tidak ada reset combo yang menghukum.
- Tidak ada kewajiban menekan satu tombol per beat.
- Timing memberi kualitas bonus, bukan akses ke konten utama.

#### Pilar C — Thoughts Become a Room

Kalimat yang selesai menjadi bagian fisik dari kamar. Perubahan harus terlihat, punya animasi, dan terasa terhubung dengan isi atau mood kalimat.

Implikasi:
- Satu kalimat selesai menghasilkan event progression yang bisa dirasakan.
- Benda muncul otomatis; pemain tidak harus mengatur furnitur pada MVP.
- Objek tidak muncul secara acak tanpa alasan. Pemilihan objek dipengaruhi metadata pikiran dan mood.
- Kamar tumbuh bertahap, bukan berubah total secara mendadak.

#### Pilar D — Atmosphere Responds, Never Punishes

Hujan, embun kaca, cahaya, dan ambience bereaksi terhadap kondisi sesi. Respons atmosfer bertujuan membuat pemain merasa ditemani, bukan memberi tekanan.

Implikasi:
- Hujan dapat melambat atau melembut saat sesi berjalan baik.
- Jendela dapat berembun atau menjadi lebih jernih secara gradual.
- Cahaya kamar dapat menghangat.
- Salah ketik tidak boleh membuat kamar menjadi gelap, rusak, atau kehilangan progres.

### 3.3 Prinsip Desain Pendukung

1. **Cozy, bukan childish:** hangat dan lembut, tetapi tidak harus imut atau penuh warna pastel.
2. **Personal, bukan sosial-kompetitif:** statistik untuk refleksi diri, bukan leaderboard.
3. **Small but polished:** satu kamar dengan interaksi berkualitas lebih penting daripada banyak ruangan dangkal.
4. **Short-session friendly:** sesi singkat tetap terasa lengkap.
5. **No FOMO:** tidak ada streak wajib, energi harian, atau reward yang hilang karena pemain absen.
6. **Readable first:** dekorasi tidak boleh mengalahkan keterbacaan teks.
7. **Offline-first:** pengalaman inti berjalan tanpa login, backend, atau layanan berbayar.

---

## 4. Target Pemain dan Pengalaman yang Dijanjikan

### 4.1 Audiens Utama

Pemain yang menyukai:
- game cozy dan atmosferik;
- lo-fi, ambient, atau musik santai;
- kegiatan mengetik, journaling, atau menulis singkat;
- game yang bisa dimainkan dalam sesi pendek;
- progression visual yang lembut dan personal.

### 4.2 Audiens Sekunder

- pemain yang ingin latihan mengetik tanpa suasana ujian;
- pemain game indie yang menyukai pixel art, diorama, dan room decoration;
- pemain yang mencari pengalaman santai setelah belajar atau bekerja.

### 4.3 Bukan Target Utama

- pemain yang mencari kompetisi WPM tingkat tinggi;
- pemain rhythm game yang mengharapkan chart kompleks dan penilaian presisi tinggi;
- pemain simulator dekorasi yang menginginkan kebebasan menempatkan setiap objek sejak awal;
- pemain multiplayer atau social hub.

### 4.4 Janji Pengalaman

Dalam 30 detik pertama, pemain harus:
1. memahami bahwa game ini tentang mengetik pikiran;
2. merasakan input yang responsif;
3. mendengar atau melihat hubungan antara mengetik dan musik;
4. melihat bahwa menyelesaikan kalimat menghasilkan perubahan pada kamar.

Dalam satu sesi singkat, pemain harus memperoleh payoff yang jelas: beberapa kalimat selesai, beberapa objek muncul atau berubah, atmosfer kamar bereaksi, dan sesi dapat diakhiri dengan tenang.

---

## 5. Platform, Batas Teknis, dan Model Distribusi

### 5.1 Platform Awal

- Prioritas: desktop browser.
- Kontrol utama: keyboard fisik.
- Rasio layar desain: 16:9 sebagai baseline, tetapi layout harus adaptif untuk ukuran jendela lain.
- Mouse digunakan untuk menu, pengaturan, dan navigasi; gameplay inti harus dapat dijalankan dengan keyboard.
- Mobile bukan target MVP. Jangan membuat UI mobile menjadi alasan untuk mengorbankan pengalaman desktop.

### 5.2 Model Operasional

- Single-player.
- Offline-first setelah file game dimuat.
- Tidak perlu akun.
- Tidak memerlukan backend untuk core loop.
- Progress disimpan lokal pada perangkat.
- Tidak mengirim teks Free Thoughts ke server.
- Tidak memasang analytics pihak ketiga pada MVP.

### 5.3 Target Performa

Target desain:
- target ideal: 60 FPS;
- batas pengalaman yang masih dapat diterima: 30 FPS stabil pada perangkat rendah;
- input-to-feedback harus terasa instan;
- audio tidak boleh tersendat saat animasi atau efek visual aktif;
- animasi dekoratif harus dapat dikurangi tanpa merusak gameplay.

Angka minimum spesifikasi perangkat belum dikunci. Hermes harus menguji pada perangkat yang tersedia dan melaporkan hasil nyata, bukan mengarang klaim kompatibilitas.

### 5.4 Prinsip Hemat Resource

- Utamakan 2D/isometric sprite, bukan real-time 3D.
- Hindari dependency besar jika fungsi sederhana dapat dibuat sendiri.
- Hindari Docker, database lokal, atau service tambahan yang tidak diperlukan untuk game web statis.
- Hindari proses build yang berat dan watcher berlebihan.
- Gunakan aset terkompresi dan jumlah partikel yang dibatasi.
- Jangan memuat seluruh aset yang belum dibutuhkan.
- Sediakan fallback visual bila efek tertentu terlalu berat.

### 5.5 Teknologi: Persyaratan, Bukan Keputusan Prematur

GDD ini tidak mengunci engine tertentu. Hermes harus mengevaluasi opsi seperti Vanilla JS + Canvas 2D, Phaser, atau PixiJS berdasarkan kebutuhan game, bukan popularitas.

Kriteria evaluasi:
1. ketepatan timing audio dan kemudahan sinkronisasi;
2. performa pada laptop lama;
3. kualitas rendering pixel art/isometric 2.5D;
4. kemudahan layering, animasi, dan object pooling;
5. ukuran bundle dan kompleksitas dependency;
6. kemudahan debugging dan pemeliharaan;
7. kemudahan menjalankan proyek secara lokal;
8. kemampuan menyimpan progres lokal dan berjalan offline.

Hermes harus memberikan tabel perbandingan singkat, rekomendasi, alasan, serta konsekuensi pilihan. Jangan mengganti engine hanya karena preferensi pribadi.

---

## 6. Dunia, Tema, dan Narasi

### 6.1 Premis Dunia

Kamar adalah representasi ruang batin karakter/pemain. Kita tidak harus menjelaskan secara literal apakah tempat ini nyata, mimpi, ingatan, atau metafora. Ambiguitas ini justru mendukung pengalaman personal.

Pemain mulai dari kamar kecil yang sederhana. Di luar jendela turun hujan. Di dalam kamar, cahaya terasa dingin dan ada banyak ruang kosong. Saat pemain mengetik pikiran, benda-benda mulai hadir dan suasana perlahan berubah.

### 6.2 Pendekatan Narasi

- Tidak ada kebutuhan akan plot panjang pada MVP.
- Tidak ada dialog karakter wajib.
- Tidak perlu cutscene.
- Narasi muncul melalui kalimat yang diketik, pilihan mood, musik, dan benda yang terkumpul.
- Objek boleh punya micro-description pendek, tetapi deskripsi tidak boleh memaksa interpretasi emosional.

### 6.3 Tone

Intim, tenang, sedikit melankolis, hangat, reflektif, dan tidak menggurui.

Hindari:
- dialog motivasi yang terlalu klise;
- narasi yang memaksa pemain merasa bahagia;
- humor yang merusak suasana tanpa tujuan;
- tema trauma atau kesehatan mental yang berat tanpa desain konten dan sensitivitas yang memadai.

### 6.4 Kamar Utama

MVP hanya memiliki satu kamar. Kamar harus terasa cukup hidup melalui variasi pencahayaan, cuaca, animasi, dan objek modular.

Elemen tetap:
- jendela sebagai titik visual utama untuk hujan, embun, dan perubahan langit;
- lantai dan dinding;
- sumber cahaya utama;
- satu area meja atau sudut aktivitas;
- satu atau beberapa slot objek dekoratif;
- ruang negatif yang cukup agar kamar tidak langsung penuh.

Elemen dapat berkembang:
- lampu;
- buku dan tumpukan kertas;
- tanaman;
- cangkir;
- poster/foto;
- bantal atau selimut;
- kucing atau elemen hidup lain;
- ornamen kecil seperti jam, pot, atau pajangan.

Daftar objek final dapat berubah setelah tes visual. Jumlah objek bukan target kuantitas; setiap objek harus terbaca dan punya fungsi atmosfer.

---

## 7. Core Gameplay Loop

### 7.1 Loop Utama

1. Pemain membuka game dan masuk ke kamar.
2. Pemain memilih mode, lagu, atau mood yang tersedia.
3. Musik dan ambience mulai berjalan.
4. Potongan pikiran muncul.
5. Pemain mengetik dengan ritme alami.
6. Sistem memberi feedback per karakter/kata/kalimat.
7. Beat anchor memberi feedback ritmis opsional bila timing cocok.
8. Saat kalimat selesai, kalimat dikonfirmasi dan satu perubahan kamar dipicu.
9. Hujan, jendela, cahaya, dan ambience merespons progres secara gradual.
10. Pemain melanjutkan kalimat atau mengakhiri sesi.
11. Sesi ditutup dengan ritual singkat dan ringkasan personal.
12. Progress tersimpan lokal.

### 7.2 Hierarki Aktivitas

- **Primary action:** mengetik.
- **Primary feedback:** karakter, kata, dan kalimat terasa responsif.
- **Secondary feedback:** musik dan beat memberikan groove.
- **Primary reward:** pikiran menjadi benda/perubahan kamar.
- **Ambient feedback:** hujan, jendela, cahaya, dan suara bereaksi.
- **Long-term reward:** koleksi lagu, mood, benda, dan variasi kamar.

Jangan membalik hierarki ini. Pemain tidak boleh dipaksa mengurus kamar lebih banyak daripada mengetik.

### 7.3 Durasi Sesi

Target desain sesi awal: sekitar 3–8 menit untuk satu rangkaian pendek. Durasi final harus diuji. Pemain dapat keluar kapan saja; tidak boleh kehilangan seluruh progres sesi karena keluar lebih awal.

### 7.4 Session Completion Ritual

Saat pemain menyelesaikan rangkaian atau memilih selesai:
- musik masuk ke bagian penutup atau fade yang halus;
- kamera boleh memberi sedikit fokus pada kamar yang berubah;
- objek terakhir menyelesaikan animasi spawn;
- tampilkan ringkasan kecil: jumlah pikiran selesai, akurasi, WPM opsional, dan objek/perubahan yang baru hadir;
- sediakan tindakan sederhana: lanjut, ulangi, kembali ke kamar.

Ritual ini harus terasa seperti menutup jurnal, bukan layar hasil ujian.

---

## 8. Mode Permainan

Dua mode merupakan bagian dari visi desain: **Guided Thoughts** dan **Free Thoughts**. Keduanya memakai typing engine yang sama agar perilaku input, feedback, dan kualitas audio konsisten.

### 8.1 Guided Thoughts

Mode dengan kalimat yang ditulis dan disusun sebelumnya oleh pembuat game.

Karakteristik:
- kalimat pendek, umumnya 4–8 kata;
- bahasa utama Bahasa Indonesia;
- urutan dan metadata kalimat ditentukan oleh beatmap;
- beberapa kata memiliki beat anchor;
- kalimat terhubung dengan mood dan reward objek;
- pemain dapat menyelesaikan satu kalimat demi satu kalimat.

Tujuan mode:
- memperkenalkan pengalaman utama secara terarah;
- menjaga kualitas tulisan;
- memberi pengalaman ritme yang terkurasi;
- memastikan objek kamar muncul dengan pacing yang baik.

### 8.2 Free Thoughts

Mode mengetik teks pilihan pemain sendiri.

Karakteristik:
- pemain dapat mengetik kalimat atau paragraf pendek;
- tidak ada beatmap kalimat yang harus diikuti;
- musik dan ambience tetap berjalan;
- sistem tetap memberi feedback input dan progres;
- kamar berevolusi menggunakan aturan yang lebih umum, bukan interpretasi semantik AI.

Batas dan keputusan MVP:
- tidak menggunakan AI atau API untuk menganalisis isi tulisan;
- teks Free Thoughts diproses lokal;
- pemain dapat memilih apakah teks disimpan dalam riwayat lokal atau hanya dihitung sebagai aktivitas sesi;
- bila teks disimpan, harus tersedia opsi hapus data;
- sistem reward menggunakan pola input dan pilihan mood yang eksplisit, bukan mengklaim memahami emosi pemain.

### 8.3 Konsistensi Dua Mode

Kedua mode harus berbagi:
- input handler;
- koreksi dan backspace;
- animasi karakter;
- feedback suara tombol;
- statistik dasar;
- event penyelesaian;
- sistem room evolution;
- penyimpanan progres.

Perbedaannya ada di sumber teks dan struktur beatmap, bukan pada dua implementasi typing yang terpisah.

---

## 9. Sistem Typing

### 9.1 Tujuan Sistem

Typing harus terasa seperti aktivitas utama yang menyenangkan. Jangan mendesainnya sebagai tes kecepatan atau ujian akurasi.

### 9.2 Siklus Input

1. Teks target ditampilkan.
2. Pemain menekan tombol.
3. Sistem membaca input secara langsung.
4. Karakter benar ditandai sebagai selesai.
5. Karakter salah mendapat feedback halus dan tidak maju sebagai karakter benar.
6. Pemain dapat memakai Backspace untuk koreksi.
7. Saat seluruh target selesai, sistem mengirim event `thought.completed`.
8. Sistem room evolution dan progression menerima event tersebut.

### 9.3 Aturan Akurasi Default

- Perbandingan huruf sebaiknya case-insensitive pada MVP, kecuali pengujian menunjukkan kapitalisasi penting untuk konten tertentu.
- Spasi dan tanda baca dihitung sebagai bagian teks target pada Guided Thoughts, tetapi kebijakan dapat dibuat per-entry bila diperlukan.
- Normalisasi Unicode harus diperhatikan agar karakter yang terlihat sama tidak gagal karena representasi berbeda.
- Gunakan grapheme-aware iteration, bukan asumsi satu karakter visual selalu sama dengan satu UTF-16 code unit.
- Bahasa Indonesia menjadi prioritas; dukungan karakter Latin umum dan tanda baca dasar wajib.
- Jangan mengandalkan auto-correct atau predictive text browser.
- Spellcheck input harus dinonaktifkan bila mengganggu pengalaman.

### 9.4 Backspace dan Kesalahan

- Backspace harus selalu tersedia saat sesi mengetik aktif.
- Kesalahan tidak mengurangi progres kamar.
- Kesalahan tidak mereset combo karena tidak ada combo hukuman.
- Feedback salah ketik cukup berupa perubahan warna singkat, bunyi lembut, atau getaran visual kecil.
- Hindari shake layar besar, sirene, atau suara error keras.
- Tidak ada jumlah kesalahan maksimum.

### 9.5 Layer Feedback Typing

**Layer 1 — Character feedback**
- karakter yang benar berubah status;
- karakter berikutnya memiliki cursor/caret jelas;
- respons visual langsung;
- animasi huruf singkat dan ringan.

**Layer 2 — Word feedback**
- saat satu kata selesai, berikan micro-confirmation;
- kata boleh memiliki highlight yang memudar;
- pada kata anchor, feedback dapat diselaraskan dengan beat.

**Layer 3 — Sentence feedback**
- saat kalimat selesai, beri konfirmasi yang paling terasa;
- semua karakter target selesai;
- satu animasi penyelesaian kalimat;
- event untuk room evolution;
- suara completion lembut;
- jangan menahan input terlalu lama demi animasi.

### 9.6 Rasa Tombol dan Audio Typing

- Sediakan variasi suara keypress yang lembut dan tidak monoton.
- Volume suara tombol harus dapat diatur terpisah dari musik.
- Suara salah ketik harus lebih rendah intensitasnya daripada suara ketikan normal.
- Tidak boleh semua tombol terdengar seperti mesin tik keras.
- Audio keypress tidak boleh menutupi musik.
- Pada perangkat tanpa audio atau saat mute, feedback visual tetap cukup.

### 9.7 Statistik Typing

Statistik yang boleh dicatat:
- total karakter benar;
- total karakter salah;
- akurasi;
- WPM atau CPM;
- jumlah kalimat selesai;
- durasi sesi;
- jumlah beat anchor yang mendapat Perfect/Good/Flow.

Statistik bersifat informatif dan personal. Jangan menjadikan WPM sebagai pusat UI. Pemain harus bisa menikmati game tanpa melihat statistik.

Rumus dasar yang disarankan:
- `accuracy = correctCharacters / max(1, correctCharacters + incorrectCharacters)`
- `WPM = (correctCharacters / 5) / elapsedMinutes`

Rumus dan definisi karakter harus konsisten di seluruh mode. Untuk Free Thoughts, statistik tidak boleh mengklaim kualitas tulisan atau kondisi mental pemain.

---

## 10. Sistem Rhythm Hybrid

### 10.1 Definisi “Hybrid” untuk Game Ini

Hybrid berarti menggabungkan:
1. **free-flow typing**, yaitu pemain mengetik dengan kecepatan alami tanpa harus menekan tombol pada setiap beat; dan
2. **rhythm landmarks**, yaitu beberapa titik kata/phrase dalam Guided Thoughts memiliki target beat yang memberi feedback tambahan jika pemain menyelesaikannya dekat dengan ketukan musik.

Ini bukan sistem note highway dan bukan sistem satu tombol-satu-beat.

### 10.2 Prinsip Utama

- Musik berjalan sebagai sumber waktu musikal.
- Pemain bebas mengetik; beat anchor tidak mengunci input.
- Timing yang bagus memberi feedback lebih memuaskan, bukan hadiah gameplay wajib.
- Terlambat atau terlalu cepat tidak menghapus progres.
- Semua objek dan kalimat utama tetap bisa diperoleh tanpa Perfect timing.
- Jangan memaksa pemain menunggu sebelum mengetik hanya agar bisa mendapat nilai.

### 10.3 Beatmap Anchor

Satu kalimat dapat memiliki nol, satu, atau beberapa anchor. Anchor idealnya ditempatkan pada akhir kata penting atau akhir potongan frasa, bukan setiap karakter.

Data anchor minimal:
- `wordIndex`: indeks kata yang menjadi checkpoint;
- `targetBeat`: nomor beat atau posisi waktu target;
- `strength`: normal/accent, untuk variasi feedback;
- `optional`: default true.

Ketika pemain menyelesaikan kata anchor, sistem mencatat timestamp completion dan membandingkannya dengan target beat.

### 10.4 Kategori Timing Awal

Nilai awal untuk prototyping:
- **Perfect:** selisih absolut sekitar 100 ms atau kurang;
- **Good:** selisih absolut lebih dari Perfect hingga sekitar 200 ms;
- **Flow:** di luar jendela tersebut atau tidak ada anchor.

Window final harus dapat dikalibrasi terhadap BPM, frame/audio scheduling, dan latensi perangkat. Angka ini adalah starting point, bukan hukum final. Jangan memperlebar atau mempersempit window tanpa playtest.

### 10.5 Dampak Timing

- Perfect: aksen audio/visual paling penuh, misalnya pulse kecil pada kata dan cahaya.
- Good: feedback positif yang lebih ringan.
- Flow: typing tetap berjalan dan tidak menampilkan pesan kegagalan.
- Miss/di luar window tidak mengurangi reward, tidak mengubah mood secara negatif, dan tidak memicu animasi kesalahan.

### 10.6 Adaptasi terhadap Tempo dan Latensi

- Simpan BPM dan offset beatmap per lagu.
- Sediakan pengaturan audio/input offset bila tes menunjukkan diperlukan.
- Audio clock adalah acuan waktu utama; jangan memakai frame render sebagai sumber beat.
- Render boleh tertinggal beberapa frame, tetapi evaluasi beat harus menggunakan timestamp audio yang stabil.
- Hindari timer JavaScript kasar sebagai satu-satunya scheduler musik.

### 10.7 Tidak Ada Hukuman Rhythm

Dilarang pada desain inti:
- game over karena miss;
- combo reset yang dramatis;
- nyawa berkurang;
- objek hilang akibat timing;
- hujan menjadi badai karena gagal;
- lagu berhenti karena pemain lambat.

---

## 11. Sistem Thought Content dan Beatmap

### 11.1 Format Konten

Guided Thoughts memakai kumpulan kalimat yang telah dikurasi. Satu lagu memiliki rangkaian kalimat dengan variasi panjang, mood, dan anchor.

Target MVP:
- 1 lagu;
- 20–30 kalimat pendek;
- sebagian kalimat memiliki anchor;
- 4–8 kata per kalimat sebagai target umum, bukan batas mutlak;
- konten Bahasa Indonesia.

### 11.2 Pedoman Penulisan

Kalimat sebaiknya:
- terdengar natural jika dibaca dalam hati;
- pendek dan mudah dipahami;
- tidak semuanya berupa quote motivasi;
- punya variasi ritme kata;
- bisa berdiri sendiri;
- cocok dengan mood lagu;
- tidak mengandung instruksi gameplay yang membingungkan.

Jenis konten yang dapat dicampur:
- observasi keseharian;
- fragmen ingatan;
- pikiran sederhana;
- suasana hujan atau malam;
- kalimat reflektif;
- detail kecil tentang tempat, benda, atau rutinitas.

### 11.3 Metadata Thought

Setiap kalimat dapat memiliki:
- `id` unik;
- `text`;
- `moodTags`;
- `themeTags`;
- `objectRewardPool`;
- `anchors`;
- `estimatedTypingDifficulty`;
- `sequenceOrder`;
- `completionVariation`.

Metadata adalah arahan desain konten, bukan analisis psikologis pemain.

### 11.4 Hak Cipta Teks dan Musik

- Teks, puisi, dan lirik harus original, public domain, atau memiliki izin/lisensi yang sesuai.
- Jangan memasukkan lirik lagu berhak cipta ke beatmap tanpa izin.
- Musik harus original, berlisensi, atau berasal dari sumber yang izinnya jelas untuk distribusi game.
- Simpan informasi sumber dan ketentuan lisensi setiap aset audio/visual.

---

## 12. Room Evolution — Pikiran Menjadi Benda

### 12.1 Tujuan

Room evolution adalah reward emosional utama. Setiap kalimat yang selesai harus menghasilkan dampak yang terasa, meskipun kecil.

### 12.2 Aturan Dasar

- Objek muncul otomatis setelah kalimat selesai.
- Pemain tidak perlu membuka inventory atau memilih posisi pada MVP.
- Penempatan menggunakan slot/anchor yang sudah dirancang agar kamar tetap komposisional.
- Sistem tidak boleh menaruh objek secara acak hingga saling menutupi.
- Objek duplikat dapat berubah menjadi variasi, upgrade visual, atau detail tambahan.
- Kamar tidak pernah kehilangan objek karena kesalahan typing.

### 12.3 Mapping Thought ke Object

Gunakan metadata yang ditulis oleh pembuat konten:
- `moodTags` mengarahkan keluarga visual;
- `themeTags` mengarahkan object pool;
- `objectRewardPool` menentukan kandidat objek;
- `rarity` atau bobot hanya digunakan untuk variasi kosmetik bila dibutuhkan.

Jangan menggunakan AI/API untuk menebak emosi kalimat pada MVP. Hindari klaim bahwa game memahami kondisi psikologis pemain.

### 12.4 Contoh Mapping

| Tag pikiran | Kandidat objek / perubahan |
|---|---|
| `comfort`, `home` | lampu meja, selimut, bantal |
| `memory`, `nostalgia` | foto, poster, buku lama |
| `nature`, `quiet` | tanaman, pot kecil |
| `night`, `reflection` | lampu hangat, jam, lilin dekoratif |
| `rain`, `observation` | cangkir, buku dekat jendela |
| `companion` | kucing atau elemen hidup kecil |

Ini adalah contoh arah desain, bukan mapping final yang kaku.

### 12.5 Spawn Slots dan Komposisi

- Setiap objek memiliki `slotId` atau aturan posisi.
- Slot menyimpan layer, posisi isometrik, skala, urutan render, dan batas ruang.
- Objek besar tidak boleh menutupi teks gameplay.
- Slot dapat memiliki beberapa variasi objek.
- Bila slot penuh, sistem dapat memilih variasi, menambah detail kecil, atau memperbarui objek yang sudah ada.
- Spawn placement harus deterministik agar reload tidak mengacak kamar.

### 12.6 Animasi Spawn

Urutan dasar:
1. kalimat selesai;
2. feedback completion singkat;
3. objek muncul melalui fade/scale/slide kecil atau animasi khusus;
4. objek settle ke posisi final;
5. suara kecil atau ambience tambahan bila sesuai.

Durasi target awal: sekitar 0,6–1,2 detik, lalu diuji. Animasi harus dapat dipercepat atau dikurangi dalam pengaturan motion.

### 12.7 Tahapan Evolusi Kamar

Progress tidak harus berupa level linear. Gunakan kombinasi:
- objek baru;
- variasi objek;
- perubahan cahaya;
- detail jendela;
- ambient animation;
- detail hidup seperti tanaman bergerak atau kucing tidur.

Kamar harus tetap punya ruang kosong dan komposisi yang rapi. “Lebih banyak” tidak selalu berarti “lebih baik”.

---

## 13. Atmosphere System — Hujan, Jendela, dan Cahaya

### 13.1 Variabel Atmosfer

Parameter awal yang dapat dikontrol:
- `rainIntensity`;
- `windowFog`;
- `warmth`;
- `ambientBrightness`;
- `particleDensity`;
- `roomGlow`;
- `outsideBrightness`.

Nama dan rentang teknis boleh berubah, tetapi tanggung jawab setiap parameter harus jelas.

### 13.2 Perilaku Hujan

- Hujan adalah ambience, bukan ancaman.
- Intensitas dapat bergerak perlahan mengikuti mood lagu, progres sesi, atau transisi antar bagian musik.
- Hujan tidak harus selalu berhenti saat pemain berhasil.
- Perubahan harus gradual, tidak melonjak pada setiap karakter.
- Pengaturan dapat mematikan atau mengurangi partikel hujan.

### 13.3 Embun Kaca

- Jendela dapat memiliki lapisan embun/fog.
- Fog dapat berubah secara lembut sepanjang sesi.
- Efek visual tidak boleh mengaburkan teks input.
- Hindari membuat pemain harus menghapus embun sebagai tugas gameplay pada MVP.

### 13.4 Cahaya dan Kehangatan

- Cahaya ruangan dapat meningkat sedikit ketika objek tertentu muncul atau progres mencapai milestone.
- Perubahan warna tidak harus selalu menuju kuning; mood dreamy/nostalgic dapat memberi nuansa berbeda.
- Gunakan perubahan yang lembut agar tidak terasa sebagai sistem moral “baik/buruk”.

### 13.5 Hubungan dengan Typing

- Kesalahan tidak membuat atmosfer memburuk.
- Perfect/Good anchor boleh memicu pulse kecil, bukan perubahan besar.
- Penyelesaian kalimat dapat menambah variasi ambient.
- Tidak perlu mengikat setiap input ke partikel atau animasi besar; ini berisiko mengganggu fokus dan performa.

---

## 14. Mood dan Musik

### 14.1 Mood Profiles

Mood awal yang diusulkan:

**Rainy / Melancholic**
- hujan terlihat jelas;
- cahaya lebih dingin;
- musik lembut dan sedikit sendu;
- objek cenderung berupa buku, cangkir, foto, atau lampu.

**Warm / Comfort**
- cahaya lebih hangat;
- ambience terasa lebih intim;
- musik lebih lembut dan stabil;
- objek cenderung berupa selimut, lampu, tanaman, atau benda rumah.

**Dreamy / Nostalgic**
- warna sedikit berkabut;
- gerak visual lambat;
- musik lebih mengambang;
- objek cenderung berupa poster, foto, ornamen, dan detail memori.

**Quiet / Reflective**
- visual minimal;
- lebih banyak ruang negatif;
- musik sederhana;
- objek sedikit tetapi bermakna.

Mood adalah preset atmosfer dan konten, bukan label emosi pemain.

### 14.2 Musik

MVP memiliki satu lagu yang dipilih karena:
- cocok untuk mengetik dalam tempo santai;
- groove cukup jelas untuk anchor;
- tidak terlalu ramai;
- loop tidak terasa patah;
- hak pakainya jelas.

### 14.3 Sinkronisasi Musik

- Audio system menjadi sumber waktu musikal.
- Simpan BPM, time signature bila dibutuhkan, beat offset, dan loop points.
- Musik harus dapat fade in/out dengan halus.
- Hindari restart lagu mendadak ketika pemain menyelesaikan kalimat.
- Bila browser belum mengizinkan audio autoplay, mulai audio setelah interaksi pengguna yang sah.

### 14.4 Audio Layers

Layer audio yang dapat dipisah:
1. musik utama;
2. hujan/ambience luar;
3. suara typing;
4. feedback kata/anchor;
5. completion sound;
6. ambience objek tertentu.

Semua layer harus memiliki volume terpisah di pengaturan. Hindari banyak layer yang membuat audio muddy.

---

## 15. Art Direction dan Visual Language

### 15.1 Gaya Visual

- Pixel art dengan komposisi isometrik.
- 2.5D melalui sprite, layering, parallax terbatas, dan pencahayaan sederhana.
- Kesan diorama kecil yang hangat.
- Detail cukup kaya untuk terasa hidup, tetapi tidak terlalu ramai.
- Referensi rasa: diorama cozy seperti Tiny Glade, progres dekorasi yang terasa seperti Unpacking, dan eksplorasi suasana game indie cozy. Referensi hanya untuk prinsip, bukan menyalin aset, karakter, layout, atau identitas visual.

### 15.2 Kamera dan Perspektif

- Kamera fixed pada MVP.
- Sudut isometrik konsisten.
- Tidak perlu free camera atau rotasi.
- Zoom boleh tersedia sebagai aksesibilitas jika tidak merusak pixel grid.
- Komposisi ruangan harus tetap terbaca pada beberapa ukuran jendela.

### 15.3 Layer Visual

Urutan layer dapat mencakup:
1. background luar jendela;
2. hujan luar;
3. jendela dan fog;
4. dinding belakang;
5. dekorasi dinding;
6. furniture belakang;
7. lantai;
8. furniture depan;
9. objek kecil;
10. karakter/elemen hidup;
11. cahaya dan partikel foreground.

Urutan final bergantung pada perspektif aset. Gunakan sorting yang konsisten untuk mencegah objek terlihat menembus layer lain.

### 15.4 Pixel Art Rules

- Tentukan internal resolution dan skala sprite sebelum produksi massal.
- Gunakan palette yang konsisten untuk setiap mood.
- Hindari blur akibat fractional scaling bila pixel crisp adalah target.
- Animasi memiliki jumlah frame secukupnya; jangan membuat semua elemen bergerak.
- Tetapkan naming convention, pivot point, dan ukuran canvas aset.
- Sprite harus diuji di dalam scene, bukan hanya dilihat terpisah.

### 15.5 UI dan Gameplay Readability

- Teks yang sedang diketik menjadi fokus visual utama.
- Kamar menjadi latar dan reward.
- Teks tidak boleh menutupi objek penting secara tidak sengaja.
- Hindari UI besar yang terasa seperti dashboard statistik.
- Kontras karakter selesai, karakter berikutnya, dan karakter salah harus dapat dibedakan tanpa mengandalkan warna saja.

---

## 16. UI / UX dan Navigasi

### 16.1 Alur Menu

Flow dasar:

`Title / Start → Room Hub → Mode & Mood / Song Selection → Gameplay → Session Summary → Room Hub`

Untuk MVP, pemilihan lagu dapat sangat sederhana karena baru ada satu lagu.

### 16.2 Title Screen

Elemen:
- nama game (working title);
- tombol Continue / Start;
- Settings;
- Credits;
- visual kamar sebagai preview.

Jangan menambah toko, profil online, leaderboard, atau menu sosial.

### 16.3 Room Hub

- Menampilkan kamar saat ini.
- Menampilkan pilihan untuk mulai sesi.
- Memperlihatkan progress koleksi secara halus.
- Menjadi tempat pemain menikmati perubahan kamar tanpa harus mengetik.
- Tidak wajib ada mode edit furniture pada MVP.

### 16.4 Gameplay Screen

Hierarki tampilan:
1. teks target dan area mengetik;
2. indikator progres kalimat yang ringan;
3. kamar isometrik;
4. informasi lagu/mood sederhana;
5. kontrol pause/settings yang tidak mengganggu.

Elemen opsional:
- beat pulse visual kecil;
- indikator anchor;
- waktu sesi, bila diperlukan.

Jangan memenuhi layar dengan combo, score multiplier, timer besar, atau ranking.

### 16.5 Session Summary

Tampilkan:
- jumlah kalimat selesai;
- jumlah objek/perubahan kamar baru;
- durasi;
- akurasi dan WPM secara opsional;
- highlight kecil dari sesi.

Bahasa UI sebaiknya hangat tetapi tidak berlebihan. Hindari kata-kata yang menghakimi seperti “gagal”, “buruk”, atau “kalah”.

### 16.6 Pause Menu

- Resume;
- Restart session (dengan konfirmasi bila progress sementara akan hilang);
- Audio settings;
- Accessibility;
- Exit to room.

Jika mungkin, simpan progres kalimat yang telah selesai sebelum pemain keluar. Jangan menghapus permanen perubahan kamar yang sudah dikonfirmasi.

### 16.7 Settings

Minimal:
- Master volume;
- Music volume;
- Rain/ambience volume;
- Typing SFX volume;
- UI/feedback SFX volume;
- Reduce motion;
- Reduce particles;
- Toggle screen pulse;
- Text size;
- Typing sound on/off;
- Audio offset/calibration jika diperlukan;
- Clear local data;
- Credits/licenses.

---

## 17. Accessibility dan Kenyamanan

- Tidak ada flashing cepat atau strobe.
- Sediakan reduce motion.
- Sediakan reduce particles.
- Sediakan opsi mematikan screen pulse.
- Volume setiap kategori audio dapat diatur terpisah.
- Feedback typing harus tetap terbaca dalam grayscale atau bagi pemain yang sulit membedakan warna.
- Ukuran teks harus dapat diperbesar.
- Jangan menyampaikan informasi gameplay penting hanya lewat audio.
- Pause harus mudah dijangkau.
- Hindari batas waktu wajib.
- Tidak ada penalti karena berhenti sejenak.

---

## 18. Progression, Koleksi, dan Retention

### 18.1 Progression Philosophy

Progression harus mengundang pemain kembali karena mereka ingin melihat kamar dan koleksinya, bukan karena takut kehilangan streak.

### 18.2 Bentuk Progression

1. **Room collection:** objek yang telah hadir di kamar.
2. **Mood collection:** mood yang sudah pernah dimainkan.
3. **Song collection:** lagu yang tersedia ketika konten baru ditambahkan.
4. **Personal history:** statistik dan sesi lokal jika pemain mengaktifkannya.
5. **Visual evolution:** variasi objek, cahaya, tanaman, atau detail kamar.

### 18.3 MVP Progression

- Satu kamar.
- Satu lagu.
- Satu beatmap.
- 5–8 objek utama atau variasi yang cukup untuk menguji sistem spawn.
- Progress lokal persisten.
- Tidak ada unlock ekonomi atau toko.

### 18.4 Hal yang Tidak Digunakan

- daily login reward;
- streak yang reset;
- energi atau stamina;
- timer yang memaksa sesi selesai;
- reward berbayar;
- loot box/gacha;
- leaderboard kompetitif;
- notifikasi yang memancing rasa bersalah.

### 18.5 Replay Value

Replay berasal dari:
- menyelesaikan sesi dengan mood berbeda;
- mendengar lagu sambil melihat kamar yang berkembang;
- mencoba Free Thoughts;
- melihat variasi objek dan ambience;
- memantau statistik pribadi tanpa tekanan.

---

## 19. Save System dan Privasi

### 19.1 Data yang Disimpan

Minimal:
- versi schema save;
- objek yang sudah terbuka/terpasang;
- variasi objek;
- mood atau lagu yang sudah tersedia;
- pengaturan audio dan aksesibilitas;
- statistik agregat;
- sesi terakhir bila diperlukan.

### 19.2 Free Thoughts Privacy

- Teks bebas adalah data personal.
- Jangan mengirim teks ke server.
- Default aman: teks yang diketik tidak disimpan sebagai jurnal permanen kecuali pemain memilihnya.
- Bila ada penyimpanan teks, sediakan hapus dan ekspor yang jelas.
- Jangan menganalisis tulisan untuk menyimpulkan kesehatan mental, kepribadian, atau emosi pemain.

### 19.3 Storage

Gunakan storage browser yang sesuai dengan volume data. LocalStorage cukup untuk pengaturan dan save kecil; IndexedDB dapat dipilih jika kebutuhan aset/progress bertambah. Hermes harus menghindari kompleksitas yang tidak diperlukan.

### 19.4 Save Safety

- Save memiliki versi schema.
- Perubahan schema memiliki migrasi atau fallback.
- Jangan menimpa save valid dengan data kosong karena error parsing.
- Simpan secara periodik pada momen aman dan setelah milestone.
- Sediakan reset lokal dengan konfirmasi.

---

## 20. Technical Design Requirements

Bagian ini mendefinisikan kontrak teknis, bukan memaksakan satu engine.

### 20.1 Sistem/Modul Logis

Implementasi sebaiknya memisahkan tanggung jawab berikut:

1. **App Shell:** bootstrap, lifecycle, routing screen.
2. **Input / Typing Engine:** keyboard capture, normalization, cursor, correctness, backspace.
3. **Text Content:** guided thoughts, free thoughts, metadata, content validation.
4. **Rhythm / Beatmap:** BPM, beat clock, anchors, timing grades, offset.
5. **Audio Manager:** music, loops, SFX, volume categories, audio unlock.
6. **Room State:** objek, slot, placement, variants, persistent state.
7. **Room Renderer:** isometric scene, layers, sorting, animation.
8. **Atmosphere Controller:** rain, fog, light, particles, transitions.
9. **Progression:** completion events, unlocks, milestones, session summary.
10. **Save Manager:** schema version, persistence, migration, reset.
11. **UI / Accessibility:** menus, settings, text sizing, reduced effects.
12. **Debug / QA Tools:** beat visualization, timing logs, performance overlay, content validator.

Modul boleh digabung bila proyek kecil dan pilihan itu mengurangi kompleksitas. Namun, tanggung jawab logis harus tetap jelas. Hindari satu file raksasa yang mengelola semua state.

### 20.2 Event-Driven Flow

Event yang disarankan:
- `session.started`;
- `session.paused`;
- `session.resumed`;
- `session.completed`;
- `thought.started`;
- `typing.characterCorrect`;
- `typing.characterIncorrect`;
- `typing.wordCompleted`;
- `typing.anchorEvaluated`;
- `thought.completed`;
- `room.objectSpawnRequested`;
- `room.objectSpawned`;
- `atmosphere.changed`;
- `save.requested`;
- `save.completed`.

Jangan membuat event bus kompleks tanpa kebutuhan. Event names di atas adalah kontrak konseptual; implementasi dapat memakai callback sederhana atau state transitions.

### 20.3 Timing Architecture

- Audio clock menjadi sumber waktu musik.
- Beat scheduler menjadwalkan event audio ke depan dengan buffer yang cukup.
- Renderer membaca state dan timestamp untuk menampilkan pulse/animasi.
- Input handler mencatat timestamp ketika kata anchor selesai.
- Timing evaluator membandingkan timestamp tersebut dengan target beat.
- Jangan mengevaluasi rhythm dari jumlah frame.
- Jangan menggunakan `setInterval` sebagai satu-satunya jam musik.
- Render frame drop tidak boleh mengubah hasil penilaian timing.

### 20.4 Determinism

Untuk debugging dan reproducibility:
- pilihan objek berdasarkan seed atau aturan deterministik;
- state room disimpan eksplisit;
- hasil spawn tidak bergantung pada frame rate;
- hindari nilai acak yang membuat save berbeda setelah reload kecuali seed disimpan;
- hindari `Date.now()` dan random yang tidak terkendali untuk menentukan beat/timing gameplay.

Waktu nyata tetap boleh digunakan untuk timestamp sesi atau metadata save, tetapi bukan untuk menggantikan audio clock.

### 20.5 Rendering

- Canvas 2D atau renderer lain boleh dipakai sesuai hasil evaluasi.
- Pisahkan scene static dan dynamic bila menguntungkan.
- Gunakan sprite atlas bila mengurangi overhead tanpa mengorbankan workflow.
- Batasi particle count.
- Gunakan object pooling bila profiling menunjukkan manfaat.
- Pixel art perlu scaling yang konsisten.
- Hindari melakukan layout atau alokasi objek berat setiap frame.

### 20.6 Input Handling Requirements

- Jangan sampai keyboard shortcut browser mengganggu typing area.
- Tangani Backspace dan Enter sesuai mode.
- Hindari menerima shortcut global saat pemain sedang mengetik.
- Tangani composition/IME event dengan benar agar input tidak terduplikasi.
- Fokus typing area harus dipulihkan secara aman.
- Jangan memproses satu key event dua kali.

### 20.7 Audio Requirements

- Tangani browser autoplay restrictions.
- Sediakan tombol/interaksi awal untuk mengaktifkan audio.
- Hindari memory leak dari node/audio source yang dibuat berulang.
- Fade dan loop harus diuji pada browser target.
- Perubahan tab atau suspend/resume harus ditangani dengan aman.

### 20.8 Error Handling

- Bila audio gagal, game tetap bisa dimainkan dengan visual beat fallback atau tanpa penilaian rhythm.
- Bila save gagal, pemain diberi pesan yang jelas dan sesi aktif tidak crash.
- Bila aset gagal dimuat, gunakan placeholder/fallback.
- Error debug tidak boleh membanjiri UI pemain.

---

## 21. Struktur Data Konseptual

Contoh berikut adalah ilustrasi schema. Nama field dan tipe dapat disesuaikan oleh Hermes, tetapi semantik harus dipertahankan.

### 21.1 Song

```json
{
  "id": "song_lofi_01",
  "title": "Rain on the Window",
  "artist": "Original / Licensed Artist",
  "audioAsset": "assets/audio/rain-on-window.ogg",
  "bpm": 78,
  "beatsPerBar": 4,
  "beatOffsetMs": 0,
  "loopStartMs": 0,
  "loopEndMs": null,
  "moodProfileId": "rainy_melancholic",
  "beatmapId": "beatmap_01"
}
```

### 21.2 Thought Entry

```json
{
  "id": "thought_001",
  "text": "Hujan selalu punya cara pulang",
  "moodTags": ["rainy", "reflective"],
  "themeTags": ["rain", "home"],
  "objectRewardPool": ["desk_lamp", "warm_mug"],
  "anchors": [
    { "wordIndex": 3, "targetBeat": 12, "strength": "accent", "optional": true }
  ],
  "difficulty": "easy",
  "sequenceOrder": 1
}
```

### 21.3 Room Object Definition

```json
{
  "id": "desk_lamp",
  "displayName": "Desk Lamp",
  "assetId": "room/objects/desk_lamp",
  "allowedSlots": ["desk_left", "side_table"],
  "renderLayer": "furniture_front",
  "variants": ["off", "warm_on"],
  "spawnAnimation": "soft_reveal",
  "moodAffinity": ["warm", "quiet", "reflective"]
}
```

### 21.4 Room State

```json
{
  "roomId": "main_room",
  "seed": 1042,
  "objects": [
    {
      "objectId": "desk_lamp",
      "slotId": "desk_left",
      "variantId": "warm_on",
      "unlockOrder": 1
    }
  ],
  "evolutionStage": 1,
  "atmosphere": {
    "rainIntensity": 0.8,
    "windowFog": 0.5,
    "warmth": 0.2,
    "ambientBrightness": 0.45
  }
}
```

### 21.5 Save Data

```json
{
  "schemaVersion": 1,
  "createdAt": "ISO-8601 timestamp",
  "updatedAt": "ISO-8601 timestamp",
  "settings": {
    "masterVolume": 0.8,
    "musicVolume": 0.65,
    "ambienceVolume": 0.5,
    "typingSfxVolume": 0.45,
    "reduceMotion": false,
    "reduceParticles": false
  },
  "roomState": {},
  "unlocks": {
    "songs": ["song_lofi_01"],
    "moods": ["rainy_melancholic"]
  },
  "stats": {
    "sessionsCompleted": 0,
    "thoughtsCompleted": 0,
    "totalCorrectCharacters": 0,
    "totalIncorrectCharacters": 0
  },
  "privacy": {
    "saveFreeThoughtText": false
  }
}
```

Jangan memasukkan teks Free Thoughts ke save kecuali `saveFreeThoughtText` secara eksplisit diaktifkan oleh pemain.

---

## 22. Scope MVP

### 22.1 Tujuan MVP

Membuktikan empat hal, bukan membangun game penuh:
1. mengetik terasa enak dan responsif;
2. rhythm hybrid menambah rasa tanpa memberi tekanan;
3. kalimat selesai menghasilkan reward kamar yang jelas;
4. atmosfer hujan/cahaya membuat sesi terasa menyatu.

### 22.2 Konten MVP

- 1 kamar isometrik.
- 1 lagu original/berlisensi.
- 1 beatmap.
- 20–30 kalimat Guided Thoughts.
- Free Thoughts versi sederhana.
- 5–8 objek atau variasi objek utama.
- 1 mood utama dengan parameter atmosfer yang cukup kaya; mood lain dapat menjadi variasi parameter jika tidak menambah scope berlebihan.
- Statistik dasar.
- Save lokal.

### 22.3 Fitur Wajib MVP

- Title/start screen sederhana.
- Room hub.
- Guided Thoughts.
- Free Thoughts.
- Typing engine dengan backspace dan feedback.
- Beat anchor dan kategori Perfect/Good/Flow.
- Audio manager dan volume settings.
- Room object spawning otomatis.
- Rain/window/light response.
- Session summary.
- Local save dan reset data.
- Reduce motion/particles.

### 22.4 Tidak Termasuk MVP

- multiplayer;
- leaderboard;
- akun/cloud sync;
- backend;
- in-game shop atau monetisasi;
- banyak ruangan;
- editor tata letak furnitur;
- user-generated beatmap;
- AI semantic analysis;
- story campaign panjang;
- karakter yang dapat dikendalikan;
- mobile-first controls;
- achievements kompleks;
- sistem ekonomi;
- modding platform.

Fitur di luar MVP tidak boleh diam-diam masuk ke sprint awal.

---

## 23. Vertical Slice dan Tahapan Produksi

### Phase 0 — Project Separation & Audit

Hasil:
- workspace/repository baru direkomendasikan atau disiapkan secara terpisah;
- arsip Typing Fever terkonfirmasi tidak disentuh;
- inventaris pelajaran dari prototype lama;
- evaluasi stack teknis;
- keputusan awal asset pipeline;
- daftar risiko dan pertanyaan TBD.

Exit criteria:
- tidak ada perubahan pada arsip;
- batas project jelas;
- stack direkomendasikan dengan alasan;
- tidak ada dependency wajib dari prototype lama.

### Phase 1 — Typing Feel Prototype

Bangun hanya:
- satu layar;
- satu kalimat;
- input karakter;
- correct/incorrect state;
- backspace;
- word/sentence completion;
- keypress SFX sederhana;
- animasi karakter.

Exit criteria:
- input terasa langsung;
- tidak ada duplikasi input;
- backspace benar;
- kalimat selesai konsisten;
- pengalaman terasa enak setelah tes manual.

### Phase 2 — Rhythm Hybrid Prototype

Bangun:
- satu lagu;
- BPM dan beat clock;
- satu atau beberapa anchor;
- timing evaluation;
- audio/visual pulse;
- offset calibration sederhana jika diperlukan.

Exit criteria:
- penilaian tidak berubah akibat frame drop;
- pemain tetap bisa mengetik bebas;
- tidak ada penalti miss;
- rhythm memberi rasa tambahan, bukan gangguan.

### Phase 3 — Room Evolution Prototype

Bangun:
- satu kamar statis;
- 3–5 objek;
- spawn slots;
- object reward mapping;
- completion animation;
- save room state.

Exit criteria:
- kalimat selesai menghasilkan perubahan yang terlihat;
- objek tidak overlap buruk;
- hasil tetap sama setelah reload;
- komposisi kamar tetap enak dilihat.

### Phase 4 — Atmosphere Prototype

Bangun:
- hujan;
- fog jendela;
- warmth/light;
- transisi atmosfer;
- pengaturan reduce motion/particles.

Exit criteria:
- atmosfer merespons tanpa menghukum;
- efek tidak mengganggu input;
- performa tetap stabil.

### Phase 5 — Vertical Slice Lengkap

Gabungkan:
- menu minimal;
- Guided Thoughts;
- Free Thoughts;
- satu lagu;
- satu beatmap;
- satu kamar;
- objek;
- atmosfer;
- summary;
- save lokal.

Exit criteria:
- satu sesi dapat dimainkan dari awal sampai akhir tanpa blocker;
- semua core loop berfungsi;
- save/load aman;
- tidak ada bug kritis pada browser target.

### Phase 6 — Content & Polish

- tambah/kurasi kalimat hingga 20–30;
- poles audio typing;
- poles animasi spawn;
- balance pacing object;
- tuning timing window;
- perbaiki UI;
- uji aksesibilitas;
- uji performa pada laptop lama.

---

## 24. QA, Playtesting, dan Success Metrics

### 24.1 Prinsip Pengujian

Jangan mengklaim game menyenangkan hanya karena kode berjalan. Core loop membutuhkan playtest manusia. Metrik awal di bawah adalah target eksperimen, bukan benchmark industri.

### 24.2 Functional QA

Periksa:
- input karakter benar;
- input salah;
- Backspace;
- spasi dan punctuation;
- Unicode normalization;
- IME/composition;
- Enter dan pause;
- audio unlock;
- beat anchor timing;
- kalimat selesai;
- object spawn;
- save/load;
- reset data;
- tab suspend/resume;
- reduce motion;
- error asset/audio.

### 24.3 Usability Playtest

Tanyakan kepada pemain:
- Apakah mereka langsung paham cara bermain?
- Apakah mengetik terasa nyaman?
- Apakah timing rhythm terasa membantu atau justru menekan?
- Apakah feedback kesalahan terlalu mengganggu?
- Apakah kemunculan objek terasa memuaskan?
- Apakah perubahan kamar terasa terhubung dengan kalimat?
- Apakah mereka ingin memainkan satu sesi lagi?

### 24.4 Target Awal untuk Prototype

Angka berikut hanya hipotesis untuk membantu evaluasi:
- mayoritas tester memahami loop inti tanpa penjelasan panjang;
- setidaknya 80% sesi tes dapat diselesaikan tanpa blocker;
- skor rasa mengetik rata-rata minimal 4/5 dari tester kecil;
- sekurangnya separuh tester bersedia mencoba satu sesi ulang;
- tidak ada laporan bahwa rhythm membuat pemain merasa dihukum.

Jangan memanipulasi hasil untuk mencapai target. Bila target tidak tercapai, identifikasi penyebab dan lakukan iterasi.

### 24.5 Performance QA

- ukur FPS pada scene kosong dan scene penuh;
- ukur ukuran bundle dan aset;
- periksa penggunaan memori setelah sesi panjang;
- periksa audio glitch;
- uji laptop lama yang tersedia;
- uji beberapa ukuran viewport;
- matikan efek dekoratif untuk melihat fallback.

### 24.6 Bug Severity

**Blocker:** game tidak dapat dimulai/diselesaikan, input hilang, save korup, audio membuat browser crash.  
**Critical:** typing salah, rhythm clock tidak stabil, object spawn menghapus progres, data Free Thoughts tersimpan tanpa izin.  
**Major:** UI overlap, audio tidak dapat diatur, performa sangat buruk.  
**Minor:** animasi kecil, spacing, visual detail.

---

## 25. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Rhythm terlalu ketat | Game terasa seperti ujian | Anchor hanya pada kata/phrase, no penalty, playtest window |
| Typing feel biasa saja | Core game tidak menarik | Prioritaskan prototype typing sebelum room art besar |
| Room evolution terasa acak | Reward emosional lemah | Metadata konten, object pools, slot komposisi deterministik |
| Room terlalu ramai | Keterbacaan dan estetika turun | Batas slot, variants, ruang negatif |
| Audio timing tidak stabil | Rhythm terasa tidak adil | Audio clock sebagai sumber waktu, offset calibration |
| Scope creep | Prototype tidak selesai | Kunci MVP dan daftar out-of-scope |
| Laptop development lambat | Iterasi lambat | Toolchain ringan, aset kecil, hindari service lokal berat |
| Hak cipta aset tidak jelas | Risiko distribusi | Original/licensed assets dan catatan lisensi |
| Free Thoughts terlalu sensitif | Privasi pengguna terganggu | Local-only, no default text storage, clear-data control |
| Reuse prototype lama terlalu jauh | Identitas baru kabur | Arsip read-only, reuse selektif dan beralasan |

---

## 26. Keputusan yang Sudah Dikunci dan yang Masih Terbuka

### 26.1 Keputusan yang Sudah Dikunci oleh Pemilik Proyek

1. **Rhythm:** hybrid — typing tetap natural, rhythm memberi struktur/bonus timing.
2. **Room progression:** evolving — objek muncul otomatis dari kalimat yang selesai.
3. **Typing content:** mixed — Guided Thoughts dengan beatmap dan Free Thoughts.
4. **Arah visual:** pixel-art isometric 2.5D, diorama kamar yang cozy.
5. **Atmosfer utama:** hujan, embun jendela, dan perubahan kehangatan cahaya.
6. **Identitas proyek:** game baru yang dapat berbeda secara signifikan dari Typing Fever Prototype.
7. **Status proyek lama:** Typing Fever Prototype tetap public archive dan read-only reference.

### 26.2 Asumsi Desain untuk MVP

- Desktop browser menjadi platform pertama.
- Bahasa konten utama Bahasa Indonesia.
- Single-player dan offline-first.
- Satu kamar dan satu lagu cukup untuk vertical slice.
- Tidak ada backend atau AI pada core loop.
- Tidak ada monetisasi pada MVP.

### 26.3 Belum Final / TBD

- Judul final game.
- Nama karakter (jika nanti memang perlu karakter).
- Engine/framework final.
- Resolusi internal dan ukuran grid pixel art.
- BPM final dan komposisi musik.
- Desain final room layout.
- Daftar kalimat final.
- Apakah Free Thoughts memiliki riwayat teks yang bisa disimpan secara opsional.
- Apakah pemain dapat memilih mood secara bebas pada MVP atau mood dibuka bertahap.
- Jumlah dan aturan akhir slot objek.
- Model distribusi setelah prototype.

Hermes boleh memberi rekomendasi untuk item TBD, tetapi jangan memperlakukan rekomendasi itu sebagai keputusan final pemilik proyek.

---

## 27. Definition of Done untuk Vertical Slice

Vertical slice dinyatakan selesai hanya jika:

1. Game dapat dibuka pada browser desktop target.
2. Pemain dapat masuk ke kamar dan memulai sesi.
3. Guided Thoughts dapat dimainkan sampai selesai.
4. Free Thoughts dapat menerima input custom.
5. Typing engine mendukung koreksi dan feedback tanpa input ganda.
6. Rhythm hybrid mengukur anchor dari clock audio, bukan frame render.
7. Miss timing tidak mengurangi progres.
8. Setiap thought completion memicu perubahan kamar yang terlihat.
9. Objek tidak muncul pada posisi yang merusak komposisi.
10. Hujan, fog, dan cahaya berubah secara halus.
11. Volume audio dan opsi reduce motion bekerja.
12. Progress kamar tersimpan dan tetap ada setelah reload.
13. Teks Free Thoughts tidak disimpan tanpa pilihan eksplisit pemain.
14. Sesi dapat dijeda dan diakhiri tanpa crash.
15. Arsip Typing Fever tidak berubah.
16. README menjelaskan cara menjalankan proyek, struktur folder, kontrol, dan status fitur.
17. Daftar known issues dan hasil QA disertakan.

---

## 28. Instruksi Kerja untuk Hermes Agent

Bagian ini adalah mandat implementasi. Hermes harus mengikuti urutan kerja berikut.

### 28.1 Sebelum Bekerja

1. Baca seluruh GDD ini.
2. Konfirmasi pemahaman dengan merangkum core loop dan empat pilar desain dalam bahasamu sendiri.
3. Identifikasi workspace/repository game baru. Jangan mengasumsikan repository Typing Fever adalah target kerja.
4. Pastikan Typing Fever Prototype diperlakukan read-only.
5. Jika lokasi proyek baru belum jelas, cari workspace yang memang ditentukan pemilik proyek. Jangan mengubah repository arsip sebagai jalan pintas.
6. Audit kondisi folder dan file sebelum menulis apa pun.

### 28.2 Deliverable Pertama — Tanpa Perubahan Destruktif

Sebelum implementasi besar, keluarkan laporan yang berisi:
- pemahaman desain game;
- pemisahan proyek baru vs Typing Fever archive;
- audit workspace yang tersedia;
- rekomendasi engine/framework berdasarkan kriteria GDD;
- struktur folder yang diusulkan;
- arsitektur modul;
- rencana audio clock dan beatmap;
- rencana typing engine;
- rencana room evolution dan object placement;
- asset pipeline yang paling ringan;
- milestone implementasi;
- risiko teknis dan pertanyaan TBD.

Jangan mulai refactor atau memindahkan file lama. Jika project baru sudah jelas dan tindakan yang diusulkan non-destruktif, Hermes boleh menyiapkan prototype kecil setelah menyampaikan rencana sesuai arahan pemilik proyek.

### 28.3 Urutan Implementasi Wajib

Prioritaskan urutan ini:
1. Typing feel prototype.
2. Rhythm hybrid prototype.
3. Room evolution prototype.
4. Atmosphere prototype.
5. Vertical slice gabungan.
6. Konten dan polish.

Jangan membuat banyak aset final sebelum typing dan rhythm terbukti menyenangkan.

### 28.4 Aturan Implementasi

- Jangan menambah fitur out-of-scope tanpa alasan dan persetujuan.
- Jangan menambah dependency yang tidak jelas manfaatnya.
- Jangan membuat backend, akun, database server, atau integrasi AI untuk core loop.
- Jangan mengirim teks Free Thoughts keluar perangkat.
- Jangan mengunci desain pada arsitektur lama.
- Jangan menulis ulang file besar jika perubahan kecil cukup.
- Jangan menutupi bug dengan placeholder yang membuat status fitur terlihat selesai.
- Setiap milestone harus punya cara uji dan acceptance criteria.
- Gunakan nama variabel dan fungsi yang jelas.
- Catat keputusan teknis yang berdampak pada desain.
- Bila menyimpang dari GDD, jelaskan apa yang berubah, mengapa, dan dampaknya.

### 28.5 Cara Melaporkan Progress

Setiap laporan progress harus memisahkan:
- **Done:** benar-benar selesai dan diuji;
- **In progress:** sudah dimulai tetapi belum selesai;
- **Blocked:** menunggu keputusan atau kendala;
- **Not started:** belum dikerjakan;
- **Evidence:** file, test, screenshot, atau langkah reproduksi.

Jangan menyatakan “berhasil” hanya karena file berhasil dibuat. Fitur harus dijalankan dan diuji.

### 28.6 Hal yang Dilarang

- Mengubah atau menghapus public archive Typing Fever.
- Memindahkan project lama ke project baru tanpa izin.
- Menganggap KOKI, coffee-shop progression, Fever, atau old UI sebagai fitur wajib.
- Menambahkan multiplayer, leaderboard, shop, cloud sync, atau AI semantic analysis ke MVP.
- Membuat timing rhythm bergantung pada FPS.
- Memberi penalti keras pada kesalahan typing atau miss beat.
- Menyimpan teks Free Thoughts secara diam-diam.
- Mengklaim performa atau kompatibilitas tanpa pengujian.

---

## 29. Prompt Siap Pakai untuk Hermes

Gunakan prompt berikut bersama file GDD ini.

> Kamu sedang membantu mengembangkan **proyek game baru yang berdiri sendiri**. Baca file `GDD_New_Game_A_Room_Made_of_Thoughts_v1.0.md` sepenuhnya dan jadikan dokumen itu sumber kebenaran desain.
>
> Game ini adalah cozy typing-rhythm experience: pemain mengetik pikiran pendek mengikuti musik lo-fi, lalu setiap kalimat yang selesai membuat kamar pixel-art isometrik 2.5D berkembang. Rhythm bersifat hybrid: pemain mengetik secara natural, sementara beberapa word/phrase anchors memberi timing feedback opsional. Tidak ada hukuman keras karena salah ketik atau miss beat. Terdapat dua mode: Guided Thoughts (teks kurasi + beatmap) dan Free Thoughts (teks pilihan pemain). Objek kamar muncul otomatis dari thought completion. Hujan, embun jendela, dan cahaya merespons secara gradual.
>
> **Pemisahan proyek wajib:** Typing Fever Prototype terdahulu telah dijadikan prototype dan public archive. Arsip itu bukan fondasi wajib, bukan sequel base, dan bukan target refactor. Perlakukan seluruh arsip sebagai read-only. Jangan mengubah, menghapus, memindahkan, atau menimpa file/branch/repository arsip. Jangan memaksakan KOKI, coffee-shop progression, Fever, UI, state, atau arsitektur lama. Boleh memeriksa arsip sebagai referensi saja. Reuse hanya jika benar-benar kompatibel dan tidak mengorbankan identitas atau arsitektur game baru.
>
> Mulailah dengan audit workspace dan laporan desain-teknis, bukan refactor. Identifikasi lokasi proyek baru yang benar. Jika belum jelas, laporkan ketidakjelasan itu dan jangan menebak dengan mengubah arsip. Bandingkan Vanilla JS + Canvas 2D, Phaser, dan PixiJS atau opsi relevan lain berdasarkan audio timing, pixel-art/isometric rendering, performa laptop lama, bundle size, kemudahan development, dan maintenance. Rekomendasikan opsi paling sederhana yang memenuhi kebutuhan.
>
> Prioritas implementasi: (1) typing feel, (2) rhythm hybrid berbasis audio clock, (3) room evolution dan deterministic object slots, (4) rain/window/light atmosphere, (5) vertical slice. Jangan membuat banyak aset final sebelum core loop terbukti. Hindari backend, Docker, akun, multiplayer, leaderboard, shop, cloud sync, AI semantic analysis, dan dependency besar pada MVP.
>
> Untuk setiap fase, berikan acceptance criteria dan bukti pengujian. Laporkan fitur sebagai Done hanya jika benar-benar dijalankan dan diuji. Jaga teks Free Thoughts tetap lokal dan jangan menyimpannya tanpa pilihan eksplisit. Jangan mengubah keputusan yang sudah dikunci tanpa menjelaskan dampak dan meminta keputusan pemilik proyek.
>
> **Tugas pertama:** tulis (a) ringkasan pemahaman GDD, (b) audit workspace dan perlindungan archive, (c) perbandingan stack, (d) struktur folder proyek baru, (e) rancangan modul dan data, (f) rencana implementasi bertahap, (g) risiko/pertanyaan TBD. Jangan lakukan perubahan destruktif pada tahap ini.

---

## 30. Glossary

- **Thought:** satu unit teks/pikiran yang diketik pemain.
- **Guided Thoughts:** mode mengetik teks kurasi dengan beatmap.
- **Free Thoughts:** mode mengetik teks pilihan pemain.
- **Beatmap:** data tempo dan posisi rhythm anchor yang terkait dengan lagu dan thought.
- **Beat anchor:** titik kata/frasa yang memiliki target beat untuk timing feedback.
- **Hybrid rhythm:** typing bebas yang diperkaya timing landmark opsional.
- **Room evolution:** perubahan kamar berdasarkan kalimat yang selesai.
- **Spawn slot:** titik/area penempatan objek yang telah dirancang.
- **Mood profile:** preset visual/audio/atmosfer.
- **Session:** satu rangkaian aktivitas bermain dari mulai sampai selesai.
- **Vertical slice:** potongan game kecil yang sudah memuat seluruh loop inti secara playable.
- **Read-only archive:** arsip yang boleh diperiksa tetapi tidak boleh diubah.

---

## 31. Penutup — Prinsip yang Tidak Boleh Hilang

Game ini harus selalu terasa seperti **mengetik pikiran sambil membangun ruang kecil yang personal**.

Ketika ada pilihan antara fitur yang lebih banyak dan pengalaman mengetik yang lebih enak, prioritaskan pengalaman mengetik. Ketika ada pilihan antara rhythm yang lebih sulit dan ritme yang lebih ramah, prioritaskan ritme yang ramah. Ketika ada pilihan antara menambah banyak objek dan menjaga kamar tetap indah, prioritaskan komposisi. Ketika ada pilihan antara reuse kode lama dan menjaga identitas proyek baru, prioritaskan identitas proyek baru.

**Pemain tidak sedang mengikuti ujian. Pemain sedang meninggalkan potongan pikirannya di sebuah kamar.**
