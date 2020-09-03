const server = require('./server.js')
const routing = require('./route.js')
const render = require('./render')

module.exports = {
	"start":server.start,
	"render":render,
	"registerHandler":routing.registerHandler
}