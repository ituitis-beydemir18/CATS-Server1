using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Models.Entities
{
    public class RequestType : AuditableEntity
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public IEnumerable<Request> Requests { get; set; }
    }
}
