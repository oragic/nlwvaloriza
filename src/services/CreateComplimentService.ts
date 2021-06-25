import { getCustomRepository } from 'typeorm';
import ComplimentsRepositories from '../repositories/ComplimentsRepositories';
import UsersRepositories from '../repositories/UsersRepositories';

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export default class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complementsRepositories = getCustomRepository(
      ComplimentsRepositories,
    );
    const userRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new Error('Incorrect User receiver');
    }

    const userReceiverExists = await userRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error('User Receiver does not exists');
    }
    const compliment = complementsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complementsRepositories.save(compliment);

    return compliment;
  }
}
