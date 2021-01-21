
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
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public CommentController(ICommentRepository commentRepository, IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
            _postRepository = postRepository;
        }


        [HttpGet("getbypost/{id}")]
        public IActionResult GetByPostId(int id)
        {
            return Ok(_commentRepository.GetCommentsByPostId(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_commentRepository.GetCommentById(id));
        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            Post post = _postRepository.GetById(comment.PostId);
            if (comment.Subject.Length > 255 || post == null)
            {
                return BadRequest();
            }
            comment.UserProfileId = GetCurrentUserProfile().Id;
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.Add(comment);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            var OriginalComment = _commentRepository.GetCommentById(id);
            if (id != comment.Id || comment.UserProfileId != GetCurrentUserProfile().Id || OriginalComment.UserProfileId != GetCurrentUserProfile().Id)
            {
                return BadRequest();
            }
            OriginalComment.Content = comment.Content;
            OriginalComment.Subject = comment.Subject;
            _commentRepository.Update(OriginalComment);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var OriginalComment = _commentRepository.GetCommentById(id);
            if (OriginalComment.UserProfileId != GetCurrentUserProfile().Id)
            {
                return BadRequest();
            }
            _commentRepository.Delete(id);
            return Ok();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}