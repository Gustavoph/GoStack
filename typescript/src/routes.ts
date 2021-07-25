import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export const helloWorld = (request: Request, response: Response) => {
  const user = createUser({ 
    name: 'Gustavo', 
    email: 'gusta@gmail.com', 
    password: '123456',
    techs: [
      'Noje.js',
      'React.js',
      'React Native',
      { title: 'JavaScript', experience: 100 },
    ]
  })
  return response.json({ message: 'Hello World' });
};
