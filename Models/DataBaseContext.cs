using Microsoft.EntityFrameworkCore;
using bingo_project.Models;


namespace bingo_project.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
            
        }
        
        public DbSet<Room> Rooms { get; set; }
        
        public DbSet<Cardboard> Cardboards { get; set; }
    }
}