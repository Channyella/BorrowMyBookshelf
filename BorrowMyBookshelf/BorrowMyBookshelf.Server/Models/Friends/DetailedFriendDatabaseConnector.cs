using BorrowMyBookshelf.Server.Models.FavGenres;
using BorrowMyBookshelf.Server.Models.Genres;
using MySql.Data.MySqlClient;
using System.Data.Common;

namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class DetailedFriendDatabaseConnector: DatabaseConnector<DetailedFriendRequest>
    {
        protected override string TableName => "friends JOIN users AS requester ON friends.requester_user_id = requester.user_id JOIN users AS receiver ON friends.reciever_user_id = receiver.user_id";
        protected override string SelectColumns => "friends.*, requester.user_id AS requester_user_id, receiver.user_id AS receiver_user_id, requester.first_name AS requester_first_name, requester.last_name AS requester_last_name, requester.email AS requester_email, requester.password_hash AS requester_password_hash, requester.notes AS requester_notes, requester.image_file_name AS requester_image_file_name, requester.create_date AS requester_create_date, requester.updated_date AS requester_updated_date, receiver.first_name AS receiver_first_name, receiver.last_name AS receiver_last_name, receiver.email AS receiver_email, receiver.password_hash AS receiver_password_hash, receiver.notes AS receiver_notes, receiver.image_file_name AS receiver_image_file_name, receiver.create_date AS receiver_create_date, receiver.updated_date AS receiver_updated_date";
        protected override string Id => "friend_id";
        protected override List<string> NullableColumns => [];

        protected override DetailedFriendRequest MakeRow(MySqlDataReader reader)
        {
            Users.Users receiver = new Users.Users(reader.GetInt32("receiver_user_id"),
                reader.GetString("receiver_first_name"),
                reader.GetString("receiver_last_name"),
                reader.GetString("receiver_email"),
                reader.GetString("receiver_password_hash"),
                SafeGetString("receiver_notes", reader),
                SafeGetString("receiver_image_file_name", reader),
                reader.GetDateTime("receiver_create_date"),
                SafeGetDateTime("receiver_updated_date", reader)
            );

            Users.Users requester = new Users.Users(reader.GetInt32("requester_user_id"),
                reader.GetString("requester_first_name"),
                reader.GetString("requester_last_name"),
                reader.GetString("requester_email"),
                reader.GetString("requester_password_hash"),
                SafeGetString("requester_notes", reader),
                SafeGetString("requester_image_file_name", reader),
                reader.GetDateTime("requester_create_date"),
                SafeGetDateTime("requester_updated_date", reader)
            );

            return new DetailedFriendRequest(
                reader.GetInt32("friend_id"),
                requester,
                receiver,
                reader.GetBoolean("accepted"),
                reader.GetDateTime("create_date")
                );
        }

        public List<DetailedFriend> GetFriends(int userId)
        {
            List<DetailedFriendRequest> existingFriends =
                GetByColumns([
                    ("requester_user_id", userId),
                    ("reciever_user_id", userId)
                ], "OR");
            return existingFriends.Select(x => {
                Users.Users friendInfo = x.RequesterUserInfo.UserId == userId ? x.ReceiverUserInfo : x.RequesterUserInfo;
                bool isRequester = x.RequesterUserInfo.UserId == friendInfo.UserId;
                return new DetailedFriend(x.FriendId, friendInfo, isRequester, x.Accepted, x.CreateDate);
            }).ToList().FindAll(x => x.Accepted);
        }

        public List<DetailedFriend> GetFriendRequests(int userId)
        {
            List<DetailedFriendRequest> existingFriends =
                GetByColumns([
                    ("requester_user_id", userId),
                    ("reciever_user_id", userId)
                ], "OR");
            return existingFriends.Select(x => {
                Users.Users friendInfo = x.RequesterUserInfo.UserId == userId ? x.ReceiverUserInfo : x.RequesterUserInfo;
                bool isRequester = x.RequesterUserInfo.UserId == friendInfo.UserId;
                return new DetailedFriend(x.FriendId, friendInfo, isRequester, x.Accepted, x.CreateDate);
            }).ToList().FindAll(x => !x.Accepted);
        }
    }
}
