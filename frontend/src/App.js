import React, { useState } from 'react';

import './App.css';
import backgroundImage from './assets/background.jpg';

import Header from './components/Header';

function App(){
    const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);
    // useState retorna um array com 2 posições

    // 1. Variavel com seu valor inicial
    // 2. Função para atualizarmos esse valor

    function handleAddProject() {
        setProjects([...projects, `Novo projeto ${Date.now()}`]);
    }

    return (
    <>  
        <Header title="Projects" />

        <img width={300} src={backgroundImage} alt=""/>

        <ul>
            {projects.map(project => {
                return <li key={project}>{project}</li>
            })}
        </ul>

        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
    );
}

export default App;