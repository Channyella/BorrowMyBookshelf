﻿using BorrowMyBookshelf.Server.Models.BookshelfBooks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookshelfBooksController : ControllerBase
    {
        private readonly BookshelfBooksDatabaseConnector dbConnector = new BookshelfBooksDatabaseConnector();
        // GET: api/<BookshelfBooksController>
        [HttpGet]
        public IEnumerable<BookshelfBooks> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<BookshelfBooksController>/5
        [HttpGet("{id}")]
        public BookshelfBooks? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<BookshelfBooksController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<BookshelfBooksController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BookshelfBooksController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}