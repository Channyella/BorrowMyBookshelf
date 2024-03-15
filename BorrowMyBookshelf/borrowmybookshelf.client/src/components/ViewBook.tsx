import React, { useEffect, useState } from 'react';
import { GetAuthHeader } from '../helpers/AuthHelper';
import { getAuthorFullName } from '../models/Author';
import { Book } from '../models/Book';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ViewBook() {
    const bookId = useParams<{ bookId: string }>().bookId ?? "";
    const [book, setBook] = useState<Book | null>(null);
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [audioLength, setAudioLength] = useState<number | undefined>();
    const [pageCount, setPageCount] = useState<number | undefined>();
    const [genreList, setGenreList] = useState<string[]>([]);
    const navigate = useNavigate();
    
    const fetchBook = async (id: string) => {
        try {
            const response = await axios.get<Book>(`/api/books/${id}/detailed`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            const bookInfo = response.data;
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
                </div>
            </nav>
            <main className="d-flex justify-content-center align-items-center">
            <div className="container">
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
                </div>
            </main>
        </div>
    );
}