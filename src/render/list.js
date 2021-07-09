const list = (res, content, ordered=true) => {
	let listOpen
	let listClose
	let itemOpen = "<li>"
	let itemClose = "</li>"
	if (ordered) {
		listOpen = "<ol>"
		listClose = "</ol>"
	}
	else {
		listOpen = "<ul>"
		listClose = "</ul>"
	}
	let result = listOpen
	content.forEach((item) => {
		result = result + itemOpen + item + itemClose
	})
	result = result + listClose
	res.write(result)
}

module.exports = list
