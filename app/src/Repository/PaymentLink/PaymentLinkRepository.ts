import { DefaultRepository } from '@Repository/DefaultRepository';
import { CustomRepository } from '../../typeorm-ex.decorator';
import { PaymentLink } from '@Entity/PaymentLink/PaymentLink';

@CustomRepository(PaymentLink)
export class PaymentLinkRepository extends DefaultRepository<PaymentLink> {}
