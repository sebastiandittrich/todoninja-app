workbox.setConfig({
    debug: false,
});

self.addEventListener('push', function(event) {
    console.log('push!')
    console.log(data)
    const data = event.data.json()
    const title = data.title;
    event.waitUntil(self.registration.showNotification(title, data));
})

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
    
  
    event.waitUntil(
        clients.openWindow(event.notification.data.link)
    );
  
    event.notification.close();
  });