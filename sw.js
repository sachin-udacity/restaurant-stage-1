const CACHE_NAME = 'restaurant-stage-1.v1';

self.addEventListener('install', function (event) {
    const urlsToCache = [
        '/',
        // css
        '/css/styles.css',
        '/css/responsive.css',
        // json
        '/data/restaurants.json',
        // images
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/img/NoImage.jpg',
        // javascripts
        '/js/apikey.js',
        '/js/dbhelper.js',
        '/js/register_sw.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        // html
        '/index.html',
        '/restaurant.html' // ignoring query string during cache match
    ];

    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            // cache the responses.
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    // only calling respondWith on GET
    if (event.request.method === 'GET') {
        event.respondWith(
            // fetch response and cache the updated response. 
            fetch(event.request).then(function (response) {
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, response);
                });
                return response.clone();
            }).catch(function () {
                // return cached response in case there is no internet. 
                // ignore query string during match -> ignoreSearch: true
                return caches.match(event.request, {
                    ignoreSearch: true
                });
            })
        );
    }
});