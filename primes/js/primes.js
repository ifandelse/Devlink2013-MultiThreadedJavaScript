var primes = (function () {
	var WHEN_TO_STOP       = 40000000;
	var COMPUTE_BLOCK_SIZE =  1000000;
	var stopRequested = false;
	var inProgress = false;
	var count = 0;
	var listeners = [];
	var notify = function(msg) {
		setTimeout(function(){
			var i = 0, len = listeners.length;
			for (; i < len; i++) {
				listeners[i](msg);
			}
		},0);
	};
	function compute(start)  {
		var n = start;
		var i, hasDivisor;
		if(!inProgress) {
			notify("Starting");
		}
		inProgress = true;

		if (stopRequested) { // got a message to stop before this call to compute
			count = 0;
			inProgress = false;
			stopRequested = false;
			notify("Stopped");
			return;
		}

		while (n < start + COMPUTE_BLOCK_SIZE) {
			hasDivisor = false;
			for (i = 2; i <= Math.sqrt(n); i += 1) {
				if (n % i === 0) {
					hasDivisor = true;
					break;
				}
			}
			if (!hasDivisor) {
				// found a prime!
				count++;
			}
			n += 1;
		}

		if(n >= WHEN_TO_STOP) {
			stopRequested = true;
		}

		setTimeout(function () { compute(n); }, 0);

		// Finally, always report how many primes we've found so far
		notify("Found " + count + " primes between 2 and " + (n - 1));
	}

	return {
		compute: compute,
		addListener: function(cb) {
			listeners.push(cb);
		},
		stop: function() {
			stopRequested = true;
		}
	};
}());