using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    public static class StatusCodes
    {
        public const string NotAuthenticated = nameof(NotAuthenticated);
        public const string UnauthorizedAccess = nameof(UnauthorizedAccess);
        public const string BadRequest = nameof(BadRequest);
        public const string NotFound = nameof(NotFound);
    }
}
