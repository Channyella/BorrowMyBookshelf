import React, { useState } from 'react';
import './ConfirmModal.css';
import { Book } from '../models/Book';
import { Author, getAuthorFullName } from '../models/Author';
import { BookFormat, UserBook } from '../models/UserBook';
import { Genre } from '../models/Genre';

export type FilterFunction = (a: Book, b?: UserBook) => boolean;
type FilterFunctionSetter = () => FilterFunction;

interface FilterModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    setFilter: (filterFunctionSetter: FilterFunctionSetter) => void;
    authors: Author[];
    genres: Genre[];
    hideOnAllBooks?: boolean;
}
type FilterValue = Author | number | Genre[] | boolean | BookFormat;
type GetFilter<T extends FilterValue> = (value: T | null, book: Book, userBook?: UserBook) => boolean;

const getAuthorFilter: GetFilter<Author> = (value: Author | null, book: Book) => !value || book.author.authorId == value.authorId;
const getPageCountFilter = (value: number | null, book: Book, operator: string | null) => {
    if (!value || !operator) {
        return true;
    } else if (!book.pageCount) {
        return false;
    } else if (operator === ">") {
        return !value || book.pageCount > value;
    } else if (operator === "<") {
        return book.pageCount < value;
    } else {
        throw new Error("Unsupported operator");
    }
};
const getAudioLengthFilter = (value: number | null, book: Book, operator: string | null) => {
    if (!value || !operator) {
        return true;
    } else if (!book.audioLength) {
        return false;
    } else if (operator === ">") {
        return !value || book.audioLength > value;
    } else if (operator === "<") {
        return book.audioLength < value;
    } else {
        throw new Error("Unsupported operator");
    }
};
const getGenresFilter: GetFilter<Genre[]> = (value: Genre[] | null, book: Book) => !value ||book.genres.some(genre => value.some(filterGenre => genre.genreId == filterGenre.genreId));
const getBorrowableFilter: GetFilter<boolean> = (value: boolean | null, x: Book, userBook?: UserBook) => value === null || !userBook || userBook.borrowable == value;
const getFormatFilter: GetFilter<BookFormat> = (value: BookFormat | null, x: Book, userBook?: UserBook) => !value || !userBook || userBook.bookFormat == value;

const FilterModal: React.FC<FilterModalProps> = ({ message, onConfirm, onCancel, setFilter, authors, genres, hideOnAllBooks }) => {
    const [author, setAuthor] = useState<Author | null>(null);
    const [pageCount, setPageCount] = useState<number | null>(null);
    const [audioLength, setAudioLength] = useState<number | null>(null);
    const [genresList, setGenresList] = useState<Genre[] | null>(null);
    const [borrowable, setBorrowable] = useState<boolean | null>(null);
    const [format, setFormat] = useState<BookFormat | null>(null);
    const [pageCountComp, setPageCountComp] = useState<string | null>(null);
    const [audioLengthComp, setAudioLengthComp] = useState<string | null>(null);

    const filter = () => {
        setFilter(() => getFilter());
        onConfirm();
    }

    const onClear = () => {
        setFilter(() => () => true);
        onCancel();
    }

    const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedAuthorId = parseInt(event.target.value); 
        const selectedAuthor = authors.find(author => author.authorId === selectedAuthorId);
        setAuthor(selectedAuthor || null);
    }

    const handlePageCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageCount(parseInt(event.target.value) || null); 
    }

    const handlePageCountComp = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageCountComp((event.target.value) || null);
    };

    const handleAudioLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAudioLength(parseInt(event.target.value) || null); 
    }

    const handleAudioLengthComp = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAudioLengthComp((event.target.value) || null);
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGenreIds = Array.from(event.target.selectedOptions).map(option => option.value);
        const selectedGenres = genres.filter(genre => selectedGenreIds.includes(genre.genreId.toString()));
        setGenresList(selectedGenres.length > 0 ? selectedGenres : null);
    }

    const handleBorrowableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const filterValue = event.target.value ? event.target.value === "true" : null;
        setBorrowable(filterValue); 
    }

    const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormat(event.target.value as unknown as BookFormat || null); 
    }

    const getFilter = (): FilterFunction => {
        return (book: Book, userBook?: UserBook) => {
            return getAuthorFilter(author, book) &&
                getPageCountFilter(pageCount, book, pageCountComp) &&
                getAudioLengthFilter(audioLength, book, audioLengthComp) &&
                getGenresFilter(genresList, book) &&
                getBorrowableFilter(borrowable, book, userBook) &&
                getFormatFilter(format, book, userBook)
        }
    }

    return (
        <div className='sort-modal'>
            <div className="sort-modal-content">
                <h5>{message}</h5>

                <label className="fav-labels text-center" htmlFor="author">Select an author:</label>
                <div className="d-flex align-items-center justify-content-center">
                    <select id="author" className="form-select w-50" onChange={handleAuthorChange}>
                        <option value="">Select</option>
                        {Array.from(new Set(authors.map(author => author.authorId))).map(authorId => {
                            const author = authors.find(author => author.authorId === authorId);
                            return author && <option key={author.authorId} value={author.authorId}>{getAuthorFullName(author)}</option>;
                        })}
                    </select>
                </div>

                {!hideOnAllBooks &&
                    (<div>
                        <label className="fav-labels text-center" htmlFor="format">Select a Format:</label>
                        <div className="d-flex align-items-center justify-content-center">
                            <select id="format" className="form-select w-50" onChange={handleFormatChange}>
                                <option value="">Select</option>
                                <option value={BookFormat.AudioBook}> Audio Book </option>
                                <option value={BookFormat.eBook}> eBook </option>
                                <option value={BookFormat.Hardcover}> Hardcover </option>
                                <option value={BookFormat.Paperback}> Paperback </option>
                            </select>
                        </div>
                    </div>)}

                <label className="fav-labels text-center" htmlFor="pageCount">Select Desired Page Length:</label>
                <div className="d-flex align-items-center justify-content-center">
                    <select id="pageCount" className="form-select w-50" onChange={ handlePageCountComp }>
                        <option value="">Select</option>
                        <option value={">"}> &gt; </option>
                        <option value={"<"}> &lt; </option>
                    </select>
                    <input type="text"
                        placeholder="Page #"
                        className="form-control"
                        name="pageAmount"
                        onChange={ handlePageCountChange }
                    />
                </div>

                <label className="fav-labels text-center" htmlFor="audioLength">Select Desired Audio Length:</label>
                <div className="d-flex align-items-center justify-content-center">
                    <select id="audioLength" className="form-select w-50" onChange={ handleAudioLengthComp }>
                        <option value="">Select</option>
                        <option value={">"}> &gt; </option>
                        <option value={"<"}> &lt; </option>
                    </select>
                    <input type="text"
                        placeholder="Audio mins."
                        className="form-control"
                        name="pageAmount"
                        onChange={handleAudioLengthChange}
                    />
                </div>

                <label className="fav-labels text-center" htmlFor="genre">Select Genres:</label>
                <div className="d-flex align-items-center justify-content-center">
                    <select id="genre" className="form-select w-50" onChange={handleGenreChange} multiple>
                        <option value="">Select</option>
                        {Array.from(new Set(genres.map(genre => genre.genreId))).map(genreId => {
                            const genre = genres.find(genre => genre.genreId === genreId);
                            return genre && <option key={genre.genreId} value={genre.genreId}> {genre.genreType} </option>
                        })}
                    </select>
                </div>

                {!hideOnAllBooks &&
                    (<div>
                        <label className="fav-labels text-center" htmlFor="borrowable">Select Borrowablity:</label>
                        <div className="d-flex align-items-center justify-content-center">
                            <select id="borrowable" className="form-select w-50" onChange={handleBorrowableChange}>
                                <option value="">Select</option>
                                <option value={"true"}> Borrowable </option>
                                <option value={"false"}> Not Borrowable </option>        
                            </select>
                        </div>
                </div>)}

                <div className="container">
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-4">
                            <button className="btn btn-danger ml-1" onClick={onCancel}>Cancel</button>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-danger ml-1" onClick={onClear}>Clear</button>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-danger mr-2" onClick={filter}>Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;