import { Module } from '@nestjs/common'
import { IndividualOrderModule } from './individual-order/individual-order.module'

@Module({
  imports: [IndividualOrderModule],
})
export class FormsModule {}
