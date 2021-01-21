using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> Get();
        List<Category> GetAll();
        Category GetById(int id);
        void Add(Category category);
        void Update(Category category);
        void Replace(Category category, int id);
        void Delete(int id);
    }
}