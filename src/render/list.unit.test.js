const list = require('./list.js')
const { ServerResponse} = require('http')
jest.mock('http')



beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ServerResponse.mockClear()
});


test("render.list Should send <ol> and <li> elements", () => {
	var res = new ServerResponse()
	var items = ['item 1', 'item 2', "item 3", "item 4"]
	list(res, items)
	expect(res.write).toHaveBeenCalledWith("<ol><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ol>")
})

test("render.list Should send <ul> and <li> elements", () => {
	var res = new ServerResponse()
	var items = ['item 1', 'item 2', "item 3", "item 4"]
	list(res, items, false)
	expect(res.write).toHaveBeenCalledWith("<ul><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ul>")
})