using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    public class UserInput
    {
        public int? Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Username { get; set; }
        public int? TypeId { get; set; }
        public string EmployeeId { get; set; }
        public string JobTitle { get; set; }
        public string Email { get; set; }
        public int? LanguageId { get; set; }
        public int? AirportId { get; set; }
        public bool? Locked { get; set; }
        public List<int> Roles { get; set; }
        public List<int> Airports { get; set; }
    }
}
