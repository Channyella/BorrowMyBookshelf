﻿namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class CreateFriends
    {
        public int RequesterUserId { get; set; }
        public int ReceiverUserId { get; set; }
        public bool Accepted { get; set; }
        public DateTime CreateDate { get; set; }
        public CreateFriends()
        {
            RequesterUserId = -1;
            ReceiverUserId = -1;
            Accepted = false;
            CreateDate = DateTime.Now;
        }
    }
}
