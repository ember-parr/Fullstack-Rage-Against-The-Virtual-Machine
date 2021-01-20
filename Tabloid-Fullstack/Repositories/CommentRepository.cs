using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetCommentsByPostId(int id)
        {
            return _context.Comment
                .Include(c => c.User)
                    .Where(c => c.PostId == id)
                    .OrderByDescending(c => c.CreateDateTime)
                    .ToList();
        }

        public void Add(Comment comment)
        {
            try
            {

                _context.Add(comment);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {

            }
        }

    }
}