const express = require('express');
const server = express();

server.use(express.json());

let projects = [];
let count = 0;

server.use((req, res, next) => {
  console.log(count);
})

function checkId(req, res, next) {
  if (req.params.id && !projects.find((p) => {
    return p.id === req.params.id;
  })) {
    return res.status(400).json({ error: 'erro' });
  }
  return next();
}

server.post('/projects', (req, res) => {
  console.log(req);
  const { id, title } = req.body;
  const project = { id, title, tasks: [] };

  projects.push(project);
  console.log(projects);

  return res.json(project);
})

server.get('/projects/:id', (req, res) => {
  const { id } = req.params;

  const project = projects.find((p) => {
      return p.id === id;
  })
  return res.json(project)
});

server.put('/projects/:id', checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;  

  const project = projects.find((p) => {
    return p.id === id;
  }); 

  project.title = title;
  return res.json(project);
})

server.delete('/projects/:id', checkId, (req, res) => {
  const { id } = req.params;
   
  const index = projects.findIndex((p) => {
    return p.id === id;
  }); 

  projects.splice(index,1);
  return res.json(true);
})

server.post('/projects/:id/tasks', checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;  

  const project = projects.find((p) => {
    return p.id === id;
  }); 
  const newTask = { title };
  project.tasks.push(newTask);
  console.log(projects);

  return res.json(project);
})
  
server.listen(3000);
