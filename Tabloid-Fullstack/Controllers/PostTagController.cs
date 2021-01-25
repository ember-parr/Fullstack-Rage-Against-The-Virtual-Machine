using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public PostTagController(IPostTagRepository postTagRepo, IPostRepository postRepo, ITagRepository tagRepo)
        {
            _postTagRepo = postTagRepo;
            _postRepo = postRepo;
            _tagRepo = tagRepo;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepo.GetById(id);
            if(post == null)
            {
                return BadRequest();
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
            _postTagRepo.Add(postTag);
            return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }
    }
}
