using backend.Models.DataBase;
using Microsoft.EntityFrameworkCore;

namespace backend.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> Users {get; set;}
        public DbSet<Run> Runs {get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("uuid-ossp");
            modelBuilder.Entity<User>().HasIndex(u => u.Login).IsUnique(true);
        }
    }
}
