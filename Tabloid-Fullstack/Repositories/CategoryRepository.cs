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

        public List<Category> GetAll()
        {
            return _context.Category.OrderBy(c => c.Name).ToList();
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
            var local = _context.Set<Category>()
                            .Local
                            .FirstOrDefault(entry => entry.Id.Equals(category.Id));

            // check if local is not null 
            if (local != null)
            {
                // detach
                _context.Entry(local).State = EntityState.Detached;
            }
            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var category = GetById(id);
            category.IsActive = false;
            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
