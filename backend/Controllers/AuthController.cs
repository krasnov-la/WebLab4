using System.Security.Claims;
using backend.DataAccess.Repository;
using backend.Models.API;
using backend.Models.DataBase;
using backend.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    [Route("/[controller]")]
    public class AuthController : ControllerBase
    {
        PasswordHasher<User> _hasher = new PasswordHasher<User>();
        ITokenService _tokens;
        IUnitOfWork _unit;
        public AuthController(ITokenService tokenService, IUnitOfWork unit)
        {
            _tokens = tokenService;
            _unit = unit;
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (request is null) return BadRequest("Request invalid");

            if (_unit.UserRepo.ReadFirst(u => u.Login == request.Login) != null)
                return BadRequest("Login already occupied");

            var user = new User(
                guid: Guid.NewGuid(),
                login: request.Login,
                display: request.DisplayName,
                password: "",
                refresh: _tokens.GenerateRefreshToken(),
                refreshExp: DateTime.Now.AddDays(7)
            );

            user.Password = _hasher.HashPassword(user, request.Password);

            string access = _tokens.GenerateAccessToken(new List<Claim> {
                new Claim(ClaimTypes.Name, user.Login)
            });

            _unit.UserRepo.Add(user);
            _unit.Save();

            return Ok(new AuthResponse(){
                AccessToken = access,
                RefreshToken = user.RefreshToken
            });
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request is null) return BadRequest("Request Inalid");

            var user = _unit.UserRepo.ReadFirst(u => u.Login == request.Login);

            if (user is null) return Unauthorized();

            if (_hasher.VerifyHashedPassword(user, user.Password, request.Password) != PasswordVerificationResult.Success)
                return Unauthorized();

            user.RefreshToken = _tokens.GenerateRefreshToken();
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            string access = _tokens.GenerateAccessToken(new List<Claim> {
                new Claim(ClaimTypes.Name, user.Login)
            });

            _unit.UserRepo.Update(user);
            _unit.Save();

            return Ok(new AuthResponse(){
                AccessToken = access,
                RefreshToken = user.RefreshToken
            });
        }

        [HttpPost("Refresh")]
        public IActionResult Refresh([FromBody] RefreshRequest request)
        {
            if (request is null) return BadRequest("Request Invalid");

            string access = request.AccessToken;
            string refresh = request.RefreshToken;

            var principal = _tokens.GetPrincipalFromExpToken(access);
            string login = principal.Identity.Name;

            var user = _unit.UserRepo.ReadFirst(u => u.Login == login);

            if (user is null || user.RefreshToken is null || user.RefreshToken != refresh || user.RefreshTokenExpiryTime < DateTime.Now)
                return BadRequest("Request Invalid");

            var newAccess = _tokens.GenerateAccessToken(principal.Claims);
            var newRefresh = _tokens.GenerateRefreshToken();

            user.RefreshToken = newRefresh;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

            _unit.UserRepo.Update(user);
            _unit.Save();

            return Ok(new AuthResponse(){
                AccessToken = newAccess,
                RefreshToken = newRefresh
            });
        }
    }
}