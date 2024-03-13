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
import AuthContext from './context/AuthProvider';
import { useContext } from 'react';
import AddBookshelf from './components/AddBookshelf';
import UpdateBookshelf from './components/UpdateBookshelf';
import AllBooks from './components/AllBooks';
import AllUserBooks from './components/AllUserBooks';
import LayoutWithSidebar from './components/LayoutWIthSidebar';
import UpdateBook from './components/UpdateBook';
function App() {

    const { auth } = useContext(AuthContext);
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
                        <Route path='/' element={<LayoutWithSidebar /> } >
                            <Route index element={<AllUserBooks />} />
                            <Route path='all-books' element={<AllBooks />} />
                            <Route path='all-user-books' element={<AllUserBooks />} />
                            <Route path='bookshelf-books/:bookshelfId' element={<BookshelfBooks />} />
                            <Route path='add-bookshelf' element={<AddBookshelf />} />
                            <Route path='add-book/:bookshelfId' element={<CreateBook />} />
                            <Route path='update-bookshelf/:bookshelfId' element={<UpdateBookshelf />} />
                            <Route path='update-book/:userBookId' element={<UpdateBook /> } />
                        </Route>
                        <Route path='profile' element={<Profile/>} />
                        <Route path='friends' element={<Friends />} />
                        <Route path='borrowed' element={<Borrowed />} />                  
                    </Route>
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        )
    }

    if (!auth) {
        return LogIn();
    }
    return Main();
}

export default App;