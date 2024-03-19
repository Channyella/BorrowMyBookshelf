using BorrowMyBookshelf.Server.Models.Reviews;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ReviewsDatabaseConnector dbConnector = new();
        private readonly DetailedReviewsDatabaseConnector reviewsDbConnector = new();
        
        // GET: api/<ReviewsController>
        [HttpGet]
        public IEnumerable<Reviews> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<ReviewsController>/5
        [HttpGet("{id}")]
        public Reviews? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // GET api/<ReviewsController>/book-id/2
        [HttpGet("book-id/{id}")]
        public IEnumerable<DetailedReviews> GetReviewsByBookId(int id)
        {
            return reviewsDbConnector.GetDetailedReviewsByBookId(id);
        }

        // POST api/<ReviewsController>
        [HttpPost]
        public long Post([FromForm] CreateReviews createReviews)
        {
            return dbConnector.CreateReviews(createReviews);
        }

        // PUT api/<ReviewsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateReviews updateReviews)
        {
            dbConnector.UpdateReviews(updateReviews, id);
        }

        // DELETE api/<ReviewsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
