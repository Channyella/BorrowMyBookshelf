import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [books, setBooks] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = books === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author Id</th>
                    <th>Page Count</th>
                    <th>Description</th>
                    <th>Audio Length</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book =>
                    <tr key={book.title}>
                        <td>{book.title}</td>
                        <td>{book.authorId}</td>
                        <td>{book.pageCount}</td>
                        <td>{book.description}</td>
                        <td>{book.audioLength}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('api/books');
        const data = await response.json();
        setBooks(data);
    }
}

export default App;