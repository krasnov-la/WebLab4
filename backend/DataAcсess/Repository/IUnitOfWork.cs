using backend.Models.DataBase;

namespace backend.DataAccess.Repository
{
    public interface IUnitOfWork
    {
        IRepository<User> UserRepo { get; }
        IRepository<Run> RunRepo { get; }
        void Save();
    }
}
