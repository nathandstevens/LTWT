const fs = require("fs")

const folderNames = [
	'./Routes',
	'./Resources',
	'./Resources/Static',
	'./Resources/Templates'
]

const mkdir = (path) => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
      console.log(path + ": created")
    }
  } catch (err) {
    console.error(err)
  }
}

folderNames.forEach(mkdir)
