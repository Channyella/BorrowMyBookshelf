using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class FriendsDatabaseConnector : DatabaseConnector<Friends>
    {
        protected override string TableName => "friends";
        protected override string Id => "friend_id";
        protected override List<string> NullableColumns => [];

        protected override Friends MakeRow(MySqlDataReader reader)
        {
            return new Friends(
                reader.GetInt32("friend_id"),
                reader.GetInt32("requester_user_id"),
                reader.GetInt32("reciever_user_id"),
                reader.GetBoolean("accepted"),
                reader.GetDateTime("create_date")
                );
        }
        public void CreateFriends (CreateFriends createFriends)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("requester_user_id", createFriends.RequesterUserId),
                    ("reciever_user_id", createFriends.RecieverUserId),
                    ("accepted", createFriends.Accepted),
                    ("create_date", createFriends.CreateDate)
                ];
            Insert(columnsWithValues);
        }
    }
}
