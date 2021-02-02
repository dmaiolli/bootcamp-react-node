import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello World' }),
);

routes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const user = {
    provider,
    date,
  };

  return response.json(user);
});

export default routes;
