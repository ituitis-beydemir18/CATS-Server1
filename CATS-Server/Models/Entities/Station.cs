using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Models.Entities
{
    public class Station : AuditableEntity
    {
        public string Name { get; set; }
    }
}
