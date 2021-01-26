using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface IPostTagRepository
    {
        void Add(PostTag postTag);
        void Delete(PostTag postTag);
        List<Tag> GetAvailableTags(int postId);
        PostTag GetById(int id);
        List<PostTag> GetByPostId(int postId);
    }
}