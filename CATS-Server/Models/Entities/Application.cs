using HotChocolate.Types;
using HotChocolate.Types.Relay;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Models.Entities
{
    public class Application : AuditableEntity
    {
        public string Name { get; set; }
        public int? TypeId { get; set; }
        public string GroupName { get; set; }
        public string IconUrl { get; set; }
        public string PageUrl { get; set; }
        public int? RowIndex { get; set; }
        public bool? GuestAccess { get; set; }

        public ApplicationType Type { get; set; }
        public IEnumerable<ApplicationRole> Roles { get; set; }
    }
}
