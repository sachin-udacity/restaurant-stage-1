/**
 * Register service worker.
 */
registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        // register the service worker
        navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        }).then(function (registration) {
            console.log('SW Registration scope: ', registration.scope);
        }, function (err) {
            console.log('SW registration failed: ', err);
        });
    } else {
        console.log("Browser doesn't support Service Workers")
    }
}