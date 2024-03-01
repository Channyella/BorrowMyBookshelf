using BorrowMyBookshelf.Server.Models.Authors;

namespace BorrowMyBookshelf.Server.Models.Users
{
    public class CreateUsers
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        private string _PasswordHash;
        
        public string PasswordHash {
            get { return _PasswordHash; }
            set { _PasswordHash = PasswordHelper.GetHashString(value); }
        }
        
        public string? Notes { get; set; }
        public string? ImageFileName { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public CreateUsers()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
            Email = string.Empty;
            _PasswordHash = string.Empty;
            Notes = null;
            ImageFileName = null;
            CreateDate = DateTime.Now;
            UpdatedDate = null;
        }
    }
}
