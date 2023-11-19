using System.ComponentModel.DataAnnotations;

namespace backend.Models.DataBase
{
    public class User
    {
        public Guid Id { get; set; }
        public string Login {  get; set; }
        [MaxLength(255)]
        public string DisplayName { get; set; }
        public string Password { get; set; }
    }
}
