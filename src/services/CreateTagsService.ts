import { getCustomRepository } from 'typeorm';
import TagsRepositories from '../repositories/TagsRepositories';

export default class CreateTagsService {
  async execute(name: string) {
    const tagRepositories = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error('incorrect name');
    }

    const tagAlreadyExists = await tagRepositories.findOne({
      name,
    });

    if (tagAlreadyExists) {
      throw new Error('Tag already exists');
    }

    const tag = await tagRepositories.create({
      name,
    });
    await tagRepositories.save(tag);

    return tag;
  }
}
