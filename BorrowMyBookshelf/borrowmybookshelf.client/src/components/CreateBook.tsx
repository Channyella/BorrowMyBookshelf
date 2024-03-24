import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { Bookshelf } from '../models/Bookshelf';
import { BookFormat } from '../models/UserBook';
import { AddBookToBookshelf } from '../helpers/BookHelper';
import OKModal from './OKModal';
import AudioLengthInput from './AudioLengthInput';

export default function CreateBook() {
    const bookshelfId = useParams<{ bookshelfId: string }>().bookshelfId ?? "";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [bookshelf, setBookshelf] = useState<Bookshelf | null>(null);
    const userInfo = GetCurrentUser();
    const userId = userInfo?.userId ?? -1;
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [format, setFormat] = useState<BookFormat | null>(null);
    const [length, setLength] = useState<number | undefined>();
    const [borrowable, setBorrowable] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const charCount: number = description.length;
    const maxLength: number = 2500;
    const [genreList, setGenreList] = useState<string[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        setIsValid(!!title && !!firstName && !!lastName && !!format &&
            charCount <= maxLength)
    }, [title, firstName, lastName, format, description])

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

    const handlePageCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageCount(event.target.value);
    };

    const handleBorrowableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBorrowable(event.target.value === 'true');
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText: string = event.target.value;
        if (newText.length <= maxLength) {
            setDescription(newText);
        } else {
            setShowModal(true);
            setDescription(newText);
        }
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const commaSeparatedList = event.target.value;
        const genreList = commaSeparatedList.split(',').map(genre => genre.trim()).filter(x => !!x);
        setGenreList(genreList);
    };

    const fetchBookshelf = async (id: string) => {
        try {
            const response = await axios.get<Bookshelf>(`/api/bookshelves/${id}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setBookshelf(new Bookshelf(response.data));
        } catch (error) {
            console.error('Error fetching bookshelf data:', error);
        }
    }

    useEffect(() => {
        if (bookshelfId) {
            fetchBookshelf(bookshelfId);
        }
    }, [bookshelfId]);
    async function goBack() {
        navigate(-1);
    }

    async function createBook() {
        await AddBookToBookshelf({
            firstName,
            middleName,
            lastName,
            title,
            description,
            pageCount: pageCount ? parseInt(pageCount) : undefined,
            audioLength: length,
            borrowable,
            bookFormat: format ?? BookFormat.Hardcover,
            userId,
            bookshelfId: parseInt(bookshelfId),
            genreTypes: genreList
        });
        navigate(`/bookshelf-books/${bookshelfId}`);
    }

    return (
        <div className="create-book outlet-content template yellow-bg ">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <button onClick={goBack} className="btn btn-success mt-3 ms-3"> <img src="/back_arrow.png" alt="Go Back" /> </button>
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-12 ">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className='form-container-forms p-5 rounded bg-white'>
                                <form id="new-book">
                                    <h3 className="text-center">Create New Book</h3>
                                    <div className='mb-2'>
                                        <label htmlFor="title">Title*:</label>
                                        <input type="text"
                                            value={title}
                                            placeholder="Enter Title"
                                            className='form-control'
                                            name="title"
                                            id="title"
                                            required
                                            aria-describedby="titleNote"
                                            onChange={handleTitleChange} />
                                    </div>
                                    <div>
                                        <h5 className="text-center">Author&apos;s Name:</h5>
                                    </div>
                                    <div className='mb-2'>
                                        <label htmlFor="first-name">First Name*:</label>
                                        <input type="text"
                                            value={firstName}
                                            placeholder="Enter First Name"
                                            className='form-control'
                                            name="first-name"
                                            id="first-name"
                                            required
                                            onChange={handleFirstNameChange}
                                        />
                                    </div>
                                    <div className='mb-2'>
                                        <label htmlFor="middle-name">Middle Name:</label>
                                        <input type="text"
                                            value={middleName}
                                            placeholder="Enter Middle Name"
                                            className='form-control'
                                            name="middle-name"
                                            id="middle-name"
                                            onChange={handleMiddleNameChange}
                                        />
                                    </div>
                                    <div className='mb-2'>
                                        <label htmlFor="last-name">Last Name*:</label>
                                        <input type="text"
                                            value={lastName}
                                            placeholder="Enter Last Name"
                                            className='form-control'
                                            name="last_name"
                                            id="last-name"
                                            onChange={handleLastNameChange}
                                        />
                                    </div>


                                    <div className="radio-button-container">
                                        <p className="format-margin">Format*:</p>
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
                                            <label htmlFor="pageCount">Page Count:</label>
                                            <input type="number"
                                                value={pageCount}
                                                placeholder="Enter Page Count"
                                                className='form-control'
                                                name="page_count"
                                                id="pageCount"
                                                min={0}
                                                onChange={handlePageCountChange} />
                                        </div>
                                        <AudioLengthInput setAudioLength={setLength}></AudioLengthInput>
                                    </div>

                                    <div className='mb-2'>
                                        <label htmlFor="description">Summary:</label>
                                        <textarea
                                            placeholder="Enter Summary"
                                            className='form-control'
                                            name="description"
                                            id="description"
                                            value={description}
                                            onChange={handleDescriptionChange} />
                                        <p className="text-end"> Character Count: {charCount}/{maxLength}</p>
                                    </div>
                                    {showModal && (
                                        <OKModal message="Character count exceeds allowed amount."
                                            onConfirm={() => setShowModal(false)} />
                                    )}

                                    <div className='mb-2'>
                                        <label htmlFor="borrowable">Borrowable?*:</label>
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
                                        <label htmlFor="genre">Genres:</label>
                                        <input type="text"
                                            placeholder="Enter Genres (ex: horror, sci-fi)"
                                            className='form-control'
                                            name="genre"
                                            id="genre"
                                            onChange={handleGenreChange}
                                        />
                                    </div>
                                </form>
                                <div className='d-grid'>
                                    <button className='btn btn-primary' onClick={createBook} disabled={!isValid}>Create Book</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}