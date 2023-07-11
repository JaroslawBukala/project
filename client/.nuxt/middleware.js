const middleware = {}

middleware['getPosts'] = require('..\\middleware\\getPosts.js')
middleware['getPosts'] = middleware['getPosts'].default || middleware['getPosts']

middleware['isAuth'] = require('..\\middleware\\isAuth.js')
middleware['isAuth'] = middleware['isAuth'].default || middleware['isAuth']

middleware['search'] = require('..\\middleware\\search.js')
middleware['search'] = middleware['search'].default || middleware['search']

middleware['searchBook'] = require('..\\middleware\\searchBook.js')
middleware['searchBook'] = middleware['searchBook'].default || middleware['searchBook']

export default middleware
