const server = require('./server')
const routing = require('./route')
const render = require('./render')

module.exports = {
	"start":server.start,
	"render":render,
	"registerHandler":routing.registerHandler
}