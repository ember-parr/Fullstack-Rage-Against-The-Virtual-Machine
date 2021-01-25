using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;

namespace Tabloid_Fullstack.Repositories
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .Include(up => up.Post)
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);

        }

        public List<UserProfile> GetAll()
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .OrderBy(u => u.DisplayName)
                .Take(10)
                .ToList();
        }

        public List<UserProfile> GetRecentUsers()
        {
            return _context.UserProfile
                .Include(u => u.Post)
                .OrderByDescending(p => p.CreateDateTime)
                .Where(u => u.Post.Count >= 1)
                .ToList();
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }




    }
}
