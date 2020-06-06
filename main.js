render = require('./render.js');
render.animate();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
}

require('./instructions.js');
