using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class PostTagRepository : IPostTagRepository
    {
        private ApplicationDbContext _context;

        public PostTagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostTag> GetByPostId(int postId)
        {
            return _context.PostTag
                .Include(pt => pt.Tag)
                .Where(pt => pt.PostId == postId)
                .ToList();
        }

        public void Add(PostTag postTag)
        {
            _context.Add(postTag);
            _context.SaveChanges();
        }

        public List<Tag> GetAvailableTags(int postId)
        {
            var postTags = GetByPostId(postId);

            var tags = _context.Tag
                .Where(t => t.IsActive == true)
                .ToList();


            for(int i = 0; i < postTags.Count; i++)
            {
               if(tags.Contains(postTags[i].Tag))
                {
                    tags.Remove(postTags[i].Tag);
                }
            }

            return tags;

        }

        public void Delete(int id)
        {
            var postTag = _context.PostTag.FirstOrDefault(pt => pt.Id == id);
            if(postTag == null)
            {
                return;
            }
            _context.PostTag.Remove(postTag);
            _context.SaveChanges();
        }
    }
}
