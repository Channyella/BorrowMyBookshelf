using BorrowMyBookshelf.Server.Models.BookRequests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookRequestsController : ControllerBase
    {
        private readonly BookRequestsDatabaseConnector dbConnector = new();
        private readonly SimpleBookRequestsDatabaseConnector simpleDbConnector = new();
        // GET: api/<BookRequestsController>
        [HttpGet]
        public IEnumerable<BookRequests> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<BookRequestsController>/5
        [HttpGet("{id}")]
        public BookRequests? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<BookRequestsController>
        [HttpPost]
        public long Post([FromForm] CreateBookRequests createBookRequests)
        {
            return simpleDbConnector.CreateBookRequests(createBookRequests);
        }

        // PUT api/<BookRequestsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateBookRequests updateBookRequests)
        {
            simpleDbConnector.UpdateBookRequests(updateBookRequests, id);
        }

        // DELETE api/<BookRequestsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            simpleDbConnector.DeleteById(id);
        }
    }
}
