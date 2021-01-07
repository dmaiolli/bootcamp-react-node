import React, { useState,  useEffect} from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App(){
    const [projects, setProjects] = useState([]);
    // useState retorna um array com 2 posições

    // 1. Variavel com seu valor inicial
    // 2. Função para atualizarmos esse valor

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data)
        })
    }, [projects])

    function handleAddProject() {
        setProjects([...projects, `Novo projeto ${Date.now()}`]);
    }

    return (
    <>  
        <Header title="Projects" />

        <ul>
            {projects.map(project => {
                return <li key={project.id}>{project.title}</li>
            })}
        </ul>

        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
    );
}

export default App;