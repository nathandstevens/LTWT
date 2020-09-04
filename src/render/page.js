const {access, createReadStream} = require('fs')

// Render a static html file
const page = (filepath, res) => {
	let readStream = fs.createReadStream(staticPath + filepath)
	
	readStream.on('open', () => {			// readStream open event
		res.writeHead(200, {'Content-Type': 'text/html'})
		readStream.pipe(res)
		console.log(200 + ":\t" + filepath)
	})
	
	readStream.on('error', (err) => {		// readStream open event
		error(500, filepath, res, err)
	})
}

module.exports = content