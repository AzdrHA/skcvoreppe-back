import { Repository as BaseRepository } from 'typeorm';

export abstract class DefaultServiceCommand<
  Repository extends BaseRepository<any>,
> {
  private readonly repository: Repository;
  constructor(repository: Repository) {
    this.repository = repository;
  }

  public getRepository(): Repository {
    return this.repository;
  }

  public save(entity) {
    return this.repository.save(entity);
  }
}
