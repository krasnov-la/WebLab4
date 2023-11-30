namespace backend.Models.API
{
    public class AuthResponse
    {
        public string AccessToken {get; set;}
        public string RefreshToken {get; set;}
        public string DisplayName { get; set;}
    }
}