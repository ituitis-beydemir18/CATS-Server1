﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Models.Entities
{
    public class ApplicationType : AuditableEntity
    {
        public string Name { get; set; }
        public string Code { get; set; }
    }
}
