import { BookFormat } from '../models/UserBook';
import { Post } from './NetworkHelper';

export const createAuthor = (firstName: string, middleName: string | undefined, lastName: string) => {
    const author = {
        'firstName': firstName,
        'middleName': middleName,
        'lastName': lastName,
    };
    return Post<number>('/api/authors', author);
};

export const createBook = async (title: string, authorId: number, description: string | undefined, pageCount: number | undefined, audioLength: number | undefined) => {
    const book = {
        'title': title,
        'authorId': authorId,
        'decription': description,
        'pageCount': pageCount,
        'audioLength': audioLength,
    };
    return Post<number>('/api/books', book);
};

export const createUserBook = async (bookId: number, borrowable: boolean, bookFormat: BookFormat, userId: number) => {
    const userBook = {
        'bookId': bookId,
        'borrowable': borrowable,
        'bookFormat': bookFormat,
        'userId': userId,
    };
    return Post<number>('/api/userBooks', userBook);
};

export const createBookshelfBook = async (bookshelfId: number, userBookId: number) => {
    const bookshelfBook = {
        'bookshelfId': bookshelfId,
        'userBookId': userBookId,
    };
    return Post<number>('/api/bookshelfBooks', bookshelfBook);
};

export const createGenre = async (genreType: string) => {
    const genre = {
        'genreType': genreType,
    };
    return Post<number>('/api/genres', genre);
};

export const createBookGenre = async (bookId: number, genreId: number) => {
    const bookGenre = {
        'bookId': bookId,
        'genreId': genreId,
    };
    return Post<number>('/api/bookGenres', bookGenre);
};

export async function AddBookToBookshelf(
    {
        firstName,
        middleName,
        lastName,
        title,
        authorId,
        description,
        pageCount,
        audioLength,
        bookId,
        borrowable,
        bookFormat,
        userId,
        bookshelfId,
        userBookId,
        genreTypes,
        genreIds,
    }: {
        firstName?: string,
        middleName?: string,
        lastName?: string,
        title: string,
        authorId?: number,
        description?: string,
        pageCount?: number,
        audioLength?: number,
        bookId?: number,
        borrowable: boolean,
        bookFormat: BookFormat,
        userId: number,
        bookshelfId: number,
        userBookId?: number,
        genreTypes: string[],
        genreIds?: number[],
    }
) {

    if (!bookId) {
        if (!authorId) {
            if (!firstName || !lastName) {
                throw new Error('Missing author name.');
            }
            authorId = await createAuthor(firstName, middleName, lastName)
        }
        bookId = await createBook(title, authorId, description, pageCount, audioLength);
    }
    const guaranteedBookId = bookId;
    userBookId = await createUserBook(bookId, borrowable, bookFormat, userId);
    await createBookshelfBook(bookshelfId, userBookId);
    genreIds = await Promise.all(genreTypes.map(genreType => createGenre(genreType)));
    await Promise.all(genreIds.map(genreId => createBookGenre(guaranteedBookId, genreId)));
       
}