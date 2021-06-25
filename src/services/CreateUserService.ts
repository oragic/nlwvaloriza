import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UserRepository from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

export default class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    // If user was created_at
    const userRepository = getCustomRepository(UserRepository);
    if (!email) {
      throw new Error('email incorrect');
    }
    const userAlreadyExists = await userRepository.findOne({
      email,
    });
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }
    const passwordHash = await hash(password, 8);
    const user = await userRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });
    await userRepository.save(user);
    return user;
  }
}
