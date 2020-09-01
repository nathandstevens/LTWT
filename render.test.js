const render = require('./render.js')
const { ServerResponse, IncomingMessage } = require('http')
jest.mock('http')

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ServerResponse.mockClear()
  IncomingMessage.mockClear()
});

test("render.para Should send <p> element", () => {
	var res = new ServerResponse()
	render.para(res, "test")
	expect(res.write).toHaveBeenCalledWith("<p>test</p>")
})