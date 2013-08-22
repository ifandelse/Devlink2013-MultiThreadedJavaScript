importScripts("primes.js");

primes.addListener(function(msg){
	postMessage(msg);
});

addEventListener("message", function(e){
	if( e.data && e.data.cmd) {
		switch( e.data.cmd) {
			case 'start' :
				primes.compute( e.data.startVal );
			break;
			case 'stop' :
				primes.stop();
			break;
			default:
				postMessage("Invalid command...");
			break;
		}
	}
});