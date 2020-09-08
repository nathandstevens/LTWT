const page = require('./page.js')
const fs = require('fs')
const { ServerResponse} = require('http')
jest.mock('http')



beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ServerResponse.mockClear()
});

test("render.content Should call createReadStream with './resources/static/test.html'", () => {
	var res = new ServerResponse()
	let spy = jest.spyOn(fs, "createReadStream")
	page("test.html", res)
	expect(spy).toHaveBeenCalledWith('./resources/static/test.html')
	spy.mockRestore();
})