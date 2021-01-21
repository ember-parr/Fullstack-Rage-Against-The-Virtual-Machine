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

        public Comment GetCommentById(int id)
        {
            return _context.Comment.FirstOrDefault(c => c.Id == id);
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

        public void Delete(int id)
        {
            var comment = GetCommentById(id);
            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }

    }
}