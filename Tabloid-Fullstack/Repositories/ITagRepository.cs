using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        void Delete(int id);
        List<Tag> Get();
        Tag GetById(int id);
        void Update(Tag tag);
    }
}