using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    public class ApplicationInput
    {
        public int? Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int? TypeId { get; set; }
        public string GroupName { get; set; }
        public string IconUrl { get; set; }
        public string PageUrl { get; set; }
        public int? RowIndex { get; set; }
        public bool? GuestAccess { get; set; }
        public List<int> Roles { get; set; }
    }
}
