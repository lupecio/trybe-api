import AuthenticateUserService from '../src/services/AuthenticateUserService';
import AppError from '../src/errors/AppError';

test('login user', async() => {
  const authenticateUser = new AuthenticateUserService();

  const token = await authenticateUser.execute({
    email: 'lucas@123.com',
    password: '123456'
  });

  expect(token).toBeDefined();
});

test('login user with wrong email', async() => {
  const authenticateUser = new AuthenticateUserService();

  await expect(authenticateUser.execute({
    email: 'lucas123.com',
    password: '123456'
  })).rejects.toBeInstanceOf(AppError)
});

test('login user with wrong password', async() => {
  const authenticateUser = new AuthenticateUserService();

  await expect(authenticateUser.execute({
    email: 'lucas123@asd.com',
    password: '12345a6'
  })).rejects.toBeInstanceOf(AppError)
});
