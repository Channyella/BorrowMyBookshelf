import React, { useEffect, useState } from 'react';
import { GetAuthHeader } from '../helpers/AuthHelper';
import { getAuthorFullName } from '../models/Author';
import { Book } from '../models/Book';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Review } from '../models/Review';
import Reviews from './Reviews';

export default function ViewBook() {
    const bookId = useParams<{ bookId: string }>().bookId ?? "";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [book, setBook] = useState<Book | null>(null);
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [audioLength, setAudioLength] = useState<number | undefined>();
    const [pageCount, setPageCount] = useState<number | undefined>();
    const [genreList, setGenreList] = useState<string[]>([]);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<Review[] | null>(null);

    const fetchReviews = async (bookId: string) => {
        try {
            const response = await axios.get<Review[]>(`/api/reviews/book-id/${bookId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setReviews(response.data.map(review => new Review(review)));
        } catch (error) {
            console.error('Error fetching reviews data:', error);
        }
    }
    
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
            setAuthor(getAuthorFullName(bookInfo.author));
            setDescription(bookInfo.description ?? "");
            setAudioLength(bookInfo.audioLength);
            setPageCount(bookInfo.pageCount)
            const genreList = bookInfo.genres.map(x => x.genreType);
            setGenreList(genreList);
        } catch (error) {
            console.error('Error fetching bookshelf data:', error);
        }
    }

    async function goBack() {
        navigate(-1);
    }

    useEffect(() => {
        if (bookId) {
            fetchBook(bookId);
            fetchReviews(bookId);
        }
    }, [bookId]);


    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">{title}&apos;s Details</h2>
                    <div className="nav navbar-nav left-align-btns">
                        <button onClick={goBack} className="btn btn-success nav- ms-3"> <img src="/back_arrow.png" alt="Go Back" /> </button>
                    </div>
                    <div className="nav navbar-nav right-align-btns">
                        <Link to={`/view-books/${bookId}/create-review`}>
                        <button className="btn btn-success nav-item ms-3"> <img src="/reviews.png" alt="Review" /> Review Book</button>
                        </Link>
                    </div>
                </div>
            </nav>
            <main className="view-book-main">
            <div className="wide-container">
                    <h1 className="text-center book-title">{title}</h1>
                <h3 className="text-center"> by {author} </h3>
                {audioLength && pageCount &&
                        (<div className="view-book-container">
                            <h4>Audio Length: </h4><p>{audioLength} minutes</p>
                            <h4>Page Count: </h4><p>{pageCount} pages</p>                  
                        </div>)
                    }
                {audioLength && !pageCount &&
                    (<div className=" view-book-container">
                        <h4>Audio Length: </h4><p>{audioLength} minutes </p>
                    </div>)}
                {!audioLength && pageCount &&
                        (<div className= "view-book-container">
                            <h4>Page Count: </h4><p>{pageCount} pages</p>
                            </div>)}
                    {genreList && (
                        <div className="view-book-container">
                                    <h4>Genres:</h4>
                                    <p>{genreList.join(", ")}</p>
                            </div>)}

                    {description && (<div>
                                    <h4>Description:</h4>
                <div className="form-group d-flex align-items-center justify-content-center">
                 <div className="description-bg">{description}</div>
                </div></div>)}
                {!!reviews?.length &&
                    (<Reviews reviews={reviews}
                            setReviews={setReviews }
                            />)}
                </div>
            </main>
        </div>
    );
}