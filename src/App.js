import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=> {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  function handleAddRepository() {
    api.post('repositories',{
      title: `Conceitos Node - ${Date.now()}`,
      url: "https://github.com/Vimai/conceitos-nodejs",
      techs: ['Node', 'React']
    }).then(response => {
      setRepositories([...repositories , response.data]);
    });
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      setRepositories(repositories.filter(
        repository => repository.id != id
      ));
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => {
          return (
            <li key={repositorie.id}>
                {repositorie.title}
                <button onClick={() => handleRemoveRepository(repositorie.id)}>
                  Remover
                </button>
            </li>
          )}
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
