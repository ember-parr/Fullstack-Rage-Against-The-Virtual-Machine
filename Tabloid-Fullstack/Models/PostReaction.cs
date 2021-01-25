
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid_Fullstack.Models
{
    public class PostReaction
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
        public int ReactionId { get; set; }
        public Reaction Reaction { get; set; }
        public int UserProfileId { get; set; }


    }
}