using System.ComponentModel.DataAnnotations;

namespace backend.Models.DataBase
{
    public class User
    {
        public Guid Id { get; set; }
        [MaxLength(32)]
        public string Login { get; set; }
        [MaxLength(32)]
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public DateTime LastPasswordChange { get; set; }
        public int HighScore { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        protected User() {}
        public User(Guid guid, string login, string display, string password, string refresh, DateTime refreshExp)
        {
            if (login.Length > 32 || display.Length > 32) 
                throw new ArgumentOutOfRangeException();
            Id = guid;
            Login = login;
            DisplayName = display;
            Password = password;
            HighScore = 0;
            LastPasswordChange = DateTime.Now;
            RefreshToken = refresh;
            RefreshTokenExpiryTime = refreshExp;
        }
    }
}
