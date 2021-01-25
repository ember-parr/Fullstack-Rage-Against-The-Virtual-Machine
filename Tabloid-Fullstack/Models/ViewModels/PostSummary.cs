using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Tabloid_Fullstack.Models.ViewModels
{
    public class PostSummary
    {
        public int Id { get; set; }
        public string ImageLocation { get; set; }
        public string Title { get; set; }
        [JsonIgnore]
        public string AbbreviatedText { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }

        public DateTime? PublishDateTime { get; set; }
        public string PreviewText => AbbreviatedText + "...";
        public Category Category { get; set; }

        public string Content { get; set; }
        public double ReadTime
        {
            get
            {
                var wordCount = Content.Split(' ').Length;
                double time = wordCount / 150;
                double mins = Math.Ceiling(time);

                return mins;
            }
        }
    }
}
