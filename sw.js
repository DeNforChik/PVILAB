const CACHE_NAME = "pwa-cache-v1";

const ASSETS = [
    "/",
    "/students.html",
    "/dashboard.html",
    "/message.html",
    "/task.html",
    "/style.css",
    "/script.js",
    "/img/avatarplaceholder.png",
    "/img/avatarplaceholder1.png",
    "/img/avatarplaceholder2.png",
    "/img/avatarplaceholder3.png",
    "/img/icons.png",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Кешування ресурсів...");
            return cache.addAll(ASSETS).catch(console.error);
        })
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith("chrome-extension://")) {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                const networkFetch = fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => {
                    if (event.request.mode === "navigate") {
                        return caches.match("/");
                    }
                });

                return cachedResponse || networkFetch;
            });
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        }).then(() => {
            console.log("Новий Service Worker активовано.");
            return self.clients.claim();
        })
    );
});
