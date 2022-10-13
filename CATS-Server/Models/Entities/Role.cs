using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Models.Entities
{
    public class Role : AuditableEntity
    {
        public string Name { get; set; }

        public IEnumerable<ApplicationRole> ApplicationRoles { get; set; }
        public IEnumerable<UserRole> UserRoles { get; set; }
    }
}
