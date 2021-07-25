const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(express.json());
app.use(cors());

const idIsValid = (req, res, next) => {
  const { id } = req.params;

  if(!isUuid(id)){
    return res.status(400).json({ error: 'id is not valid!' });
  }

  return next();
};

app.use('/repositories/:id', idIsValid);

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } =  req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);
  res.status(201).json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } =  req.body;

  const repositoryIndex = repositories.findIndex(repo => {
    return repo.id === id;
  })

  if (repositoryIndex <= -1) {
    return res.status(404).json({ error: 'repository not found!' });
  }

  const repository = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs,
  }

  repositories[repositoryIndex] = repository;
  res.status(201).json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repo => {
    return repo.id === id;
  })

  if (repositoryIndex <= -1) {
    return res.status(404).json({ error: 'repository not found!' });
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).json('');
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  
  const repository = repositories.find(repo => repo.id === id);

  if (!repository) {
    return res.status(404).json({ error: 'repository not found!' });
  }
  
  repository.likes += 1;

  return res.status(200).json(repository);
});

module.exports = app;
