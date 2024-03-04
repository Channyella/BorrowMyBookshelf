using System.Security.Cryptography;
using System.Text;

namespace BorrowMyBookshelf.Server.Models
{
    public class PasswordHelper
    {
        private static byte[] GetHash(string password)
        {
            using (HashAlgorithm hashAlgo = SHA256.Create())
                return hashAlgo.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        public static string GetHashString(string password)
        {
            StringBuilder hashedPassword = new();
            foreach (byte byeOfPassHash in GetHash(password))
                hashedPassword.Append(byeOfPassHash.ToString("X2"));

            return hashedPassword.ToString();
        }

    }
}
