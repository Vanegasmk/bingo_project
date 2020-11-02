using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bingo_project.Models;

namespace bingo_project.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public AdminController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAnimals()
        {
            return await _context.Admins.ToListAsync();
        }

        [HttpGet("{email, password}")]
        public async Task<ActionResult<Admin>> GetAdmin(long id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }
            return admin;
        }    
        
        }
    
    }