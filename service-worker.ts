const CACHE_NAME = 'agenda-timer-app-cache';
const urlsToCache = [
    '/',
];
const TTL_IN_HOURS = 24; // set TTL to 24 hours

self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        caches.open(CACHE_NAME).then(async (cache) => {
            const cachedResponse = await cache.match(event.request);
            if (!cachedResponse || !cachedResponse.headers.has('date')) {
                return fetchAndUpdateCache(cache, event.request);
            }
            const cachedAt = new Date(cachedResponse.headers.get('date')!).getTime();
            const isExpired = Date.now() > cachedAt + TTL_IN_HOURS * 60 * 60 * 1000;
            return isExpired
                ? fetchAndUpdateCache(cache, event.request)
                : cachedResponse;
        }),
    );
});

function fetchAndUpdateCache(cache: Cache, request: Request) {
    return fetch(request).then((response) => {
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    });
}
