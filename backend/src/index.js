const express = require('express');

const app = express();

app.get('/projects', (request, response) => {
	return response.json([
		'Projeto 1',
		'Projeto 2',
	])
})

app.post('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 2',
        'Projeto 3'
    ])
})

app.listen(3333, () => {
    console.log('🚀 Back-end started!')
})