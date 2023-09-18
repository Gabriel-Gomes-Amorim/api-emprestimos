import { HttpException, HttpStatus } from '@nestjs/common';

export class TypeException extends HttpException {
  constructor() {
    super('Esse tipo de empréstimo já existe!', HttpStatus.BAD_REQUEST);
  }
}
