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
    public class LeaderboardController : ControllerBase
    {
        IUnitOfWork _unit;
        public LeaderboardController(IUnitOfWork unit)
        {
            _unit = unit;
        }

        [HttpGet("{num:int}")]
        public IActionResult GetLeaderbord(int num)
        {
            IEnumerable<User> topUsers = 
                _unit.UserRepo.ReadAll().OrderByDescending(u => u.HighScore).Take(num).ToList();

            List<LeaderboardResponse> responses = new();

            foreach (var user in topUsers)
            {
                responses.Add(new LeaderboardResponse(){
                    Name = user.DisplayName,
                    Score = user.HighScore
                });
            }

            return Ok(responses);
        }
    }
}