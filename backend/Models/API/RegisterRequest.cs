namespace backend.Models.API
{
    public class RegisterRequest
    {
        public string Login {get; set;}
        public string DisplayName {get; set;}
        public string Password {get; set;}
    }
}