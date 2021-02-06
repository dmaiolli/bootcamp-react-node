import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs'; // Compara uma senha criptografada com uma não criptografada e ve se elas batem
import { sign, verify } from 'jsonwebtoken'; //

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
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

    // Gerando um token pro usuário já autenticado
    // 1º Parametro = payload, informações que vamos utilizar dentro do frontend(permissões...)
    // 2º Parâmetro = Chave secreta
    // 3º Parâmetro = Algumas configurações

    const token = sign({}, '21d651d6a534b6d659a2370ca56aceb3', {
      subject: user.id, // A qual usuários estamos nos "referindo"
      expiresIn: '1d', // Quanto tempo dura esse token
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
