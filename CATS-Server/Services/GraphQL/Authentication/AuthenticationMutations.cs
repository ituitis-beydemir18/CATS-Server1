using HotChocolate;
using HotChocolate.Execution;
using HotChocolate.Types;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Data;


namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: SchemaConstants.Mutation)]
    public class AuthenticationMutations : BaseMutation<User>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="contextAccessor"></param>
        /// <param name="configuration"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [UseDbContext(typeof(ApplicationDbContext))]
        public LoginPayload Login([Service] IHttpContextAccessor contextAccessor, [Service] IConfiguration configuration, [ScopedService] ApplicationDbContext dbContext)
        {
            var username = contextAccessor.HttpContext.Request.Headers["THY-LOGINNAME"].FirstOrDefault();
#if DEBUG
            username = "A_BEYDEMIR";
#endif
            var user = dbContext.USERS.Where(u => u.Username == username)
                .Include(u => u.Roles)
                    .ThenInclude(ur => ur.Role)
                .FirstOrDefault();

            if (user?.Locked == false)
            {
                var claims = new List<Claim>();
                claims.AddRange(user.GetType().GetProperties().Where(prop => prop.GetValue(user) != null).Select(prop => new Claim(prop.Name, prop.GetValue(user).ToString())));
                claims.AddRange(user.Roles.Select(userRole => new Claim(ClaimTypes.Role, userRole.Role?.Name)));

                var identity = new ClaimsIdentity(claims, JwtBearerDefaults.AuthenticationScheme, CustomClaimTypes.Username, ClaimTypes.Role);
                var loginPayload = new LoginPayload(identity.Name, identity.AuthenticationType, identity.GetToken());

                return loginPayload;
            }
            else
            {
                throw ExceptionBuilder.Create(StatusCodes.NotAuthenticated, StatusMessages.InvalidCredential);
            }
        }
    }
}
