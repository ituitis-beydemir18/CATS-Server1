using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    public class TranslationInput
    {
        public int? Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string LanguageCode { get; set; }
    }
}
