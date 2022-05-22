import { Controller, Get } from '@nestjs/common';

@Controller('book')
export class BooksController {
  @Get()
  printHello() {
    return 'Hello, World';
  }
}
