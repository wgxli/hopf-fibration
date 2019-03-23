default: main.js
	browserify main.js | uglifyjs > bundle.js
