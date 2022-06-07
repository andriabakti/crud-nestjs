import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class BooksService {
    private books: any[] = [];

    getBooks(title: string, author: string, category: string): any[] {
        const books = this.books.filter((book) => {
            let isMatch = false
            if (title && book.title != title) {
                isMatch = false
            }
            if (author && book.author != author) {
                isMatch = false
            }
            if (category && book.category != category) {
                isMatch = false
            }
            return isMatch
        })
        return this.books;
    }

    getOneBook(id: string) {
        const bookIdx = this.findBookId(id)
        return this.books[bookIdx]
    }

    findBookId(id: string) {
        const bookIdx = this.books.findIndex((book) => book.id === id)
        if (bookIdx === -1) {
            throw new NotFoundException(`Book with id ${id} is not found`);
        }
        return bookIdx;
    }

    createBook(title: string, author: string, category: string) {
        this.books.push({
            id: uuidv4(),
            title,
            author,
            category
        });
    }

    updateBook(id: string, title: string, author: string, category: string) {
        const bookIdx = this.findBookId(id);
        this.books[bookIdx].title = title;
        this.books[bookIdx].author = author;
        this.books[bookIdx].category = category;
    }

    deleteBook(id: string) {
        const bookIdx = this.findBookId(id)
        this.books.splice(bookIdx, 1);
    }
}
