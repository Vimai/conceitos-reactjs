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
      techs: "Node"
    }).then(response => {
      setRepositories([...repositories , response.data]);
    });
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${repositories[id].id}`).then(response => {
      let repo = [...repositories];
      repo.splice(id, 1)
      setRepositories(repo);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie, index) => {
          return (
            <li key={repositorie.id}>
                {repositorie.title}
                <button onClick={() => handleRemoveRepository(index)}>
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
