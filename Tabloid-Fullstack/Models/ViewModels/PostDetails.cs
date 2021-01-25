using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid_Fullstack.Models.ViewModels
{
    public class PostDetails
    {
        public Post Post { get; set; }
        public List<ReactionCount> ReactionCounts { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
