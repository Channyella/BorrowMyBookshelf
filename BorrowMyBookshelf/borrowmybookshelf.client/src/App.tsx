import * as React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { Book } from './models/Book';
import LoginForm from "./components/LoginForm";

function App() {
    const [books, setBooks] = useState<Book[] | undefined>();

    useEffect(() => {
        populateBookData();
    }, []);

    const Login = () => {
        return (
            <div className="login">
                <form>
                    <LoginForm placeholder = "Email" />
                    <LoginForm placeholder = "Password" />
                </form>
             </div>
        );
    };

    const loggedIn = true; // todo: check if they are logged in

    if (!loggedIn) {
        return Login();
    }

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

export default App;