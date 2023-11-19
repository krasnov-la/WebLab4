

namespace backend.Models.DataBase
{
    public class Run
    {
        public Guid Id { get; set; }
        public int Score { get; set; }
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }

        protected Run(){}

        public Run(Guid guid, int score, DateTime date, Guid userGuid)
        {
            Id = guid;
            Score = score;
            Date = date;
            UserId = userGuid;
        }
    }
}
