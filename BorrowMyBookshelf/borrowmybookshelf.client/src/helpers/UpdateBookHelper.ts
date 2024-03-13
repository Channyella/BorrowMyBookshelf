import { Genre } from '../models/Genre';
import { BookFormat } from '../models/UserBook';
import { Post, Put, Delete } from './NetworkHelper';

export const createAuthor = (firstName: string, middleName: string | undefined, lastName: string) => {
    const author = {
        'firstName': firstName,
        'middleName': middleName,
        'lastName': lastName,
    };
    return Post<number>('/api/authors', author);
};

export const updateBook = async (bookId: number, title: string, authorId: number, description: string | undefined, pageCount: number | undefined, audioLength: number | undefined) => {
    const book = {
        'title': title,
        'authorId': authorId,
        'description': description,
        'pageCount': pageCount,
        'audioLength': audioLength,
    };
    Put(`/api/books/${bookId}`, book);
};

export const updateUserBook = async (userBookId: number, bookId: number, borrowable: boolean, bookFormat: BookFormat, userId: number) => {
    const userBook = {
        'bookId': bookId,
        'borrowable': borrowable,
        'bookFormat': bookFormat,
        'userId': userId,
    };
    Put(`/api/userBooks/${userBookId}`, userBook);
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

export const deleteBookGenre = async (bookId: number, genreId: number) => {
    return Delete(`/api/bookGenres/books/${bookId}/genres/${genreId}`)
}

export const updateBookGenres = async (bookId: number, originalGenres: Genre[], updatedGenres: string[]) => {
    const genresToAdd = updatedGenres.filter((genreName: string) => !originalGenres.some((genre: Genre) => genre.genreType === genreName));
    const genresToDelete = originalGenres.filter((genre: Genre) => !updatedGenres.some(genreName => genre.genreType === genreName));
    return Promise.all([...genresToAdd.map(genreName => createGenre(genreName).then(genreId => createBookGenre(bookId, genreId))), ...genresToDelete.map(genre => deleteBookGenre(bookId, genre.genreId))]);
};

export async function UpdateBookOnBookshelf(
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
        userBookId,
        updatedGenres,
        originalGenres,
    }: {
        firstName?: string,
        middleName?: string,
        lastName?: string,
        title: string,
        authorId?: number,
        description?: string,
        pageCount?: number,
        audioLength?: number,
        bookId: number,
        borrowable: boolean,
        bookFormat: BookFormat,
        userId: number,
        userBookId: number,
        updatedGenres: string[],
        originalGenres: Genre[],
    }
) {
    if (!authorId) {
        if (!firstName || !lastName) {
            throw new Error('Missing author name.');
        }
        authorId = await createAuthor(firstName, middleName, lastName)
    }
    await Promise.all([updateBook(bookId, title, authorId, description, pageCount, audioLength),
    updateUserBook(userBookId, bookId, borrowable, bookFormat, userId),
    updateBookGenres(bookId, originalGenres, updatedGenres)]);
}