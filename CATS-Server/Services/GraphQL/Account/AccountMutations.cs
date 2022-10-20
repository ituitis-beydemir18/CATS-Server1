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
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;

namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: SchemaConstants.Mutation)]
    public class AccountMutations : BaseMutation<User>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="contextAccessor"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [Authorize]
        [UseDbContext(typeof(ApplicationDbContext))]
        public bool SaveAccountPreferences(AccountPreferencesInput input, [Service] IHttpContextAccessor contextAccessor, [ScopedService] ApplicationDbContext dbContext)
        {
            var currentUserId = contextAccessor.HttpContext.User.GetId();
            var user = dbContext.USERS.Find(currentUserId);
            if (user != null)
            {
                // Map input to user entity 
                user.LanguageId = input.LanguageId ?? user.LanguageId;
                dbContext.USERS.Update(user);
                return dbContext.SaveChanges() > 0;
            }
            else
            {
                throw ExceptionBuilder.Create(StatusCodes.NotFound, StatusMessages.ResourceNotFound);
            }
        }
    }
}
