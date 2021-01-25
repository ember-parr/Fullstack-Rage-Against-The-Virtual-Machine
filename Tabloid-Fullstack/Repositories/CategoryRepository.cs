using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Category> Get()
        {
            return _context.Category.Where(c => c.IsActive == true).OrderBy(c => c.Name).ToList();
        }

        public Category GetById(int id)
        {
            return _context.Category
                .FirstOrDefault(p => p.Id == id);
        }

        public void Add(Category category)
        {
            _context.Add(category);
            _context.SaveChanges();
        }

        public void Update(Category category)
        {
            var localCat = _context.Set<Category>()
                            .Local
                            .FirstOrDefault(entry => entry.Id.Equals(category.Id));

            if (localCat != null)
            {
                _context.Entry(localCat).State = EntityState.Detached;
            }
            else
            {
                return;
            }

            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var category = GetById(id);
            if (category == null)
            {
                return;
            }

            category.IsActive = false;
            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
