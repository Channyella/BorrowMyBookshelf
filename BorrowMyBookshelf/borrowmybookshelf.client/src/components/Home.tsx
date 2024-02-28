import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import { Book } from '../models/Book';

export default function Home() {
    const [books, setBooks] = useState<Book[] | undefined>();
    useEffect(() => {
        populateBookData();
    }, []);
    const contents = books === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Page Count</th>
                    <th>Description</th>
                    <th>Audio Length</th>
                    <th>Genres</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book =>
                    <tr key={book.title}>
                        <td>{book.title}</td>
                        <td>{`${book.author.firstName} ${book.author.middleName ?? ""} ${book.author.lastName}`}</td>
                        <td>{book.pageCount}</td>
                        <td>{book.description}</td>
                        <td>{book.audioLength}</td>
                        <td>{book.genres.map(genre => genre.genreType).join(", ")}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Your Books:</h1>
            {contents}
        </div>
    );
    async function populateBookData() {
        const response = await fetch('api/books/detailed');
        const data: Book[] = await response.json();
        setBooks(data);
    }
}