import { HttpException, HttpStatus } from '@nestjs/common';

export class TypeDoesNotExistsException extends HttpException {
  constructor(type: string) {
    super(`Tipo de empréstimo ${type} não existe!`, HttpStatus.BAD_REQUEST);
  }
}
