import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './repository/books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
