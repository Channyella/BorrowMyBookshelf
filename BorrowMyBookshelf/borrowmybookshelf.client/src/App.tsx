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
import LayoutWithSidebar from './components/LayoutWithSidebar';
import UpdateBook from './components/UpdateBook';
import EditUserProfile from './components/EditUserProfile';
import AddFavAuthor from './components/AddFavAuthor';
import AddFavBook from './components/AddFavBook';
import AddFavGenre from './components/AddFavGenre';
import CopyToUserBookshelf from './components/CopyToUserBookshelf';
import CopyToAnotherBookshelf from './components/CopyToAnotherBookshelf';
import ViewBook from './components/ViewBook';
import AllUsers from './components/AllUsers';
import FriendRequests from './components/FriendRequests';
import FriendProfile from './components/FriendProfile';
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
                            <Route path='add-to-bookshelf/books/:bookId' element={<CopyToUserBookshelf/> } />
                            <Route path='all-user-books' element={<AllUserBooks />} />
                            <Route path='bookshelf-books/:bookshelfId' element={<BookshelfBooks />} />
                            <Route path='add-to-bookshelf/user-books/:userBookId' element={<CopyToAnotherBookshelf />} />
                            <Route path='add-bookshelf' element={<AddBookshelf />} />
                            <Route path='add-book/:bookshelfId' element={<CreateBook />} />
                            <Route path='update-bookshelf/:bookshelfId' element={<UpdateBookshelf />} />
                            <Route path='update-book/:userBookId' element={<UpdateBook />} />
                            <Route path='view-books/:bookId' element={<ViewBook /> } />
                        </Route>
                        <Route path='profile' element={<Profile />} />
                        <Route path='profile/edit/:userId' element={<EditUserProfile />} />
                        <Route path='profile/add-fav-authors' element={<AddFavAuthor />} />
                        <Route path='profile/add-fav-books' element={<AddFavBook />} />
                        <Route path='profile/add-fav-genres' element={<AddFavGenre />} />
                        <Route path='friends' element={<Friends />} />
                        <Route path='friends/all-users' element={<AllUsers />} />
                        <Route path='friends/friend-requests' element={<FriendRequests />} />
                        <Route path='friends/friend-profile/:userId' element={<LayoutWithSidebar /> }>
                            <Route index element={<FriendProfile />} />
                        </Route>
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