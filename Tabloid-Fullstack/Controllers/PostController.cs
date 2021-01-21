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
        private ICommentRepository _commentRepo;
        private ICategoryRepository _categoryRepo;
        private IUserProfileRepository _userRepo;

        public PostController(IPostRepository repo, ICategoryRepository categoryRepo, IUserProfileRepository userRepo, ICommentRepository commentRepo)
        {
            _repo = repo;
            _categoryRepo = categoryRepo;
            _userRepo = userRepo;
            _commentRepo = commentRepo;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var posts = _repo.Get();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var post = _repo.GetById(id);
            if (post == null)
            {
                return NotFound();
            }

            var comments = _commentRepo.GetCommentsByPostId(id);
            var reactionCounts = _repo.GetReactionCounts(id);
            var postDetails = new PostDetails()
            {
                Post = post,
                ReactionCounts = reactionCounts,
                Comments = comments
            };
            return Ok(postDetails);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            var posts = _repo.GetByUserId(id);
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.CreateDateTime = DateTime.Now;
            _repo.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
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
            var categories = _categoryRepo.Get();
            return Ok(categories);
        }
    }
}
