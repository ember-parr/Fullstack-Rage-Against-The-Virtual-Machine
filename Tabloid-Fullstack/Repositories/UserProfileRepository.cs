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

        public UserProfile GetById(int id)
        {
            return _context.UserProfile
                .FirstOrDefault(up => up.Id == id);
        }

        public List<UserProfile> GetAllActive()
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .Where(up => up.IsActive == true)
                .OrderBy(u => u.DisplayName)
                .ToList();
        }

        public List<UserProfile> GetAllInactive()
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .Where(up => up.IsActive == false)
                .OrderBy(u => u.DisplayName)
                .ToList();
        }

        public List<UserProfile> GetRecentUsers()
        {
            return _context.UserProfile
                .Include(u => u.Post)
                .OrderByDescending(p => p.CreateDateTime)
                .Where(u => u.Post.Count >= 1 && u.IsActive == true)
                .Take(10)
                .ToList();
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }

        public void Activate(int id)
        {
            var userToActivate = GetById(id);
            if (userToActivate == null)
            {
                return;
            }

            userToActivate.IsActive = true;
            _context.Entry(userToActivate).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Deactivate(int id)
        {
            var userToDeactivate = GetById(id);
            if (userToDeactivate == null)
            {
                return;
            }

            userToDeactivate.IsActive = false;
            _context.Entry(userToDeactivate).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
