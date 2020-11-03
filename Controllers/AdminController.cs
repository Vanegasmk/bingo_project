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
        public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins()
        {
            return await _context.Admins.ToListAsync();
        } 

        [HttpGet("{email}/{password}")]
        public async Task<ActionResult<Admin>>GetAdmin(string email, string password)
        {
            var admin = _context.Admins.Where(x => x.Email == email).FirstOrDefault();
                if (admin == null)
                {
                    return NotFound();
                }
                if (admin.Email.Equals(email) && admin.Password!=password)
                {
                    admin.Password="Contrseña invalida";
                    return admin;   
                }
                return admin;
                
        
        }

        [HttpPost]
        public async Task<ActionResult<Admin>> PostAdmin(Admin admin)
        {
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdmin", new { id = admin.Id }, admin);
        }
    
    }
}