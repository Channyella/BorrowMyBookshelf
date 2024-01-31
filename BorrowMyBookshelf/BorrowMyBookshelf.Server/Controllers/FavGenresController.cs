using BorrowMyBookshelf.Server.Models.FavGenres;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavGenresController : ControllerBase
    {
        private readonly FavGenresDatabaseConnector dbConnector = new FavGenresDatabaseConnector();
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

        // POST api/<FavGenresController>
        [HttpPost]
        public void Post([FromForm] CreateFavGenres createFavGenres)
        {
            dbConnector.CreateFavGenre(createFavGenres);
        }

        // PUT api/<FavGenresController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FavGenresController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
