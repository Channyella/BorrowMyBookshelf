using BorrowMyBookshelf.Server.Models.FavAuthors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavAuthorsController : ControllerBase
    {
        private readonly FavAuthorsDatabaseConnector dbConnector = new FavAuthorsDatabaseConnector();
        // GET: api/<FavAuthorsController>
        [HttpGet]
        public IEnumerable<FavAuthors> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<FavAuthorsController>/5
        [HttpGet("{id}")]
        public FavAuthors? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<FavAuthorsController>
        [HttpPost]
        public long Post([FromForm] CreateFavAuthors createFavAuthors)
        {
            return dbConnector.CreateFavAuthor(createFavAuthors);
        }

        // PUT api/<FavAuthorsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateFavAuthors updateFavAuthors)
        {
            dbConnector.UpdateFavAuthor(updateFavAuthors, id);
        }

        // DELETE api/<FavAuthorsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
