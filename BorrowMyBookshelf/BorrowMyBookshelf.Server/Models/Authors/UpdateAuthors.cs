namespace BorrowMyBookshelf.Server.Models.Authors
{
    public class UpdateAuthors
    {
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string ColumnsToNullify { get; set; }

        public UpdateAuthors() {
            FirstName = null;
            MiddleName = null;
            LastName = null;
            ColumnsToNullify = String.Empty;
        }

    }
}
