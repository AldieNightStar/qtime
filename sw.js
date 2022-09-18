const CACHE_NAME = "version-1";
const urlsToCache = [
    'index.html',
    'sw.js',
    'timer.js',
    'alarm.wav'
];

// Install the service worker and open the cache and add files mentioned in array to cache
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});