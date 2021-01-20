using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PostController : ControllerBase
    {

        private IPostRepository _repo;
        private ICategoryRepository _categoryRepo;
        private IUserProfileRepository _userRepo;

        public PostController(IPostRepository repo, ICategoryRepository categoryRepo, IUserProfileRepository userRepo)
        {
            _repo = repo;
            _categoryRepo = categoryRepo;
            _userRepo = userRepo;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserTypeId != 1 && currentUser.UserTypeId != 2)
            {
                return Unauthorized();
            }
            var posts = _repo.Get();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserTypeId != 1 && currentUser.UserTypeId != 2)
            {
                return Unauthorized();
            }

            var post = _repo.GetById(id);
            if (post == null)
            {
                return NotFound();
            }

            var reactionCounts = _repo.GetReactionCounts(id);
            var postDetails = new PostDetails()
            {
                Post = post,
                ReactionCounts = reactionCounts
            };
            return Ok(postDetails);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserTypeId != 1 && currentUser.UserTypeId != 2)
            {
                return Unauthorized();
            }
            return Ok(_repo.GetByUserId(id));
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserTypeId != 1 && currentUser.UserTypeId != 2)
            {
                return Unauthorized();
            }

            post.CreateDateTime = DateTime.Now;
            _repo.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserTypeId != 1 && currentUser.UserTypeId != 2)
            {
                return Unauthorized();
            }

            var p = _repo.GetById(id);
            if (p == null)
            {
                return NotFound();
            }

            if (id != post.Id)
            {
                return BadRequest();
            }
            post.CreateDateTime = DateTime.Now;
            _repo.Update(post);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserTypeId != 1 && currentUser.UserTypeId != 2)
            {
                return Unauthorized();
            }

            var p = _repo.GetById(id);
            if (p == null)
            {
                return NotFound();
            }
            _repo.Delete(id);
            return NoContent();
        }

        [HttpGet("getallcategories")]
        public IActionResult GetAllCategories()
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserTypeId != 1 && currentUser.UserTypeId != 2)
            {
                return Unauthorized();
            }
            var categories = _categoryRepo.Get();
            return Ok(categories);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
