const fs = require('fs');
const config = require('./config.json');
const util = require('util');
const {Transform} = require('stream');



// Template rendering stream object
function TemplateRenderer(placeholders, options) {
	// allow use without new
	if (!(this instanceof TemplateRenderer)) {
		return new TemplateRenderer(placeholders, options);
	}

	// init Transform
	Transform.call(this, options);
	this.placeholders = placeholders;
}
util.inherits(TemplateRenderer, Transform);

TemplateRenderer.prototype._transform = function(chunk, enc, cb) {
	let renderedTemplate = chunk.toString()
	
	Object.entries(this.placeholders).forEach((entry) => {
		let [key, value] = entry;
		let search = RegExp(config.startTempVar + key + config.endTempVar, "g" )
		renderedTemplate = renderedTemplate.replace(search, value)
	});
	
	this.push(renderedTemplate);
	cb();
};




// Render arbitrary content
const content = (filepath, contentType, res) => {
	let readStream = fs.createReadStream(config.staticPath + filepath);
	
	readStream.on('open', () => {
		res.writeHead(200, {'Content-Type': contentType});
		readStream.pipe(res);
		console.log(200 + ":\t" + filepath)
	});
	
	readStream.on('error', (err) => {
		fs.access(config.staticPath + filepath, fs.constants.F_OK, (err) => {
			error(err ? 404 : 500, filepath, res, err ? '' : err)
		});
	});
}


// Render a static html file
const page = (page, res) => {
	let readStream = fs.createReadStream(config.staticPath + page);
	
	readStream.on('open', () => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		readStream.pipe(res);
		console.log(200 + ":\t" + page)
	});
	
	readStream.on('error', (err) => {
		error(500, page, res, err)
	});
}


// Render template and replace placeholders
const template = (template, res, placeholders={}, httpcode=200, cb) => {
	let readStream = fs.createReadStream(config.templatePath + template, {encoding:'utf8'});
	let renderer = TemplateRenderer(placeholders,{})
	
	readStream.on('open', () => {
		readStream.pipe(renderer)
		res.writeHead(httpcode, {'Content-Type': 'text/html'});
		renderer.pipe(res)
	});
	
	readStream.on('error', (err) => {
		error(500, template, res, err)

	});
	
	renderer.on('error', (err) => {
		error(500, template, res, err)
	});
}


// Render an error page
const error = (code, href, res, msg='') => {
	console.log(code + ":\t" + href)
	if (msg != '') console.log('\t' + msg)
	template("error.html",res,{"code":code},code)
}



module.exports = {
	"content":content,
	"page":page,
	"template":template,
	"error":error
}