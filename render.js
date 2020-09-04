// Required Modules
const fs = require('fs')
const util = require('util')
const {Transform} = require('stream')



// Defining Variables and Constants
const staticPath = process.env.LTWTstaticpath || "./resources/static/"
const templatePath = process.env.LTWTtemplatepath || "./resources/templates/"


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