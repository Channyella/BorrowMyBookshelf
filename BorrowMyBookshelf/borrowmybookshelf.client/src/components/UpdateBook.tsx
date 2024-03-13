import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { BookFormat, UserBook } from '../models/UserBook';
import { UpdateBookOnBookshelf } from '../helpers/UpdateBookHelper';

export default function UpdateBook() {
    const userBookId = useParams<{ userBookId: string }>().userBookId ?? "";
    const userInfo = GetCurrentUser();
    const [userBook, setUserBook] = useState<UserBook| null>(null);

    const userId = userInfo?.userId ?? -1;
    const navigate = useNavigate();

    // Form fields
    const [title, setTitle] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [format, setFormat] = useState<BookFormat>(BookFormat.Hardcover);
    const [length, setLength] = useState<string>('');
    const [borrowable, setBorrowable] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [genreList, setGenreList] = useState<string[]>([]);

    // Form field Change Event Functions
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleMiddleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMiddleName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormat(event.target.value as unknown as BookFormat);
    };

    const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLength(event.target.value);
    };

    const handlePageCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageCount(event.target.value);
    };

    const handleBorrowableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBorrowable(event.target.value === 'true');
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const commaSeparatedList = event.target.value;
        const genreList = commaSeparatedList.split(',').map(genre => genre.trim());
        setGenreList(genreList);
    };

    // Get bookshelfBook passed from the BookDropDownMenu
    const fetchBook = async (id: string) => {
        try {
            const response = await axios.get<UserBook>(`/api/userBooks/${id}/detailed`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            const userBook = response.data;
            setUserBook(userBook);
            setTitle(userBook.book.title);
            setFirstName(userBook.book.author.firstName);
            setMiddleName(userBook.book.author.middleName ?? "");
            setLastName(userBook.book.author.lastName);
            setFormat(userBook.bookFormat);
            userBook.book.pageCount && setPageCount(userBook.book.pageCount.toString());
            userBook.book.audioLength && setLength(userBook.book.audioLength.toString());
            setBorrowable(userBook.borrowable);
            setDescription(userBook.book.description ?? "");
            const genreList = userBook.book.genres.map(x => x.genreType);
            setGenreList(genreList);
            (document.getElementById("genre-input") as HTMLInputElement).value = genreList.join(", ");
            const formatRadioButtons = Array.from(document.getElementsByName("format") as NodeList) as HTMLInputElement[];
            const radioButtonToSelect = formatRadioButtons.find(input => parseInt(input.value) === userBook.bookFormat);
            radioButtonToSelect && (radioButtonToSelect.checked = true);
        } catch (error) {
            console.error('Error fetching books data:', error);
        }
    }

    useEffect(() => {
        if (userBookId) {
            fetchBook(userBookId);
        }
    }, [userBookId]);

    // Change this to update the bookshelf-book using the id of the book
    async function updateBook() {
        await UpdateBookOnBookshelf({
            userBookId: parseInt(userBookId),
            bookId: userBook?.book.bookId ?? -1,
            firstName,
            middleName,
            lastName,
            title,
            description,
            pageCount: pageCount ? parseInt(pageCount) : undefined,
            audioLength: length ? parseInt(length) : undefined,
            borrowable,
            bookFormat: format,
            userId,
            updatedGenres: genreList,
            originalGenres: userBook?.book.genres ?? [],
        });
        navigate(`/`);
    }

    return (
        <div className="create-book outlet-content template d-flex justify-content-center align-items-center yellow-bg">
            <div className='form-container-forms p-5 rounded bg-white'>
                <form id="new-book">
                    <h3 className="text-center">Create New Book</h3>
                    <div className='mb-2'>
                        <label htmlFor="title">Title</label>
                        <input type="text"
                            value={title}
                            placeholder="Enter Title"
                            className='form-control'
                            name="title"
                            onChange={handleTitleChange} />
                    </div>
                    <div>
                        <h5 className="text-center">Author&apos;s Name:</h5>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text"
                            value={firstName}
                            placeholder="Enter First Name"
                            className='form-control'
                            name="first_name"
                            onChange={handleFirstNameChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="authorMiddleName">Middle Name</label>
                        <input type="text"
                            value={middleName}
                            placeholder="Enter Middle Name"
                            className='form-control'
                            name="middle_name"
                            onChange={handleMiddleNameChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="authorLastName">Last Name</label>
                        <input type="text"
                            value={lastName}
                            placeholder="Enter Last Name"
                            className='form-control'
                            name="last_name"
                            onChange={handleLastNameChange}
                        />
                    </div>

                    <div className="radio-button-container">
                        <input type="radio"
                            id="hardcover"
                            name="format"
                            value={BookFormat.Hardcover}
                            onChange={handleFormatChange} />
                        <label htmlFor="hardcover">Hardcover</label>
                        <input type="radio"
                            id="paperback"
                            name="format"
                            value={BookFormat.Paperback}
                            onChange={handleFormatChange} />
                        <label htmlFor="paperback">Paperback</label>
                        <input type="radio"
                            id="eBook"
                            name="format"
                            value={BookFormat.eBook}
                            onChange={handleFormatChange} />
                        <label htmlFor="eBook">eBook</label>
                        <input type="radio"
                            id="audioBook"
                            name="format"
                            value={BookFormat.AudioBook}
                            onChange={handleFormatChange} />
                        <label htmlFor="audioBook">Audio Book</label>
                    </div>
                    <div className="">
                        <div className='mb-2'>
                            <label htmlFor="pageCount">Page Count</label>
                            <input type="number"
                                value={pageCount}
                                placeholder="Enter Page Count"
                                className='form-control'
                                name="page_count"
                                onChange={handlePageCountChange} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="audioLength">Audio Length</label>
                            <input type="text"
                                value={length}
                                placeholder="Enter Audio Length"
                                className='form-control'
                                name="audio_length"
                                onChange={handleLengthChange} />
                        </div>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="description">Summary</label>
                        <input type="text"
                            placeholder="Enter Summary"
                            className='form-control'
                            name="description"
                            value={description}
                            onChange={handleDescriptionChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="borrowable">Borrowable?</label>
                        <select id="borrowable"
                            className='form-control'
                            name="borrowable"
                            value={borrowable ? 'true' : 'false'}
                            onChange={handleBorrowableChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="genre">Genre</label>
                        <input type="text"
                            id="genre-input"
                            placeholder="Enter Genres (ex: horror, sci-fi)"
                            className='form-control'
                            name="genre"
                            onChange={handleGenreChange}
                        />
                    </div>
                </form>
                <div className='d-grid'>
                    <button className='btn btn-primary' onClick={updateBook}>Update Book</button>
                </div>
            </div>
        </div>
    )
}