var gulputil = require("gulp-util"),
	fs = require("fs"),
	through = require("through2"),
	_ = require('underscore');

module.exports = function template(data) {
	return through.obj(function(file, encoding, callback) {
		try {
			var source = file.contents.toString("utf8");

			if (data) {
				if (data.frag) 
					data.frag = '"'+fs.readFileSync(data.frag, 'utf8')+'"';
				if (data.vert)
					data.vert = '"'+fs.readFileSync(data.vert, 'utf8')+'"';

				source = _.template(source, data);
				// gulputil.log(data, source)
			}

			file.contents = new Buffer(source);
			this.push(file);
		} catch (e) {
			this.emit('error', new gulputil.PluginError('gulp-template', e))
		}
		callback();
	});
};