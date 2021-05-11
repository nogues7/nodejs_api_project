// Require express
const express = require('express');
// Require bodyparser
var bodyParser = require('body-parser');
// Require mongoose
const mongoose = require('mongoose');
// Uses dotenv to use enviroment variables in .env
const dotenv = require('dotenv');
dotenv.config();

// Mongo DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {console.log('DB Connected')})
.catch(err => console.log(err));

// Project Schema
var Schema = mongoose.Schema;
var projectDataSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    tasks: String
});
var Project = mongoose.model('ProjectData', projectDataSchema);

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
    // Put in array values of body
    const project = {
        id: req.body.id,
        name: req.body.name,
        tasks: ''
    };
    // Save project in mongo
    var projectMongo = new Project(project);
    projectMongo.save();

    // Return the project array
    return res.status(200).json(project);
});

// GET - Return all projects
app.get('/projects', (req, res) => {
    Project.find().then((doc) => {
        // Return all projects
        return res.status(200).json({items: doc});
    });
});

// PUT - Update a project
app.put('/projects/:id', checkProjectExists, (req, res) => {
    // Get id from url
    const {id} = req.params;
    // Get id from url and name of body
    const project = {
        id: id,
        name: req.body.name,
        tasks: ''
    };

    // Find the project in projects array by _id
    Project.updateOne({'id': id}, project, (err, obj) => {
        // Throws error
        if(err)
            return res.status(400).json(err);

        // Return
        return res.status(200).json(Project);
    });

    // Return the project array
    return res.json(project);
})

// DELETE - Delete a project
app.delete('/projects/:id', checkProjectExists, (req, res) => {
    // Get id from url
    const {id} = req.params;
    // Find the projectIndex by _id and Remove
    Project.deleteOne({'id': id}, (err, obj) => {
        // Throws error
        if(err)
            throw err;

            // Return
        return res.status(200).json({'message': 'Project Deleted'});
    });
});

// Middleware Functions
function checkProjectExists(req, res, next){
    // Get id from url and name of body
    const {id} = req.params;

    Project.findOne({'id': id}).then((doc) => {
        // Go for next function
        if(doc)
            return next();
        else
            return res.status(400).json({error: "Project doesn't Exists!"});
    });
}

function checkProjectCreated(req, res, next){
    // Get id from url and name of body
    const {id} = req.body;

    Project.findOne({'id': id}).then((doc) => {
        // Go for next function
        if(doc)
            return res.status(400).json({error: "Project already Created!"});
        else
            return next();
    });
}

// TO DO LIST
// Validate params of req in POST, PUT, DELETE <<< SEE ANYTHING LIKE POST SCHEMA
// New method GET projects/:id to grab only one project info
// New method PUT projects/:id/task to add new task to project
// New method DELETE projects/:id/task/:id to delete a task