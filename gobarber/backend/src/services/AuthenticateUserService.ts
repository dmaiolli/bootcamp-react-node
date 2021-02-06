import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs'; // Compara uma senha criptografada com uma não criptografada e ve se elas batem

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // user.password = nossa senha criptografada
    // password = senha não criptografada que ele tentou fazer login

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }
    // Se passou até aqui = Usuário autenticado

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
