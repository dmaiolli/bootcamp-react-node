/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      // await pois nosso método execute é assíncrono
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// Usamos o patch quando queremos atualizar apenas uma informação, do contrário usariamos o método put
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  // Novo middleware
  upload.single('avatar'),
  async (request, response) => {
    // Para alterar o avatar do nosso usuário, precisamos que ele esteja autenticado, para isso o middleware ensureAuthenticated
    console.log(request.file);

    return response.json({ message: 'ok' });
  },
);

export default usersRouter;
