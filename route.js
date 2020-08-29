const util = require('./util.js')
const render = require('./render.js')
const url = require('url')



let Routing = []
const handlerPath = process.env.SMPLhandlerpath || "./routes/"


// Register Handler
const registerHandler = (route, handler) => {
	let registration = {}
	if ((typeof handler) == "function") {
		registration.handler = handler
	}
	else {
		handler.slice(-3) == '.js'
			? registration.handler = require(handlerPath + handler)
			: registration.handler = (req, res) => {render.page(handler, res)}
	}
	registration.test = util.wildcardToRegExp(route)
	registration.route = route
	Routing.push(registration)
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