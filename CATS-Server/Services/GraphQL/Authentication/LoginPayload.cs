using CATS_Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    public class LoginPayload
    {
        public LoginPayload(string name, string authType, string token)
        {
            Name = name;
            AuthType = authType;
            Token = token;
        }
        public string Name { get; set; }
        public string AuthType { get; set; }
        public string Token { get; set; }
    }
}
