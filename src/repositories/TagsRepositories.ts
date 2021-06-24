import { EntityRepository, Repository } from 'typeorm';
import Tag from '../models/Tag';

@EntityRepository(Tag)
export default class TagsRepositories extends Repository<Tag> {}
