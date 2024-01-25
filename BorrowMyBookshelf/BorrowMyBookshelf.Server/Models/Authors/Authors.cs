namespace BorrowMyBookshelf.Server.Models.Authors
{
    public class Authors
    {
        public int AuthorId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public Authors(int authorId, string? firstName, string? lastName)
        {
            AuthorId = authorId;
            FirstName = firstName;
            LastName = lastName;
        }
    }
}
