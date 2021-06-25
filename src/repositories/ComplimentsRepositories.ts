import { EntityRepository, Repository } from 'typeorm';
import Compliment from '../models/Compliment';

@EntityRepository(Compliment)
export default class ComplimentsRepository extends Repository<Compliment> {}
