using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models.ViewModels;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {

        private IPostRepository _repo;
        private ICommentRepository _commentRepo;

        public PostController(IPostRepository repo, ICommentRepository commentRepo)
        {
            _repo = repo;
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
    }
}
