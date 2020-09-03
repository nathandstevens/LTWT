const head = (res, content, level=1) => {
	let tagOpen = "<h" + level + ">"
	let tagClose = "</h" + level + ">"
	res.write(tagOpen + content + tagClose)
}

module.exports = head