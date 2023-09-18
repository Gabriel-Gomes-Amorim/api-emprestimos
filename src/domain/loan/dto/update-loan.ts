import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDTO } from './create-loan.dto';

export class UpdateLoanDTO extends PartialType(CreateLoanDTO) {}
