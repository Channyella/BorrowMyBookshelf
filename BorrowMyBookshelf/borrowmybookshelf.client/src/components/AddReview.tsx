import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '../models/Book';
import './style.css';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Post } from '../helpers/NetworkHelper';
import { ReviewBookFormat } from '../models/Review';
import StarsDropDownInput from './StarsDropDownInput';
import OKModal from './OKModal';


export default function AddReview() {
    const bookId = useParams<{ bookId: string }>().bookId ?? "";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [book, setBook] = useState<Book | null>(null);
    const [title, setTitle] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [format, setFormat] = useState<ReviewBookFormat>(ReviewBookFormat.Physical);
    const [starsAmount, setStarsAmount] = useState<number>(0);
    const userInfo = GetCurrentUser();
    const userId = userInfo?.userId ?? -1;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const charCount: number = description.length;
    const maxLength: number = 5000;
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishedDate, setFinishedDate] = useState<Date | null>(null);

    const handleStarsChange = (value: number) => {
        setStarsAmount(value);
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = event.target.value ? new Date(event.target.value) : null;
        setStartDate(selectedDate);
        if (finishedDate && selectedDate && finishedDate < selectedDate) {
            setFinishedDate(null);
        }
    }

    const handleFinishedDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = event.target.value ? new Date(event.target.value) : null;
        setFinishedDate(selectedDate);
        if (startDate && selectedDate && startDate > selectedDate) {
            setStartDate(null);
        }
    }

    async function goBack() {
        navigate(-1);
    }

    const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormat(event.target.value as unknown as ReviewBookFormat);
    };

    const fetchBook = async (id: string) => {
        try {
            const response = await axios.get<Book>(`/api/books/${id}/detailed`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            const bookInfo = new Book(response.data);
            setBook(bookInfo);
            setTitle(bookInfo.title);

        } catch (error) {
            console.error('Error fetching bookshelf data:', error);
        }
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText: string = event.target.value;
        if (newText.length <= maxLength) {
            setDescription(newText);
        } else {
            setShowModal(true);
            setDescription(newText);
        }
    };

    useEffect(() => {
        if (bookId) {
            fetchBook(bookId);
        }
    }, [bookId]);

    // Add all the params needed to make review
    const addUserReview = async () => {
        try {
            await Post('/api/reviews', {
                userId: userId, bookId: bookId, rating: starsAmount, startDate: startDate?.toISOString(), bookFormat: format,
                finishedDate: finishedDate?.toISOString(), summary: description
            });
            console.log('Successfully added review');
        } catch (error) {
            console.log('Error adding review:', error);
        }
        navigate(-1);
    };

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
                            <div className='review-container-forms p-5 rounded bg-white'>
                                <form id="new-book">
                                    <h3 className="text-center">{`Add Review to ${title}`}</h3>
                                    <div>
                                        <StarsDropDownInput value={starsAmount}
                                            onChange={handleStarsChange} />
                                    </div>

                                    <div className="radio-button-container">
                                        <p className="format-margin">Format:</p>
                                        <input type="radio"
                                            id="physical"
                                            name="format"
                                            value={ReviewBookFormat.Physical}
                                            onChange={handleFormatChange} />
                                        <label htmlFor="physical">Physical</label>
                                        <input type="radio"
                                            id="eBook"
                                            name="format"
                                            value={ReviewBookFormat.eBook}
                                            onChange={handleFormatChange} />
                                        <label htmlFor="eBook">eBook</label>
                                        <input type="radio"
                                            id="audioBook"
                                            name="format"
                                            value={ReviewBookFormat.AudioBook}
                                            onChange={handleFormatChange} />
                                        <label htmlFor="audioBook">Audio Book</label>
                                    </div>

                                    <div className='mb-2'>
                                        <label htmlFor="start-date-input">When did you start this book?</label>
                                        <input type="date"
                                            value={startDate ? startDate.toISOString().split('T')[0] : undefined}
                                            className='form-control w-auto'
                                            id="start-date-input"
                                            name="start-date-input"
                                            max={finishedDate ? finishedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                            onChange={handleStartDateChange} />
                                    </div>

                                    <div className='mb-2'>
                                        <label htmlFor="finished-date-input">When did you finish this book?</label>
                                        <input type="date"
                                            value={finishedDate ? finishedDate.toISOString().split('T')[0] : undefined}
                                            className='form-control w-auto'
                                            id="finished-date-input"
                                            name="finished-date-input"
                                            max={new Date().toISOString().split('T')[0]}
                                            min={startDate ? startDate.toISOString().split('T')[0] : undefined}
                                            onChange={handleFinishedDateChange} />
                                    </div>

                                    <div className='mb-2'>
                                        <label htmlFor="description">Review:</label>
                                        <textarea
                                            placeholder={`Enter Your Review of ${title}`}
                                            className='form-control'
                                            name="description"
                                            value={description}
                                            onChange={handleDescriptionChange} />
                                        <p className="text-end"> Character Count: {charCount}/{maxLength}</p>
                                    </div>
                                    {showModal && (
                                        <OKModal message="Character count exceeds allowed amount."
                                            onConfirm={() => setShowModal(false)} />
                                    )}
                                </form>
                                <div className='d-grid'>
                                    <button className='btn btn-primary' onClick={addUserReview} disabled={!!starsAmount && charCount > maxLength} >Add Review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

