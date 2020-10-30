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

    public class RoomsController : ControllerBase 
    {
        private readonly DataBaseContext _context;

        public RoomsController(DataBaseContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _context.Rooms.ToListAsync();
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<Room>> GetRoom(string code)
        {
            var room = await _context.Rooms.FindAsync(code);
            if (room == null)
            {
                return NotFound();
            }
            return room;
        }

        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnimal", new { id = room.Id }, room);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Room>> DeleteRoom(long id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return room;
        }
    }
}