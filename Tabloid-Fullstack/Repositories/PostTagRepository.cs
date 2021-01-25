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

            var tags = _context.Tag.ToList();

            for(int i = 0; i < tags.Count; i++)
            {
                for(int j = 0; j < postTags.Count; j++)
                {
                    if(postTags[j].TagId == tags[i].Id)
                    {
                        tags.RemoveAt(i);
                    }
                }
            }

            return tags;

        }
    }
}
