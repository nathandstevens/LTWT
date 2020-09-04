
// Render an error page
const error = (code, href, res, msg='') => {
	console.log(code + ":\t" + href)
	if (msg != '') console.log('\t' + msg)
	//template("error.html",res,{"code":code},code)
	res.writeHead(code)
	res.end()
}

module.exports = error