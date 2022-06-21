import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { v4 as uuidv4 } from 'uuid';
// import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { BookRepository } from './repository/books.repository';
import { Book } from './entity/books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async getBooks(filter: FilterBookDto): Promise<Book[]> {
    return await this.bookRepository.getBooks(filter);
  }

  // getOneBook(id: string) {
  //   const bookIdx = this.findBookId(id);
  //   return this.books[bookIdx];
  // }

  // findBookId(id: string) {
  //   const bookIdx = this.books.findIndex((book) => book.id === id);
  //   if (bookIdx === -1) {
  //     throw new NotFoundException(`Book with id ${id} is not found`);
  //   }
  //   return bookIdx;
  // }

  // createBook(createBookDto: CreateBookDto) {
  //   const { title, author, category, year } = createBookDto;
  //   this.books.push({
  //     id: uuidv4(),
  //     title,
  //     author,
  //     category,
  //     year,
  //   });
  // }

  // updateBook(id: string, updateBookDto: UpdateBookDto) {
  //   const { title, author, category, year } = updateBookDto;
  //   const bookIdx = this.findBookId(id);
  //   this.books[bookIdx].title = title;
  //   this.books[bookIdx].author = author;
  //   this.books[bookIdx].category = category;
  //   this.books[bookIdx].year = year;
  // }

  // deleteBook(id: string) {
  //   const bookIdx = this.findBookId(id);
  //   this.books.splice(bookIdx, 1);
  // }
}
