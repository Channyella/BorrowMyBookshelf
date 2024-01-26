﻿using BorrowMyBookshelf.Server.Models.Reviews;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ReviewsDatabaseConnector dbConnector = new ReviewsDatabaseConnector();
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

        // POST api/<ReviewsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ReviewsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ReviewsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
