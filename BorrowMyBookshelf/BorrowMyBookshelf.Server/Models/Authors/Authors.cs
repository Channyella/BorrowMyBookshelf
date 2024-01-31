namespace BorrowMyBookshelf.Server.Models.Authors
{
    public class Authors
    {
        public int AuthorId { get; set; }
        public string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string LastName { get; set; }

        public Authors(int authorId, string firstName, string? middleName, string lastName)
        {
            AuthorId = authorId;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
        }
    }
}
