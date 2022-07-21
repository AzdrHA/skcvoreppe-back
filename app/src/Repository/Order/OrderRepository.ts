import { DefaultRepository } from '@Repository/DefaultRepository';
import { Order } from '@Entity/Order/Order';
import { CustomRepository } from '../../typeorm-ex.decorator';

@CustomRepository(Order)
export class OrderRepository extends DefaultRepository<Order> {
  public findCurrentCard = (id: string) => {
    return this.createQueryBuilder('o')
      .leftJoin('o.owner', 'owner')
      .where('owner.id = :owner_id')
      .andWhere('o.status IN (:...status)')
      .setParameters({
        owner_id: id,
        status: ['open', 'submitted'],
      })
      .getOne();
  };
}
