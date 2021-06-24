import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  admin: boolean;
}

export default class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
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
    const user = await userRepository.create({ name, email, admin });
    await userRepository.save(user);
    return user;
  }
}
