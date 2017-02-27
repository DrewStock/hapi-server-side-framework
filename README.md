# hapi-server-side-framework: coded by [Drew Stock] (https://github.com/DrewStock)
==================================================
This app launches a local HTTP server which is backed by a persistent data store. The server responds to GET, POST, PUT and DELETE requests for a single resource ('/api/players'), with the domain being my fantasy football team. :football:

...AND NOW, with the bonus of being powered by Hapi!

The following are command line instructions for using the app.

* After cloning the repo:
    * type 'npm install'
* To launch the app and run tests:
    * type 'npm run test:watch'
* To launch the app:
    * type 'npm start'
    * this creates a local HTTP server, which will be listening on port 3000
* Overview of functionality:
    * GET request to '/api/players', where resource is stored - server writes response text, a list of resources
    * GET request for '/api/players/{id}' - server writes response text, which is the contents of the resource
    * POST request for '/api/players' - server writes response text and creates a new resource, whose contents are the parsed body of the request
    * PUT request for resource at '/api/players/{id}' - server writes response text and updates an existing resource. The updated contents of the resource are the parsed body of the request
    * DELETE request to '/api/players/{id}' - server writes response text and deletes resource
