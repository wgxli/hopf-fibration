self.addEventListener('install',
	function (e) {
		e.waitUntil(
			caches.open('hopf-fibration').then(
			(cache) => cache.addAll([
					'./',
					'./index.html',
					'./main.css',
					'./bundle.js'
				])
			)
		);
	}
);

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(
			(response) => response || fetch(event.request)
		)
	);
});
