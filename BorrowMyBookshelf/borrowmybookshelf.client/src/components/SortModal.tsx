import React, { useState } from 'react';
import './ConfirmModal.css';
import { Book } from '../models/Book';
import { getAuthorFullName } from '../models/Author';
export type SortFunction = (a: Book, b: Book) => number;
type SortFunctionSetter = () => SortFunction;
interface SortModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    setSort: (sortFunctionSetter: SortFunctionSetter) => void;
}

export enum SortOption {
    Title = 1,
    Author = 2,
    PageCount = 3,
    AudioLength = 4,
    AuthorLastName = 5
}

type GetProp = (book: Book) => string | number | undefined;
const sortBy = (getProp: GetProp, reverse: boolean = false) => {
    return (a: Book, b: Book) => {
        const propA = getProp(a);
        const propB = getProp(b);
        if (propA === undefined) {
            return -1;
        }
        if (propB === undefined) {
            return 1;
        }
        const multiplier = reverse ? -1 : 1;
        if (propA > propB) {
            return 1 * multiplier;
        } else if (propA === propB) {
            return 0;
        } else {
            return -1 * multiplier;
        }
    }
}
const getTitle = (book: Book) => book.title.toLowerCase();
const getAuthor = (book: Book) => getAuthorFullName(book.author).toLowerCase();
const getPageCount = (book: Book) => book.pageCount ;
const getAudioLength = (book: Book) => book.audioLength;
const getAuthorLastName = (book: Book) => book.author.lastName.toLowerCase();



const getSorter = (sortOption: SortOption, reverse: boolean = false): SortFunction => {
    switch (sortOption) {
        case SortOption.Title: return sortBy(getTitle, reverse);
        case SortOption.Author: return sortBy(getAuthor, reverse);
        case SortOption.PageCount: return sortBy(getPageCount, reverse);
        case SortOption.AudioLength: return sortBy(getAudioLength, reverse);
        case SortOption.AuthorLastName: return sortBy(getAuthorLastName, reverse)
    }
}

const SortModal: React.FC<SortModalProps> = ({ message, onConfirm, onCancel, setSort }) => {
    const [sortOption, setSortOption] = useState<SortOption>(SortOption.Title);
    const handleSortOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortOption(parseInt(event.target.value) as unknown as SortOption);
    };

    const ascending = () => {
        setSort(() => getSorter(sortOption));
        onConfirm();
    }

    const descending = () => {
        const reverse = true;
        setSort(() => getSorter(sortOption, reverse));
        onConfirm();
    }

    return (
        <div className='confirm-modal'>
            <div className="modal-content">
                <p>{message}</p>
                <div className="radio-button-container">
                    <input type="radio"
                        id="Title"
                        name="format"
                        value={SortOption.Title}
                        onChange={handleSortOptionChange} />
                    <label htmlFor="Title">Title</label>
                    <input type="radio"
                        id="Author"
                        name="format"
                        value={SortOption.Author}
                        onChange={handleSortOptionChange} />
                    <label htmlFor="Author">Author First Name</label>
                    <input type="radio"
                        id="PageCount"
                        name="format"
                        value={SortOption.PageCount}
                        onChange={handleSortOptionChange} />
                    <label htmlFor="PageCount">Page Count</label>
                    <input type="radio"
                        id="AudioLength"
                        name="format"
                        value={SortOption.AudioLength}
                        onChange={handleSortOptionChange} />
                    <label htmlFor="AudioLength">Audio Length</label>
                    <input type="radio"
                        id="AuthorLastName"
                        name="format"
                        value={SortOption.AuthorLastName}
                        onChange={handleSortOptionChange} />
                    <label htmlFor="AuthorLastName">Author Last Name</label>
                </div>
                <div className="buttons">
                    <div>
                        <button onClick={ascending}>Sort Ascending</button>
                        <button onClick={descending}>Sort Descending</button>
                    </div>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default SortModal;