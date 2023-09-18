import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailException extends HttpException {
  constructor() {
    super('O email já foi cadastrado!', HttpStatus.BAD_REQUEST);
  }
}
