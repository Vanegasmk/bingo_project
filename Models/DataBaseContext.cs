using Microsoft.EntityFrameworkCore;

namespace bingo_project.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
            
        }
        
        public DbSet<Room> Rooms { get; set; }
        
        public DbSet<Cardboard> Cardboards { get; set; }

<<<<<<< HEAD
        public DbSet<Admin> Admins { get; set; }
=======
>>>>>>> changes
    }
}