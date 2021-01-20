using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        List<Comment> GetCommentsByPostId(int id);
    }
}