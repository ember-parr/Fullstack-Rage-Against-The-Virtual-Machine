using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class TagRepository : ITagRepository
    {
        private ApplicationDbContext _context;

        public TagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Tag> Get()
        {
            return _context.Tag.ToList();
        }

        public void Add(Tag tag)
        {
            _context.Add(tag);
            _context.SaveChanges();
        }
    }
}
