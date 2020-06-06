default: *.js
	browserify main.js -p tinyify -o bundle.js

dev: *.js
	browserify main.js -o bundle.js
