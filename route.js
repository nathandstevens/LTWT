// Required Modules
const util = require('./util.js')
const render = require('./render.js')
const url = require('url')
const fs = require('fs')



// Defining Variables and Constants
let Routing = []
const handlerPath = process.env.LTWThandlerpath || "./routes/"



// Register Handler
const registerHandler = (route, handler) => {
	let registration = {}

	
	// Use handler as is if function
	if ((typeof handler) == "function") {
		registration.handler = handler
	}

	// Expect string otherwise and treat as filename
	else {
		// Import if is '.js' file
		// Else render as if '.html' file
		handler.slice(-3) == '.js'
			? registration.handler = require(handlerPath + handler)
			: registration.handler = (req, res) => {render.page(handler, res)}
	}
	// Modify route definition to regular expression
	registration.test = util.wildcardToRegExp(route)
	// Include original route definition
	registration.route = route
	// Finalize registration
	Routing.push(registration)
}


// Register all static resources
const registerAllStatic = () => {
	fs.readdir(render.staticPath, (err, files) => {
		files.forEach((filename) => {
			registerHandler("/" + filename, filename)
		})
	})
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
	"registerAllStatic":registerAllStatic,
	"registerHandler": registerHandler,
	"inRoute": inRoute,
	"route": route
}
