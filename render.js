// Required Modules
const fs = require('fs')
const util = require('util')
const {Transform} = require('stream')



// Defining Variables and Constants
const staticPath = process.env.SMPLstaticpath || "./resources/static/"
const templatePath = process.env.SMPLtemplatepath || "./resources/templates/"



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




// Render arbitrary content
const content = (filepath, contentType, res) => {
	let readStream = fs.createReadStream(staticPath + filepath)
	
	readStream.on('open', () => {			// readStream open event
		res.writeHead(200, {'Content-Type': contentType})
		readStream.pipe(res)
		console.log(200 + ":\t" + filepath)
	})
	
	readStream.on('error', (err) => {		// readStream error event
		fs.access(staticPath + filepath, fs.constants.F_OK, (err) => {
			error(err ? 404 : 500, filepath, res, err ? '' : err)
		})
	})
}


// Render a static html file
const page = (page, res) => {
	let readStream = fs.createReadStream(staticPath + page)
	
	readStream.on('open', () => {			// readStream open event
		res.writeHead(200, {'Content-Type': 'text/html'})
		readStream.pipe(res)
		console.log(200 + ":\t" + page)
	})
	
	readStream.on('error', (err) => {		// readStream open event
		error(500, page, res, err)
	})
}


// Render template and replace placeholders
const template = (template, res, placeholders={}, httpcode=200, cb) => {
	let readStream = fs.createReadStream(templatePath + template, {encoding:'utf8'})
	let renderer = TemplateRenderer(placeholders,{})
	
	readStream.on('open', () => {			// readStream open event
		readStream.pipe(renderer)
		res.writeHead(httpcode, {'Content-Type': 'text/html'})
		renderer.pipe(res)
	})
	
	readStream.on('error', (err) => {		// readStream error event
		error(500, template, res, err)

	})
	
	renderer.on('error', (err) => {			// renderer error event
		error(500, template, res, err)
	})
}


// Render an error page
const error = (code, href, res, msg='') => {
	console.log(code + ":\t" + href)
	if (msg != '') console.log('\t' + msg)
	//template("error.html",res,{"code":code},code)
	res.writeHead(code)
	res.end()
}



module.exports = {
	"content":content,
	"page":page,
	"template":template,
	"error":error
}