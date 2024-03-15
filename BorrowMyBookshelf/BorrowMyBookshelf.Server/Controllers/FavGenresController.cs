using BorrowMyBookshelf.Server.Models.FavAuthors;
using BorrowMyBookshelf.Server.Models.FavGenres;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavGenresController : ControllerBase
    {
        private readonly FavGenresDatabaseConnector dbConnector = new FavGenresDatabaseConnector();
        private readonly FavDetailedGenreDatabaseConnector genreDbConnector = new FavDetailedGenreDatabaseConnector();
        // GET: api/<FavGenresController>
        [HttpGet]
        public IEnumerable<FavGenres> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<FavGenresController>/5
        [HttpGet("{id}")]
        public FavGenres? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // GET: api/<FavGenresController>/users/5
        [HttpGet("users/{id}")]
        public IEnumerable<FavDetailedGenre> GetByUserId(int id)
        {
            return genreDbConnector.GetByForeignKey("user_id", id);
        }

        // POST api/<FavGenresController>
        [HttpPost]
        public long Post([FromForm] CreateFavGenres createFavGenres)
        {
            return dbConnector.CreateFavGenre(createFavGenres);
        }

        // PUT api/<FavGenresController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateFavGenres updateFavGenres)
        {
            dbConnector.UpdateFavGenre(updateFavGenres, id);
        }

        // DELETE api/<FavGenresController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
