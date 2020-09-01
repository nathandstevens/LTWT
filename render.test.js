const render = require('./render.js')
const { ServerResponse, IncomingMessage } = require('http')
jest.mock('http')



beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ServerResponse.mockClear()
  IncomingMessage.mockClear()
});



const headers = [2, 3, 4, 5, 6]



test("render.para Should send <p> element", () => {
	var res = new ServerResponse()
	render.para(res, "test")
	expect(res.write).toHaveBeenCalledWith("<p>test</p>")
})

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
