var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var src = "src/**/*.js";

gulp.task("watch", ["default"], function () {
	$.watch(src, function(event) {
		bundle(event.path);
	});
});

gulp.task("default", function () {
	return bundle(src);
});

function bundle(src) {
	return gulp.src(src)
		.pipe($.notify("Transpiling <%= file.relative %>..."))
		.pipe($.sourcemaps.init({ loadMaps: true }))
		.pipe($.babel({ stage: 0 }))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest("."))
		.pipe($.notify("<%= file.relative %> transpiled!"));
}
