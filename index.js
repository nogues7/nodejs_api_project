// Require express
const express = require('express');
// Require bodyparser
var bodyParser = require('body-parser');
// Uses dotenv to use enviroment variables in .env
const dotenv = require('dotenv');
dotenv.config();



// Use express
const app = express();
const port = 3000;

// Projects array
const projects = [];

// Listen for reqs
app.listen(port);

// Body Parser JSON to understand req
app.use(bodyParser.json());


// POST - Insert new project
app.post('/projects', checkProjectCreated, (req, res) => {
    // Get the values of body
    const id = req.body.id;
    const name = req.body.name;
    // Put in array
    const project = {
        id,
        name,
        tasks: []
    };
    // Push in projects
    projects.push(project);

    // Return the project array
    return res.json(project);
});

// GET - Return all projects
app.get('/projects', (req, res) => {
    // Return all projects
    return res.json(projects);
});

// PUT - Update a project
app.put('/projects/:id', checkProjectExists, (req, res) => {
    // Get id from url and name of body
    const {id} = req.params;
    const {name} = req.body;
    // Find the project in projects array by id
    const project = projects.find(p => p.id == id);
    // Update the project name
    project.name = name;

    // Return the project array
    return res.json(project);
})

// DELETE - Delete a project
app.delete('/projects/:id', checkProjectExists, (req, res) => {
    // Get id from url and name of body
    const {id} = req.params;
    // Find the projectIndex by id
    const projectIndex = projects.findIndex(p => p.id == id);
    // Remove the project from the projects array
    projects.splice(projectIndex, 1);

    // Return
    return res.send();
});

// Middleware Functions
function checkProjectExists(req, res, next){
    // Get id from url and name of body
    const {id} = req.params;

    // Find the project in projects array by id
    const project = projects.find(p => p.id == id);

    // If project not found
    if(!project)
        return res.status(400).json({error: "Project not found!"});

    // Go for next function
    return next();
}

function checkProjectCreated(req, res, next){
    // Get id from url and name of body
    const {id} = req.body;

    // Find the project in projects array by id
    const project = projects.find(p => p.id == id);

    // If project found
    if(project)
        return res.status(400).json({error: "Project already Created!"});

    // Go for next function
    return next();
}

// TO DO LIST
// PUT MONGOOSE IN PROJECT TO STORE DATA AT MONGODB
// Validate params of req in POST, PUT, DELETE <<< SEE ANYTHING LIKE POST SCHEMA
// New method GET projects/:id to grab only one project info
// New method PUT projects/:id/task to add new task to project
// New method DELETE projects/:id/task/:id to delete a task