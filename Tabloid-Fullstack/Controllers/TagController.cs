using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {

        private ITagRepository _tagRepo;
        private IUserProfileRepository _userRepo;

        public TagController(ITagRepository tagRepo, IUserProfileRepository userRepo)
        {
            _tagRepo = tagRepo;
            _userRepo = userRepo;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUserProfile();
            if(user.UserTypeId != 1)
            {
                return Unauthorized();
            }
            var tags = _tagRepo.Get();
            return Ok(tags);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
