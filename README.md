# SMPL
---
This is a simple web framework.
Right now there are only a few features.
 - Rendering
	- Templates
	- Static HTML
	- Arbitrary Content *(photos, video, documents, etc.)*
 - Basic Routing
 </br></br>

## Documentation

### SMPL.start()
Will start a SMPL server on port 80 by default. </br>
Environmental variable `SMPLport` can override the default port. </br>
**This function will block execution of other code**
</br></br>

### SMPL.registerHandler(route, handler)
Will associate a handler to a specified route. </br>
If a request matches the `route` provided, the request will be forwarded to the `handler`. </br>
The `handler` must be a function with two arguments or it may be a name referencing a file found in `./routes`, the default handler path. </br>
The handler file must export a single function with two arguments. </br>
Handlers use the variables `req` and `res` as reqest and respons objects passed from the http module.</br>
Environmental variable *SMPLhandlerpath* can be used to change the handler path.
</br></br>

### SMPL.render.content(filepath, contentType, res)
Will respond with content at specified `filepath`. </br>
The `filepath` will be rooted in `./resources/static/`, the default static content path. </br>
The provided `contentType` will be used in the response to the client. </br>
The variable `res` should be passed from the second argument in a handler function. </br>
Environmental variable `SMPLstaticpath` can be used to change the static content path.
</br></br>

### SMPL.render.page(filepath, res)
Will respond with html document at specified `filepath`. </br>
The `filepath` will be rooted in `./resources/static/`, the default static content path. </br>
The variable `res` should be passed from the second argument in a handler function. </br>
Environmental variable `SMPLstaticpath` can be used to change the static content path.
</br></br>

### SMPL.render.template(filepath, res, placeholders=\{\}, httpcode=200)
Will respond with template at specified `filepath`. </br>
The `filepath` will be rooted in `./resources/templates/`, the default template content path. </br>
The variable `res` should be passed from the second argument in a handler function. </br>
The variable `httpcode` should be a http response code and is 200 by default. </br>
The variable `placeholders` should be an object with the key as the name of the placeholder in the template and the value as the data to replace the placeholder. </br>
</br></br>

### SMPL.render.error(code, href, res, msg='')
Will respond with the specified `code` which should be an http response code. </br>
The `href` should be the requested resource. This will be logged in the console. </br>
The variable `res` should be passed from the second argument in a handler function. </br>
The variable `msg` is the error message that will be logged in the console.