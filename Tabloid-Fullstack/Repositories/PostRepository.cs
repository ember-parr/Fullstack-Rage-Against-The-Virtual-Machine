using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;

namespace Tabloid_Fullstack.Repositories
{
    public class PostRepository : IPostRepository
    {
        private ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostSummary> Get()
        {
            return _context.Post
                .Include(p => p.Category)
                .Where(p => p.IsApproved)
                .Where(p => p.PublishDateTime <= DateTime.Now)
                .OrderByDescending(p => p.PublishDateTime)
                .Select(p => new PostSummary()
                {
                    Id = p.Id,
                    ImageLocation = p.ImageLocation,
                    Title = p.Title,
                    AuthorId = p.UserProfileId,
                    AuthorName = p.UserProfile.DisplayName,
                    AbbreviatedText = p.Content.Substring(0, 200),
                    PublishDateTime = p.PublishDateTime,
                    Category = p.Category
                })
                .ToList();
        }

        public Post GetById(int id)
        {
            return _context.Post
                .Include(p => p.UserProfile)
                .Include(p => p.Category)
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }

        public List<PostSummary> GetByUserId(int id)
        {

            return _context.Post
            .Include(p => p.Category)
            .Where(p => p.UserProfileId == id)
            .OrderByDescending(p => p.PublishDateTime)
            .Select(p => new PostSummary()
            {
                Id = p.Id,
                ImageLocation = p.ImageLocation,
                Title = p.Title,
                AuthorId = p.UserProfileId,
                AuthorName = p.UserProfile.DisplayName,
                AbbreviatedText = p.Content.Substring(0, 200),
                PublishDateTime = p.PublishDateTime,
                Category = p.Category
            })
            .ToList();
        }

        public List<ReactionCount> GetReactionCounts(int postId)
        {
            return _context.Reaction
                .Select(r => new ReactionCount()
                {
                    Reaction = r,
                    Count = r.PostReactions.Count(pr => pr.PostId == postId)
                })
                .ToList();
        }

        public void Add(Post post)
        {
            _context.Add(post);
            _context.SaveChanges();
        }

        public void Update(Post post)
        {
            var local = _context.Set<Post>()
                            .Local
                            .FirstOrDefault(entry => entry.Id.Equals(post.Id));
            //check if local is not null
                if (local != null)
                {
                  //  detach
                    _context.Entry(local).State = EntityState.Detached;
                }
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var postToDelete = _context.Post
            .Where(p => p.Id == id)
            .Include(p => p.PostReactions);
            //include comments
            //include posttags

            _context.Post.RemoveRange(postToDelete);
            _context.SaveChanges();
        }
    }
}
