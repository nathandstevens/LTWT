const content = require('./content.js')
const fs = require('fs')
const { ServerResponse} = require('http')
jest.mock('http')



beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ServerResponse.mockClear()
});

test("render.content Should call createReadStream with './resources/static/test.png'", () => {
	var res = new ServerResponse()
	let spy = jest.spyOn(fs, "createReadStream")
	content("test.png", "image/png", res)
	expect(spy).toHaveBeenCalledWith('./resources/static/test.png')
	spy.mockRestore();
})

test("render.content Should call access with './resources/static/test.png'", () => {
	var res = new ServerResponse()
	let spy = jest.spyOn(fs, "access")
	content("/test.png", "image/png", res)
	expect(spy).toHaveBeenCalled()
	spy.mockRestore();
})