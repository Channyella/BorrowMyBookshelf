namespace BorrowMyBookshelf.Server.Models.Authors
{
    public class Authors(int authorId, string firstName, string? middleName, string lastName)
    {
        public int AuthorId { get; set; } = authorId;
        public string FirstName { get; set; } = firstName;
        public string? MiddleName { get; set; } = middleName;
        public string LastName { get; set; } = lastName;
    }
}
