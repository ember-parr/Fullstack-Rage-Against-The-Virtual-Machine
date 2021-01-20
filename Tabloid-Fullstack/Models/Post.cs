using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Tabloid_Fullstack.Models
{
    public class Post
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [MaxLength(255)]
        [DataType(DataType.ImageUrl)]
        public string ImageLocation { get; set; }
        [Required]
        public DateTime CreateDateTime { get; set; }
        [Required]
        public DateTime? PublishDateTime { get; set; }
        public bool IsApproved { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public List<PostReaction> PostReactions { get; set; }
        //public List<PostTag> PostTags { get; set; }
        //public List<Comment> Comments { get; set; }
    }
}
