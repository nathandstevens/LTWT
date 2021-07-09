const table = (res, content, headers) => {
    let tableOpen = "<table>"
    let tableClose = "</table>"
    let headerOpen = "<th>"
    let headerClose = "</th>"
    let rowOpen = "<tr>"
    let rowClose = "</tr>"
    let cellOpen = "<td>"
    let cellClose = "</td>"

    let result = tableOpen + headerOpen
    headers.forEach((header) => {
        result = result + cellOpen + header + cellClose
    })
    result = result + headerClose

    content.forEach((row) => {
        result = result + rowOpen
        headers.forEach((header) => {
            result = result + cellOpen + row[header] + cellClose
        })
        result = result + rowClose
    })
    result = result + tableClose
    
	res.write(result)
}

module.exports = table
