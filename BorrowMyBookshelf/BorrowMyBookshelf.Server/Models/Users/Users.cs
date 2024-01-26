using MySql.Data.MySqlClient;
using System.Data;
using System.Drawing;

namespace BorrowMyBookshelf.Server.Models.Users
{
    public class Users 
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string? Notes { get; set; }
        public string? ImageFileName { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public Users(int userId, string firstName, string lastName, string email, string passwordHash, string? notes, string? imageFileName, DateTime createDate, DateTime? updateDate)
        {
            UserId = userId;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            PasswordHash = passwordHash;
            Notes = notes;
            ImageFileName = imageFileName;
            CreateDate = createDate;
            UpdateDate = updateDate;
        }
    }
}
