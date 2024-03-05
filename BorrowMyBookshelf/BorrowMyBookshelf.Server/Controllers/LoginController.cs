using BorrowMyBookshelf.Server.Models;
using BorrowMyBookshelf.Server.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UsersDatabaseConnector dbConnector = new UsersDatabaseConnector();

        private IConfiguration _config;
        public LoginController(IConfiguration config)
        {
            _config = config;
        }
        // POST api/login
        [HttpPost("login")]
        public IActionResult Post([FromForm] LoginRequest loginRequest)
        {
            UsersDatabaseConnector usersDatabaseConnector = new UsersDatabaseConnector();
            Users? user = usersDatabaseConnector.FoundUser(loginRequest.Email, PasswordHelper.GetHashString(loginRequest.Password));
            if (user == null)
            {
                return Unauthorized();
            }
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            List<Claim> claims =
                [
                    new Claim("userId", user.UserId.ToString()),
                    new Claim("firstName", user.FirstName),
                    new Claim("lastName", user.LastName),
                    new Claim("email", user.Email),
                ];

            var Sectoken = new JwtSecurityToken(_config["JwtSettings:Issuer"],
              _config["JwtSettings:Issuer"],
              claims,
              expires: DateTime.Now.AddDays(32),
              signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

            return Ok(token);
        }

        // POST api/signup
        [HttpPost("signup")]
        public long Post([FromForm] CreateUsers createUsers)
        {
            return dbConnector.CreateUsers(createUsers);
        }
    }
}
