

namespace backend.Models.DataBase
{
    public class Run
    {
        public Guid Id { get; set; }
        public int Score { get; set; }
        public string Date { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
