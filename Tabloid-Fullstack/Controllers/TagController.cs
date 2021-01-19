using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {

        private ITagRepository _repo;

        public TagController(ITagRepository repo)
        {
            _repo = repo;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var tags = _repo.Get();
            return Ok(tags);
        }
    }
}
