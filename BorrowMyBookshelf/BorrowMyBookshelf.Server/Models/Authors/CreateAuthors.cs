using Microsoft.AspNetCore.SignalR;
using MySql.Data.MySqlClient;
using System.Security.Cryptography;

namespace BorrowMyBookshelf.Server.Models.Authors
{
    public class CreateAuthors
    {
        public string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string LastName { get; set; }


        public CreateAuthors()
        {
            FirstName = String.Empty;
            MiddleName = null;
            LastName = String.Empty;
        }

    }
}
