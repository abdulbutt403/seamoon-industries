export const dentalInstruments = Array.from({ length: 411 }, (_, i) => ({
  image: `/assets/mpd/mpd-${String(i + 1).padStart(3, "0")}.jpg`,
}));

export const surgicalInstruments = Array.from({ length: 432 }, (_, i) => ({
  image: `/assets/surgical/surgical-${String(i + 1).padStart(3, "0")}.jpg`,
}));
