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
    public class NumerosController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public NumerosController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Numero>>> GetCardboards()
        {
            return await _context.Numeros.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Numero>> GetNumero(long id)
        {
            var numero = await _context.Numeros.FindAsync(id);
            if (numero == null)
            {
                return NotFound();
            }
            return numero;
        }

        [HttpPost]
        public async Task<ActionResult<Numero>> PostNumero(Numero numero)
        {
            _context.Numeros.Add(numero);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNumero", new { id = numero.Id }, numero);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Numero>> DeleteNum(long id)
        {
            var room = await _context.Numeros.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            _context.Numeros.Remove(room);
            await _context.SaveChangesAsync();

            return room;
        }
    }
}