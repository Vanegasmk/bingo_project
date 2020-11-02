using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bingo_project.Models;

namespace bingo_project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class cardboardsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public cardboardsController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cardboard>>> GetCardboards()
        {
            return await _context.Cardboards.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cardboard>> GetCardboard(long id)
        {
            var cardboard = await _context.Cardboards.FindAsync(id);
            if (cardboard == null)
            {
                return NotFound();
            }
            return cardboard;
        }

        [HttpPost]
        public async Task<ActionResult<Cardboard>> PostCardboard()
        {
            Cardboard carton = new Cardboard();
            carton.numbers = new int[5];
            var random = new Random();
            HashSet<int> numbers = new HashSet<int>();
            while (numbers.Count < 25) {
                numbers.Add(random.Next(1, 49));
            }
            carton.numbers=System.Linq.Enumerable.ToArray(numbers);
            _context.Cardboards.Add(carton);
            await _context.SaveChangesAsync(); 

            return CreatedAtAction("GetCardboard", new { id = carton.Id }, carton);
        }

    }
}
