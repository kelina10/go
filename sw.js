 self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open("go").then(cache=>{
      return cache.addAll([
        "./",
        "./ko.html",
        "./app.js",
        "./book.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(res=>{
      return res || fetch(e.request);
    })
  );
});
