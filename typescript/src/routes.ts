import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        name: 'Denys',
        email: 'denys@maiolli',
        password: '1515',
				techs: [
					'Node.js',
					'React Native',
					'React JS',
				    { title: 'Javascript', experience: 100 },
				]
    });

    return response.json({ message: 'Hello World'})
}