// A Room Made of Thoughts — visual prototype / style test.
// Two states: room_cold (empty, rainy) vs room_warm (lived-in, lamp lit).
// pxl DSL. Colors passed as hex objects (palette captured at definition time in pxl).

const W = 480, H = 270;

const COLD = {
  k:"#14101f", w:"#3d4666", W:"#262d45", f:"#4b5068", F:"#32374e", b:"#1b2030",
  g:"#5c7199", G:"#3b4967", s:"#93a7cc", r:"#b9cde9", d:"#6d5541", D:"#4a382b",
  c:"#5b4739", l:"#cfc6b8", L:"#ffe9b0", p:"#5c7c60", P:"#7b5641", m:"#a85a4a",
  R:"#6c5b72", u:"#4a3f53", t:"#e6e0d6", h:"#9aa3ba", x:"#100d1a"
};
const WARM = {
  k:"#1c1210", w:"#6d5a50", W:"#4a3b34", f:"#8a6a51", F:"#6b4f3c", b:"#33251f",
  g:"#a9b9d1", G:"#7c8aa0", s:"#e8c99a", r:"#c9d4e8", d:"#a8763f", D:"#7a5228",
  c:"#7a5238", l:"#ffd98a", L:"#ffcf7a", p:"#5f8f4c", P:"#b06a3a", m:"#d06a4a",
  R:"#a85a4a", u:"#7a3f34", t:"#fff2df", h:"#d8c4a8", x:"#17100c"
};

function paintRoom(c, P, warm) {
  c.rect(0, 0, W, H, P.x);

  // walls
  c.poly([14, 156, 240, 86, 240, 18, 14, 18], P.w);
  c.poly([240, 86, 466, 156, 466, 86, 240, 18], P.W);
  c.clip([14, 18, 240, 18, 240, 156, 14, 156], () => c.dither(14, 18, 226, 138, P.w, P.W, 0.08));
  c.clip([240, 18, 466, 18, 466, 156, 240, 156], () => c.dither(240, 18, 226, 138, P.W, P.w, 0.05));

  // floor
  c.poly([14, 156, 466, 156, 240, 226, 240, 86], P.f);
  c.clip([14, 86, 466, 86, 466, 156, 240, 226, 14, 156], () => c.dither(14, 86, 452, 140, P.f, P.F, 0.12));

  // baseboard
  c.line(14, 156, 240, 86, P.b, 3);
  c.line(240, 86, 466, 156, P.b, 3);
  c.line(240, 18, 240, 86, P.b, 2);

  // window (right wall, skewed to wall plane)
  c.poly([300, 36, 368, 58, 368, 100, 300, 82], P.k);
  c.poly([304, 42, 364, 62, 364, 94, 304, 76], P.s);
  if (!warm) {
    c.clip([304, 42, 364, 62, 364, 94, 304, 76], () => {
      for (let i = 0; i < 22; i++) {
        const rx = 306 + ((i * 17) % 56);
        const ry = 44 + ((i * 29) % 46);
        c.line(rx, ry, rx - 1, ry + 6, P.r);
      }
    });
  } else {
    lamp(334, 70, { r: 60, color: P.s, power: 0.3 });
  }
  c.line(304, 42, 304, 76, P.k, 2);
  c.line(364, 62, 364, 94, P.k, 2);
  c.line(304, 59, 364, 78, P.k, 2);
  c.line(334, 52, 334, 85, P.k, 2);

  // picture frame (left wall, skewed, warm only)
  if (warm) {
    c.poly([56, 34, 128, 58, 128, 108, 56, 84], P.k);
    c.poly([60, 40, 124, 62, 124, 102, 60, 78], P.R);
    c.poly([62, 76, 90, 66, 122, 100], P.u);
    c.circ(106, 58, 4, P.s);
  }

  // rug
  c.poly([240, 131, 319, 156, 240, 181, 161, 156], P.u);
  c.poly([240, 137, 303, 156, 240, 175, 177, 156], P.R);
  c.poly([240, 146, 267, 156, 240, 166, 213, 156], P.u);

  // desk
  c.poly([300, 140, 362, 162, 322, 184, 260, 162], P.d);
  c.poly([260, 162, 322, 184, 322, 190, 260, 168], P.D);
  c.poly([322, 184, 362, 162, 362, 168, 322, 190], P.D);
  c.line(300, 140, 362, 162, P.D);
  c.line(362, 162, 322, 184, P.D);
  c.line(322, 184, 260, 162, P.D);
  c.line(260, 162, 300, 140, P.D);
  c.line(266, 168, 266, 214, P.D, 2);
  c.line(356, 168, 356, 214, P.D, 2);
  c.line(322, 190, 322, 226, P.D, 2);

  // chair
  c.rect(276, 164, 30, 22, P.c);
  c.poly([300, 184, 326, 196, 300, 208, 274, 196], P.c);
  c.line(278, 202, 278, 226, P.D, 2);
  c.line(322, 202, 322, 226, P.D, 2);

  // lamp on desk
  c.ellipse(330, 152, 10, 4, P.k);
  c.line(330, 134, 330, 150, P.k, 2);
  c.poly([318, 120, 342, 120, 348, 134, 312, 134], P.l);
  if (warm) {
    lamp(330, 128, { r: 70, color: P.L, power: 0.55 });
    c.clip([285, 190, 375, 190, 375, 226, 285, 226], () => c.dither(285, 190, 90, 36, P.f, P.L, 0.15));
  }

  // book + mug (warm only)
  if (warm) {
    c.poly([272, 156, 306, 156, 312, 164, 278, 164], P.m);
    c.line(272, 156, 278, 164, P.t);
    c.rect(336, 152, 12, 10, P.m);
    c.ring(350, 157, 4, P.m);
  }

  // plant (warm only)
  if (warm) {
    c.poly([112, 172, 136, 172, 131, 188, 117, 188], P.P);
    c.ellipse(124, 158, 9, 14, P.p);
    c.ellipse(112, 164, 6, 9, P.p);
    c.ellipse(136, 164, 6, 9, P.p);
  }

  // dust (warm only)
  if (warm) {
    for (let i = 0; i < 14; i++) {
      c.px(90 + ((i * 53) % 180), 120 + ((i * 37) % 70), "#ffe9b0");
    }
  }

  // text band
  c.rect(0, 232, W, 38, "#0d0b14");
  c.text(240, 240, "hujan mulai reda di luar sana", warm ? P.t : P.h, { scale: 2, align: "c", shadow: "#000000" });
}

scene("room_cold", { w: W, h: H, bg: "#100d1a" }, (c) => paintRoom(c, COLD, false));
scene("room_warm", { w: W, h: H, bg: "#17100c" }, (c) => paintRoom(c, WARM, true));
