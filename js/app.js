if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => reg)
    .catch((err) => err);
}