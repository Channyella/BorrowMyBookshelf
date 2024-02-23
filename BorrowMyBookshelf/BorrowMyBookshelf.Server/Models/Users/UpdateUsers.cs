namespace BorrowMyBookshelf.Server.Models.Users
{
    public class UpdateUsers
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? Notes { get; set; }
        public string? ImageFileName { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string ColumnsToNullify { get; set; }

        public UpdateUsers()
        {
            FirstName = null;
            LastName = null;
            Email = null;
            PasswordHash = null;
            Notes = null;
            ImageFileName = null;
            CreateDate = null;
            UpdatedDate = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
