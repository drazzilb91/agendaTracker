const CACHE_NAME = 'agenda-timer-app-cache';
const urlsToCache = [
    '/',
];
const TTL_IN_HOURS = 24; // set TTL to 24 hours
const serviceWorker = self as unknown as ServiceWorkerGlobalScope;

serviceWorker.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

serviceWorker.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(CACHE_NAME).then(async (cache) => {
            // Always try network first for page navigations to avoid stale HTML that references old bundles.
            if (event.request.mode === 'navigate') {
                return fetchAndUpdateCache(cache, event.request).catch(async () =>
                    (await cache.match('/')) ?? Response.error()
                );
            }

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
