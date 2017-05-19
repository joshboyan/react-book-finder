self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mysite-static-v3').then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        'manifest.json',
        'assets/bundle.js',        
        'assets/img/icon-128x128.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        //console.log('Found response in cache:', response);

        return response;
      }
      //console.log('No response found in cache. About to fetch from network...');

      return fetch(event.request).then(function(response) {
        //console.log('Response from network is:', response);

        return response;
      }).catch(function(error) {
        console.error('Fetching failed:', error);

        throw error;
      });
    })
  );
});