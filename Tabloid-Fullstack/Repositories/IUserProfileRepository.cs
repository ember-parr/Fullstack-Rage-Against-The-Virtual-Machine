using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetById(int id);
        List<UserProfile> GetAllActive();
        List<UserProfile> GetAllInactive();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetRecentUsers();
        void Activate(int id);
        void Deactivate(int id);
    }
}