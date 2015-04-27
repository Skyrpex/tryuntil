import { defaults, bind, bindKey, parseInt } from "lodash";
import $ from "jquery";

let defaultOptions = {
	frequency: 50,
	maxTime: 0,
	maxAttempts: 0,
	context: global
};

function computeAttempts(frequency, maxTime) {
	return Math.floor(maxTime / frequency);
};

export default function(callback, options = {}) {
	options = defaults(options, defaultOptions);

	let maxAttempts = parseInt(options.maxAttempts) || computeAttempts(parseInt(options.frequency), parseFloat(options.maxTime));
	let attempts = 0;
	let deferred = $.Deferred();

	callback = bind(callback, options.context, bindKey(deferred, "resolve"));

	again();

	return deferred.promise();

	function again() {
		if (maxAttempts > 0 && attempts++ === maxAttempts) {
			deferred.fail();
		} else {
			setTimeout(function() {
				callback();
				if (deferred.state !== "pending") {
					again();
				}
			}, options.frequency);
		}
	};
};
