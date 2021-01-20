
using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(int id);
        Comment GetCommentById(int id);
        List<Comment> GetCommentsByPostId(int id);
        void Update(Comment comment);
    }
}