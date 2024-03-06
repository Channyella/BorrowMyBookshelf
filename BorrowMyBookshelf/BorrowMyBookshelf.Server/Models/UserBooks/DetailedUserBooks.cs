﻿using BorrowMyBookshelf.Server.Models.Books;

namespace BorrowMyBookshelf.Server.Models.UserBooks
{
    public class DetailedUserBooks
    {
        public int UserBookId { get; set; }
        public int UserId { get; set; }
        public DetailedBook Book { get; set; }
        public bool Borrowable { get; set; }
        public UserBooks.BookFormatEnum BookFormat { get; set; }

        public DetailedUserBooks (int userBookId, int userId, DetailedBook book, bool borrowable, UserBooks.BookFormatEnum bookFormat)
        {
            UserBookId = userBookId;
            UserId = userId;
            Book = book;
            Borrowable = borrowable;
            BookFormat = bookFormat;
        }
    }
}