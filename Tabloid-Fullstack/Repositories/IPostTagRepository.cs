using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface IPostTagRepository
    {
        void Add(PostTag postTag);
        List<Tag> GetAvailableTags(int postId);
        List<PostTag> GetByPostId(int postId);
    }
}