using Microsoft.EntityFrameworkCore;

namespace bingo_project.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
            
        }
        public DbSet<Room> Room  { get; set; }
    }
}