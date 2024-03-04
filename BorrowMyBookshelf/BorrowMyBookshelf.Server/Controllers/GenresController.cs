using BorrowMyBookshelf.Server.Models.Authors;
using BorrowMyBookshelf.Server.Models.Genres;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly GenresDatabaseConnector dbConnector = new GenresDatabaseConnector();
        // GET: api/<GenresController>
        [HttpGet]
        public IEnumerable<Genres> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<GenresController>/5
        [HttpGet("{id}")]
        public Genres? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<GenresController>
        [HttpPost]
        public void Post([FromForm] CreateGenres createGenres)
        {
            dbConnector.CreateGenres(createGenres);
        }

        // PUT api/<GenresController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateGenres updateGenres)
        {
            dbConnector.UpdateGenres(updateGenres, id);
        }

        // DELETE api/<GenresController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
