import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { GetAuthHeader } from '../models/AuthHelper';

export default function CreateBook() {
    const [title, setTitle] = useState<string>('');
    const [format, setFormat] = useState<string>('');
    const [length, setLength] = useState<string>('');
    const [pageCount, setPageCount] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormat(event.target.value);
    };

    const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLength(event.target.value);
    };

    const handlePageCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageCount(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const createBook = () => {
        const formData = new FormData();
        const book = {
            'title': title,
            'authorId': 1,
            'decription': description,
            'pageCount': pageCount,
            'audioLength': length,
        };
        for (const pair of Object.entries(book)) {
            formData.append(pair[0], pair[1].toString());
        }
        
        axios.post('/api/books', formData,
            {
                withCredentials: true,
                headers: GetAuthHeader(),
            });
    };

    return (
        <div className="create-book outlet-content template d-flex justify-content-center align-items-center yellow-bg">
            <div className='form-container-forms p-5 rounded bg-white'>
                <form id="new-book">
                    <h3 className="text-center">Create New Book</h3>
                    <div className='mb-2'>
                        <label htmlFor="title">Title</label>
                        <input type="text" value={title} placeholder="Enter Title" className='form-control' name="title" onChange={handleTitleChange} />
                    </div>
                    <div>
                        <h5 className="text-center">Author's Name:</h5>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" placeholder="Enter First Name" className='form-control' name="first_name" />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="authorMiddleName">Middle Name</label>
                        <input type="text" placeholder="Enter Middle Name" className='form-control' name="middle_name"/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="authorLastName">Last Name</label>
                        <input type="text" placeholder="Enter Last Name" className='form-control' name="last_name" />
                    </div>

                    <div className="radio-button-container">
                        <input type="radio" id="audio" name="format" value="audio" onChange={handleFormatChange} />
                        <label htmlFor="audio">Audio</label>
                        <input type="radio" id="physical" name="format" value="physical" onChange={handleFormatChange} />
                        <label htmlFor="physical">Physical</label>
                    </div>
                    <div className="">
                        {format === 'physical' && (
                            <div className='mb-2'>
                                <label htmlFor="pageCount">Page Count</label>
                                <input type="number" value={pageCount} placeholder="Enter Page Count" className='form-control' name="page_count" onChange={handlePageCountChange} checked/>
                            </div>
                        )}
                    {format === 'audio' && (
                        <div className='mb-2'>
                            <label htmlFor="audioLength">Audio Length</label>
                                <input type="text" value={length} placeholder="Enter Audio Length" className='form-control' name="audio_length" onChange={handleLengthChange} />
                        </div>
                    )}
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="description">Summary</label>
                        <input type="text" placeholder="Enter Summary" className='form-control' name="description" value={description} onChange={handleDescriptionChange} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="genre">Genre</label>
                        <input type="text" placeholder="Enter Genre" className='form-control' name="genre"/>
                    </div>
                </form>
                <div className='d-grid'>
                    <button className='btn btn-primary' onClick={createBook}>Create Book</button>
                </div>
            </div>
        </div>
    )
}