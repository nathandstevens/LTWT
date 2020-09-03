const render = require('./render.js')
const { ServerResponse, IncomingMessage } = require('http')
const fs = require('fs')
jest.mock('http')



beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ServerResponse.mockClear()
  IncomingMessage.mockClear()
});



const headers = [2, 3, 4, 5, 6]



test("render.head Should send <h1> element", () => {
	var res = new ServerResponse()
	render.head(res, "test")
	expect(res.write).toHaveBeenLastCalledWith("<h1>test</h1>")
	render.head(res, "test", 1)
	expect(res.write).toHaveBeenLastCalledWith("<h1>test</h1>")
})

headers.forEach((n) => {
	test("render.head Should send <h" + n + "> element", () => {
		var res = new ServerResponse()
		render.head(res, "test", n)
		expect(res.write).toHaveBeenCalledWith("<h"+ n + ">test</h" + n + ">")
	})
})

test("render.list Should send <ol> and <li> elements", () => {
	var res = new ServerResponse()
	var list = ['item 1', 'item 2', "item 3", "item 4"]
	render.list(res, list)
	expect(res.write).toHaveBeenCalledWith("<ol><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ol>")
})

test("render.list Should send <ul> and <li> elements", () => {
	var res = new ServerResponse()
	var list = ['item 1', 'item 2', "item 3", "item 4"]
	render.list(res, list, false)
	expect(res.write).toHaveBeenCalledWith("<ul><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ul>")
})
