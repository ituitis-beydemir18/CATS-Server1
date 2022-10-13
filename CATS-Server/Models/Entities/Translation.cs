using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;



namespace CATS_Server.Models.Entities
{
    public class Translation : AuditableEntity
    {
        public string LanguageCode { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }

        public Language Language { get; set; }
    }
}
