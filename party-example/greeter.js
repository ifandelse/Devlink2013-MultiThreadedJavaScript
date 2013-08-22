// inside greeter.js
function greetGuest(name, cb) {
	// do some long running async work here
	cb(name + " has been greeted.");
}

function processMessage(type, guests) {
	if (type === "guestsToGreet") {
		while(guests.length) {
			greetGuest(guests.shift(), function(result) {
				postMessage({ type: "greeting", msg: result });
			});
		}
	}
}

onmessage = function (e) {
	if(e.data) {
		processMessage(e.data.type, e.data.msg);
	}
};

postMessage({ type: "greeterReady" });