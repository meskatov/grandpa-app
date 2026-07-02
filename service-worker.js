const CACHE_NAME = 'grandpa-v5';
const urls = ['.','index.html','style.css','script.js','manifest.json'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urls)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(names => Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(fr => {
    if (e.request.url.match(/\.(mp4|webm)$/)) return fr;
    return caches.open(CACHE_NAME).then(c => { c.put(e.request, fr.clone()); return fr; });
}))));
