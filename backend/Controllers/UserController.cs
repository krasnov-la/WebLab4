using System.Security.Claims;
using backend.DataAccess.Repository;
using backend.Models.API;
using backend.Models.DataBase;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class UserController : ControllerBase
    {
        IUnitOfWork _unit;
        ITokenService _tokens;
        public UserController(IUnitOfWork unit, ITokenService tokenService)
        {
            _unit = unit;
            _tokens = tokenService;
        }

        [HttpPost("Rename")]
        [Authorize]
        public IActionResult Rename([FromBody] RenameRequest request)
        {
            if (request is null) return BadRequest("Request invalid");
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var user = _unit.UserRepo.ReadFirst(u => u.Login == identity.Name);
            user.DisplayName = request.NewDisplayName;

            _unit.UserRepo.Update(user);
            _unit.Save();

            return Ok();
        }

        [HttpPost("UpdateScore")]
        [Authorize]
        public IActionResult UpdateScore([FromBody] UpdateScoreRequest request)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var user = _unit.UserRepo.ReadFirst(u => u.Login == identity.Name);
            
            if (user.HighScore > request.NewHighScore) return Ok("No update needed");

            user.HighScore = request.NewHighScore;

            _unit.UserRepo.Update(user);
            _unit.Save();

            return Ok("Updated");
        }
        
        [HttpPost("UpdatePassword")]
        [Authorize]
        public IActionResult UpdatePassword([FromBody] UpdatePasswordRequest request)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var user = _unit.UserRepo.ReadFirst(u => u.Login == identity.Name);

            if (DateTime.Now - user.LastPasswordChange < new TimeSpan(7, 0, 0, 0)) 
                return BadRequest("Password can be changed once every 7 days");

            user.LastPasswordChange = DateTime.Now;
            user.RefreshToken = null;

            user.Password = new PasswordHasher<User>().HashPassword(user, request.NewPassword);

            _unit.UserRepo.Update(user);
            _unit.Save();

            return Ok("Updated");
        }
    }
}