using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Models.Entities
{
    public class User : AuditableEntity
    {
        public string Username { get; set; }
        public int? TypeId { get; set; }
        public string Name { get; set; }

        public string EmployeeId { get; set; }
        public string JobTitle { get; set; }

        public string Email { get; set; }
        public string Extension { get; set; }
        public int? LanguageId { get; set; }
      
        public bool? Locked { get; set; }

        public UserType Type { get; set; }
        public Language Language { get; set; }
        
        public List<UserRole> Roles { get; set; }

        public List<Request> ReviewerRequests { get; set; }
        public List<Request> RequesterRequests { get; set; }

    }
}
