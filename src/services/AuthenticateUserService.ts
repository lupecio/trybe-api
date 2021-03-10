import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const user = new User();
    user.email = email;
    user.password = password;

    const onlyNumber = /^[-+]?[0-9]+$/;
    if (!email || !onlyNumber.test(user.password) || user.password.length !== 6) {
      throw new AppError('Campos inválidos');
    }

    const checkEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!checkEmail.test(user.email.toLowerCase())) {
      throw new AppError('Campos inválidos');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.email,
      expiresIn,
    });

    return {
      token
    };
  }
}

export default AuthenticateUserService;
