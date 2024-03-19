using MySql.Data.MySqlClient;
using System.Data;
using System.Drawing;

namespace BorrowMyBookshelf.Server.Models.Users
{
    public class Users(int userId, string firstName, string lastName, string email, string passwordHash, string? notes, string? imageFileName, DateTime createDate, DateTime? updatedDate)
    {
        public int UserId { get; set; } = userId;
        public string FirstName { get; set; } = firstName;
        public string LastName { get; set; } = lastName;
        public string Email { get; set; } = email;
        public string PasswordHash { get; set; } = passwordHash;
        public string? Notes { get; set; } = notes;
        public string? ImageFileName { get; set; } = imageFileName;
        public DateTime CreateDate { get; set; } = createDate;
        public DateTime? UpdatedDate { get; set; } = updatedDate;
    }
}
