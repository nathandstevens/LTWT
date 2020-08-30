// Required Modules
const util = require('./util.js')
const render = require('./render.js')
const url = require('url')



// Defining Variables and Constants
let Routing = []
const handlerPath = process.env.LTWThandlerpath || "./routes/"



// Register Handler
const registerHandler = (route, handler) => {
	let registration = {}
	
	if ((typeof handler) == "function") {	// Use handler as is if function
		registration.handler = handler
	}
	else {									// Expect string otherwise and treat as filename
		handler.slice(-3) == '.js'
			? registration.handler = require(handlerPath + handler)					// Import if is '.js' file
			: registration.handler = (req, res) => {render.page(handler, res)}		// Else render as if '.html' file
	}
	registration.test = util.wildcardToRegExp(route)	// Modify route definition to regular expression
	registration.route = route							// Include original route definition
	
	Routing.push(registration)							// Finalize registration
}


// Check to see if path is in listed routes.
const inRoute = (pathname) => {
	let result = Routing.some((x) => {return x.route == pathname})
	result = result || Routing.some((x) => {return x.test.test(pathname)})
	return result
}


// Route to handler based on validated request
const route = (req, res) => {
	let href = url.parse(req.url, true).href
	Routing.forEach((route) => {
		if (route.test.test(href)) {
			route.handler(req, res)
		}
	})
}



module.exports = {
	"registerHandler": registerHandler,
	"inRoute": inRoute,
	"route": route
}