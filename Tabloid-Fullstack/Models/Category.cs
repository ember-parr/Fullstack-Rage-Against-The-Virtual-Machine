using System.ComponentModel.DataAnnotations;

namespace Tabloid_Fullstack.Models
{
    public class Category
    {
        public int Id { get; set; }
        [MaxLength(50)]
        [Required]
        public string Name { get; set; }
        public bool IsActive { get; set; }
    }
}