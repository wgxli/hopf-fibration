default: main.js
	browserify main.js -p tinyify -o bundle.js
