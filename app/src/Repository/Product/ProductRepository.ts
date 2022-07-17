import { DefaultRepository } from '@Repository/DefaultRepository';
import { Product } from '@Entity/Product/Product';
import { CustomRepository } from '../../typeorm-ex.decorator';

@CustomRepository(Product)
export class ProductRepository extends DefaultRepository<Product> {}
