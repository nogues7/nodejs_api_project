// Require express
const express = require('express');
// Use express
const app = express();
const port = 3000;

// Projects array
const projects = [];

// Listen for reqs
app.listen(port);

// POST - Insert new project
app.post('/projects', (req, res) => {
    // Get the values of body
    const {id, name} = req.body;
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
app.put('/projects/:id', (req, res) => {
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
app.delete('/projects/:id', (req, res) => {
    // Get id from url and name of body
    const {id} = req.params;
    // Find the projectIndex by id
    const projectIndex = projects.findIndex(p => p.id == id);
    // Remove the project from the projects array
    projects.splice(projectIndex, 1);

    // Return
    return res.send();
});