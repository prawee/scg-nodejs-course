'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Axios = use('axios')

Route.on('/').render('hello', {
    name: 'Prawee ',
    surname: 'Wongsa'
})

// Route.get('/users', function() { return 'xxx'})
// Route.get('/users', () => 'xxx')

//list all
Route.get('/users', ({ body, params, view }) => { 
    //call services
    const url = 'http://localhost:3000/users'
    return Axios.get(url)
        .then(result => {
            console.log(result)
            return view.render('user-list', {
                users: result.data
            }) 
        })
        .catch(err => {
            console.log(err)
        })
    //render views
})

//form
Route.get('/users/add', ({ view }) => {
    return view.render('users-add')
})

//add
Route.post('/users/add', ({ request, response }) => {
    const { name, surname } = request.all()
    console.log(name, surname)
    // return response.json({
    //     name,
    //     surname
    // })
    const formData = {
        name,
        surname
    }
    const url = 'http://localhost:3000/users'
    return Axios.post(url, formData)
        .then(result=> {
            console.log(result.data)
            if (result.status == 200) {
                return response.redirect('/users')
            }
        })
        .catch(err => {
            console.log(err)
        })
})

//update
Route.put('/users/update', () => {
})

//delete
Route.delete('/user/delele', () => {
})



