using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Models.Entities
{
    public class ApplicationRole
    {
        public int? ApplicationId { get; set; }
        public int? RoleId { get; set; }

        public Application Application { get; set; }
        public Role Role { get; set; }
    }
}
