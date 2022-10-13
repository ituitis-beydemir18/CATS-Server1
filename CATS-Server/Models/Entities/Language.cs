using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Models.Entities
{
    public class Language : AuditableEntity
    {
        public string Name { get; set; }
        public string Code { get; set; }

        public List<Translation> Translations { get; set; }
    }
}
