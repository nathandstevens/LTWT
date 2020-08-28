const server = require('./server.js')
const routing = require('./route.js')
const render = require('./render.js')

module.exports = {
	"start":server.start,
	"render":render,
	"registerHandler":routing.registerHandler
}