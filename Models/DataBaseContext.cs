using Microsoft.EntityFrameworkCore;

namespace project_bingo.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
            
        }
        public DbSet<Cardboard> Cardboards { get; set; }
    }
}