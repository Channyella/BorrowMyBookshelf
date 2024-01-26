using BorrowMyBookshelf.Server.Models.Tags;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly TagsDatabaseConnector dbConnector = new TagsDatabaseConnector();
        // GET: api/<TagsController>
        [HttpGet]
        public IEnumerable<Tags> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<TagsController>/5
        [HttpGet("{id}")]
        public Tags? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<TagsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TagsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TagsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
