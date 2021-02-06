import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    // user vindo do retorno do service
    const { user } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    // Nunca pegar o resultado de um service e retornar do mesmo jeito, ainda mais se for uma variável tão genérica como "response", pois não sabemos oque estamos retornando pro usuário

    return response.json({ user });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
