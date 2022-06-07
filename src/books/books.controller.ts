import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { title } from 'process';
import { BooksService } from './books.service';

@Controller('book')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  printHello() {
    return 'Hello, World';
  }

  @Get()
  getBooks(
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('category') category: string
    ) {
    return this.booksService.getBooks(title, author, category);
  }

  @Get()
  getOneBook(@Param('id') id: string) {
    return this.booksService.getOneBook(id)
  }

  @Post()
  createBook(
    @Body('name') name: string,
    @Body('author') author: string,
    @Body('category') category: string
    ) {
    return this.booksService.createBook(name, author, category);
  }

  @Put('/:id')
  updateBook(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('author') author: string,
    @Body('category') category: string
    ) {
    return this.booksService.updateBook(id, name, author, category);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id)
  }
}
