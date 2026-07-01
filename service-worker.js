const CACHE_NAME = 'grandpa-app-v2';
const urlsToCache = [
    '.',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json'
];

// Установка
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Кеширование ресурсов...');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Активация
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

// Перехват запросов
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Возвращаем из кеша или идём в сеть
                return response || fetch(event.request).then(fetchResponse => {
                    // Для больших файлов (видео) не кешируем, т.к. они тяжёлые
                    if (event.request.url.match(/\.(mp4|webm|ogg)$/)) {
                        return fetchResponse;
                    }
                    
                    // Остальное пробуем кешировать
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
    );
});