import * as React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './components/Signup';
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import Friends from './components/Friends';
import Borrowed from './components/Borrowed';
import Profile from './components/Profile';
import CreateBook from './components/CreateBook';
import BookshelfBooks from './components/BookshelfBooks';
function App() {
    function LogIn() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        )
    }

    function Main() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='profile' element={<CreateBook />} />
                        <Route path='friends' element={<Friends />} />
                        <Route path='borrowed' element={<Borrowed />} />
                        <Route path='bookshelf-books/:bookshelfId' element={<BookshelfBooks /> } />
                    </Route>
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        )
    }

    const loggedIn = false; // todo: check if they are logged in

    if (!loggedIn) {
        return LogIn();
    }
    return Main();
}

export default App;