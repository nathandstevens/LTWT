const {access, createReadStream} = require('fs')

const staticPath = process.env.LTWTstaticpath || "./resources/static/"

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

module.exports = content