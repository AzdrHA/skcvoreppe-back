import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(content: string, status?: HttpStatus) {
    super(
      {
        status: status ?? HttpStatus.BAD_REQUEST,
        error: content,
      },
      status ?? HttpStatus.BAD_REQUEST,
    );
  }
}
