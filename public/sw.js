//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache';
var precacheFiles = [
    /* Add an array of files to precache for your app */
];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function (evt) {
    console.log('The service worker is being installed.');
    // evt.waitUntil(precache().then(function () {
    //     console.log('[ServiceWorker] Skip waiting on install');
    //     return self.skipWaiting();
    // }));
    return self.skipWaiting();
});


// //allow sw to control of current page
// self.addEventListener('activate', function (event) {
//     // event.waitUntil(self.registration.showNotification('Test', {
//     //     body: 'Yay it works.',
//     //     icon: 'images/icon.png',
//     //     badge: 'images/badge.png'
//     // }))
//     console.log('[ServiceWorker] Claiming clients for current page');
//     return self.clients.claim();

// });

// self.addEventListener('fetch', function(evt) {
//     var url = evt.request.url
//     if(!url.includes('api.todoninja.de')) {
//         console.log('The service worker is serving the asset.'+ evt.request.url);
//         evt.respondWith(fromCache(evt.request).catch(function() {return fromServer(evt.request)}));
//         evt.waitUntil(update(evt.request));
//     } else {
//         console.log('[Service Worker] Not serving asset ' + url)
//     }
// });

self.addEventListener('push', function(event) {
    const data = event.data.json()
    const title = data.title;

    // Set link
    data.data.link = `/#/${data.data.link.type}/${data.data.link.id}`

    // Set Badge
    data.badge = '/img/icons/badge-96x96.png'

    // Set Icon
    data.icon = '/img/icons/android-chrome-192x192.png'

    event.waitUntil(self.registration.showNotification(title, data));
})

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
    
  
    event.waitUntil(
        clients.openWindow(event.notification.data.link)
    );
  
    event.notification.close();
  });


// function precache() {
//     return caches.open(CACHE).then(function (cache) {
//         return cache.addAll(precacheFiles);
//     });
// }


// function fromCache(request) {
//     //we pull files from the cache first thing so we can show them fast
//     return caches.open(CACHE).then(function (cache) {
//         return cache.match(request).then(function (matching) {
//             return matching || Promise.reject('no-match');
//         });
//     });
// }


// function update(request) {
//     //this is where we call the server to get the newest version of the 
//     //file to use the next time we show view
//     return caches.open(CACHE).then(function (cache) {
//         return fetch(request).then(function (response) {
//             return cache.put(request, response);
//         });
//     });
// }

// function fromServer(request) {
//     //this is the fallback if it is not in the cahche to go to the server and get it
//     return fetch(request).then(function (response) { return response })
// }