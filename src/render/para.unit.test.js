const para = require('./para.js')
const { ServerResponse} = require('http')
jest.mock('http')



beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ServerResponse.mockClear()
});

test("render.para Should send <p> element", () => {
	var res = new ServerResponse()
	para(res, "test")
	expect(res.write).toHaveBeenCalledWith("<p>test</p>")
})