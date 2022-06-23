import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Book } from './entity/books.entity';
import { UUIDValidationPipe } from './../pipes/uuid-validation.pipe';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './../users/entity/users.entity';
import { JwtGuard } from './../guard/jwt.guard';

@Controller('books')
@UseGuards(JwtGuard)
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks(
    @Query() filter: FilterBookDto,
    @GetUser() user: User,
  ): Promise<Book[]> {
    return this.booksService.getBooks(user, filter);
  }

  @Get('/:id')
  async getOneBook(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<Book> {
    return this.booksService.getBookById(user, id);
  }

  @Post()
  async createBook(
    @GetUser() user: User,
    @Body() payload: CreateBookDto,
  ): Promise<void> {
    return this.booksService.createBook(user, payload);
  }

  @Put('/:id')
  async updateBook(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateBookDto,
  ): Promise<void> {
    return this.booksService.updateBook(user, id, payload);
  }

  @Delete('/:id')
  async deleteBook(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<void> {
    return this.booksService.deleteBook(user, id);
  }
}
