import { DefaultRepository } from '@Repository/DefaultRepository';
import { CustomRepository } from '../../typeorm-ex.decorator';
import { ProductPrice } from '@Entity/Product/ProductPrice';

@CustomRepository(ProductPrice)
export class ProductPriceRepository extends DefaultRepository<ProductPrice> {}
