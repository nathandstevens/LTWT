const http = require('http');
const url = require('url');
const config = require('./config.json');
const render = require('./render.js');
const util = require('./util.js')
const routing = require('./route.js')



// Listener
const httpListener = (req, res) => {
	let q = url.parse(req.url, true);
	
	if (!routing.inRoute(q.href)) {
		render.error(404,q.href,res)
	}
	
	else {
		try {
			routing.route(req, res, q)
		}
		catch {
			render.error(500, '', res, "Error!")
		}
	}
}

// Start server
const start = (port=config.port) => {
	console.log("Creating server...");
	const s = http.createServer(httpListener);
	console.log("Server created successfully!");
	s.listen(port);
	console.log("Listening on port " + port + "...");
}
