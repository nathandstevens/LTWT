const {access, createReadStream} = require('fs')
const {Transform} = require('stream')

const templatePath = process.env.LTWTtemplatepath || "./resources/templates/"

// Template rendering stream object
function TemplateRenderer(placeholders, options) {
	// allow use without new
	if (!(this instanceof TemplateRenderer)) {
		return new TemplateRenderer(placeholders, options)
	}

	// init Transform
	Transform.call(this, options)
	this.placeholders = placeholders
}
util.inherits(TemplateRenderer, Transform)

TemplateRenderer.prototype._transform = function(chunk, enc, cb) {
	let renderedTemplate = chunk.toString()
	
	Object.entries(this.placeholders).forEach((entry) => {
		let [key, value] = entry
		let search = RegExp("{{ " + key + " }}", "g" )
		renderedTemplate = renderedTemplate.replace(search, value)
	})
	
	this.push(renderedTemplate)
	cb()
}



// Render template and replace placeholders
const template = (filepath, res, placeholders={}, httpcode=200) => {
	let readStream = fs.createReadStream(templatePath + filepath, {encoding:'utf8'})
	let renderer = TemplateRenderer(placeholders,{})
	
	readStream.on('open', () => {			// readStream open event
		readStream.pipe(renderer)
		res.writeHead(httpcode, {'Content-Type': 'text/html'})
		renderer.pipe(res)
	})
	
	readStream.on('error', (err) => {		// readStream error event
		error(500, filepath, res, err)

	})
	
	renderer.on('error', (err) => {			// renderer error event
		error(500, filepath, res, err)
	})
}


module.exports = template