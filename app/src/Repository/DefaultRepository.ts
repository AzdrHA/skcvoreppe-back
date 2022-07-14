import { Repository } from 'typeorm';

export abstract class DefaultRepository<T> extends Repository<T> {}
