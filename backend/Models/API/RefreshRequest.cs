namespace backend.Models.API
{
    public class RefreshRequest
    {
        public string AccessToken {get; set;}
        public string RefreshToken {get; set;}
    }
}