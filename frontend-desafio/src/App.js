import React, { useState, useEffect } from "react";
import { api } from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  const handleAddRepository = async () => {
    const newRepository = { 
      title: `New Repository ${new Date()}`,
      url: 'https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
      techs: ['Node.js', 'Reacj.js', 'React Native']
    }

    api.post('/repositories', newRepository).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  const handleRemoveRepository= async (id) => {
    await api.delete(`/repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  const handleLikeRepository = async (id) => {
    await api.post(`/repositories/${id}/like`);
    setRepositories(repositories.filter(repository => {
      if(repository.id === id) {
        repository.likes += 1;
        return repository;
      }else {
        return repository;
      }
    }))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>
              {repo.title} - like: {repo.likes}
              <button 
                onClick={() => handleLikeRepository(repo.id)}>
                Like
              </button>
              <button 
                onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
