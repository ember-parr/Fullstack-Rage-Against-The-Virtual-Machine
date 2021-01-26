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
    public class PostTagController : ControllerBase
    {
        private IPostTagRepository _postTagRepo;
        private IPostRepository _postRepo;
        private ITagRepository _tagRepo;
        private IUserProfileRepository _userRepo;

        public PostTagController(IPostTagRepository postTagRepo, IPostRepository postRepo, ITagRepository tagRepo, IUserProfileRepository userRepo)
        {
            _postTagRepo = postTagRepo;
            _postRepo = postRepo;
            _tagRepo = tagRepo;
            _userRepo = userRepo;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepo.GetById(id);
            if(post == null)
            {
                return BadRequest();
            }

            var currentUser = GetCurrentUserProfile();
            if (currentUser.IsActive == false)
            {
                return Unauthorized();
            }
            var postTags = _postTagRepo.GetByPostId(id);
            return Ok(postTags);
        }

        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            var tag = _tagRepo.GetById(postTag.TagId);
            var post = _postRepo.GetById(postTag.PostId);
            if(tag == null || post == null)
            {
                return BadRequest();
            }

            var tagIds = _postTagRepo.GetByPostId(postTag.PostId).Select(postTag => postTag.TagId);
            if(tagIds.Contains(postTag.TagId))
            {
                return BadRequest();
            }

            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id != post.UserProfileId || currentUser.IsActive == false)
            {
                return Unauthorized();
            }
            _postTagRepo.Add(postTag);
            return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }

        [HttpGet("available/{id}")]
        public IActionResult GetAvailable(int id)
        {
            var post = _postRepo.GetById(id);
            if (post == null)
            {
                return BadRequest();
            }
            var currentUser = GetCurrentUserProfile();
            if (currentUser.IsActive == false)
            {
                return Unauthorized();
            }
            var tags = _postTagRepo.GetAvailableTags(id);
            return Ok(tags);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var postTag = _postTagRepo.GetById(id);
            if(postTag == null)
            {
                return BadRequest();
            }

            var post = _postRepo.GetById(postTag.PostId);
            var currentUser = GetCurrentUserProfile();
            if(currentUser.Id != post.UserProfileId || currentUser.IsActive == false)
            {
                return Unauthorized();
            }
            _postTagRepo.Delete(postTag);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
