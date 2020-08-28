const util = require('./util.js')
const render = require('./render.js')
const config = require('./config.json')



let Routing = []



// Register Handler
const registerHandler = (route, handler) => {
	let registration = {}
	
	registration.test = util.wildcardToRegExp(route)
	registration.route = route
	handler.slice(-3) == '.js'
		? registration.handler = require(config.handlerPath + handler)
		: registration.handler = (req, res, q) => {render.page(handler, res)}
	
	Routing.push(registration)
}


// Check to see if path is in listed routes.
const inRoute = (pathname) => {
	let result = Routing.some((x) => {return x.route == pathname})
	result = result || Routing.some((x) => {return x.test.test(pathname)})
	return result
}


// Route to handler based on validated request
const route = (req, res, q) => {
	Routing.forEach((route) => {
		if (route.test.test(q.href)) {
			route.handler(req, res, q)
		}
	})
}



module.exports = {
	"registerHandler": registerHandler,
	"inRoute": inRoute,
	"route": route
}