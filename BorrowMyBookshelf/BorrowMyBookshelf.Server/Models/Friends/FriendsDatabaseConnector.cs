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
        public long CreateFriends (CreateFriends createFriends)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("requester_user_id", createFriends.RequesterUserId),
                    ("reciever_user_id", createFriends.ReceiverUserId),
                    ("accepted", createFriends.Accepted),
                    ("create_date", createFriends.CreateDate)
                ];
            List<(string, object?)> requesterColumnsWithValues =
                [
                    ("requester_user_id", createFriends.RequesterUserId),
                    ("reciever_user_id", createFriends.ReceiverUserId),
                ];
            List<(string, object?)> receiverColumnsWithValues =
                [
                    ("reciever_user_id", createFriends.RequesterUserId),
                    ("requester_user_id", createFriends.ReceiverUserId),
                ];
            List<Friends> requesterColumns = GetByColumns(requesterColumnsWithValues);
            List<Friends> receiverColumns = GetByColumns(receiverColumnsWithValues);
            if (requesterColumns.Count > 0)
            {
                return requesterColumns[0].FriendId;
            }
            else if (receiverColumns.Count > 0)
            {
                return receiverColumns[0].FriendId;
            }
            return Insert(columnsWithValues);
        }
        public void UpdateFriends (int id)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("accepted", true)
                ];
            Update(columnsWithValues, id, []);
        }
    }
}
