import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateLoanDTO } from 'src/domain/loan/dto/create-loan.dto';
import { ILoanRequirements, LoanService } from 'src/domain/loan/loan.service';
import { UpdateLoanDTO } from 'src/domain/loan/dto/update-loan';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('/create')
  async createLoan(
    @Body() createLaonDTO: CreateLoanDTO,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    try {
      const loan = await this.loanService.create(createLaonDTO);

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Empréstimo cadastrado com sucesso!', loan });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'erro ao cadastrar Empréstimo!', error: error });
    }
  }

  @Post('/check-available-loan-types')
  async typesOfLoansAvailable(
    @Body() iLoanRequirements: ILoanRequirements,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    try {
      const permittedLoanTypes =
        await this.loanService.userPermittedLoans(iLoanRequirements);

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Empréstimo permitidos', permittedLoanTypes });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'erro ao verificar empréstimos disponíveis!',
        error: error,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      const loans = await this.loanService.findAll();

      return res.status(HttpStatus.OK).json(loans);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'erro ao buscar empréstimos!', error: error });
    }
  }

  @Get(':id')
  async show(
    @Param('id')
    id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const loan = await this.loanService.findById(id);

      return res.status(HttpStatus.OK).json(loan);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'erro ao buscar empréstimo!', error: error });
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateLoanDTO,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    try {
      const updateLoan = await this.loanService.update(id, data);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Empréstimo atualizado com sucesso!', updateLoan });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'erro ao atualizar o empréstimo!', error: error });
    }
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.loanService.remove(id);
  }
}
