// Required Modules
const http = require('http')
const url = require('url')
const render = require('./render.js')
const routing = require('./route.js')



// Defining Variables and Constants
//     *None



// Listener
const httpListener = (req, res) => {
	let href = url.parse(req.url, true).href
	
	if (!routing.inRoute(href)) {
		render.error(404,href,res)
	}
	else {
		try {
			routing.route(req, res)
		}
		catch {
			render.error(500, '', res, "Error!")
		}
	}
}

// Start server
const start = (port=process.env.LTWTport||80) => {
	console.log("Creating server...")
	const s = http.createServer(httpListener)
	console.log("Server created successfully!")
	s.listen(port)
	console.log("Listening on port " + port + "...")
}



module.exports = {
	"start":start
}