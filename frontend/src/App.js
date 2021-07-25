import React, { useState, useEffect } from 'react';

import { Header } from './components/Header';
import api from './services/api';

export const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  const handleAddProject = async () => {
    const response = await api.post('/projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Gustavo Oliveira",
    })

    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="projects" />
      <ul>
        {projects.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar Projeto
      </button>
    </>
  );
}