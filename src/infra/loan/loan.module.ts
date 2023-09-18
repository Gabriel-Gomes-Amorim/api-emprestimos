import { Module } from '@nestjs/common';
import { LoanRepository } from './repository/loan.repository';
import { LoanController } from './http/loan.controller';
import { LoanService } from 'src/domain/loan/loan.service';

@Module({
  controllers: [LoanController],
  providers: [LoanService, LoanRepository],
})
export class LoanModule {}
