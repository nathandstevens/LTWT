const head = require('./head.js')
const { ServerResponse} = require('http')
jest.mock('http')



beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ServerResponse.mockClear()
});


const headers = [2, 3, 4, 5, 6]

test("render.head Should send <h1> element", () => {
	var res = new ServerResponse()
	head(res, "test")
	expect(res.write).toHaveBeenLastCalledWith("<h1>test</h1>")
	head(res, "test", 1)
	expect(res.write).toHaveBeenLastCalledWith("<h1>test</h1>")
})

headers.forEach((n) => {
	test("render.head Should send <h" + n + "> element", () => {
		var res = new ServerResponse()
		head(res, "test", n)
		expect(res.write).toHaveBeenCalledWith("<h"+ n + ">test</h" + n + ">")
	})
})