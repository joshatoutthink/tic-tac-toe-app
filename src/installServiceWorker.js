if ("serviceWorker" in navigator) {
  window.navigator.serviceWorker.register("./sw.js").then((reg) => {
    if (reg.active) {
      console.log("Service Worker is Active");
    }
    if (reg.waiting) {
      console.log("Service Worker is Waiting");
    }
    if (reg.installing) {
      console.log("Service Worker is Installing");
    }
  });
}
