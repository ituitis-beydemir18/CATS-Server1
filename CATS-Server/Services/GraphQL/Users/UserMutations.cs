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
using CATS_Server.Extensions;

namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: SchemaConstants.Mutation)]
    public class UserMutations : BaseMutation<User>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        //[Authorize(Roles = new[] { "Admin", "Moderator" })]*********************
        [UseDbContext(typeof(ApplicationDbContext))]
        public User SaveUser(UserInput input, [Service] IHttpContextAccessor contextAccessor, [ScopedService] ApplicationDbContext dbContext)
        {
            // Add/Update user  
            var user = Save(input.Id, input, dbContext, (user) =>
            {
                // Update Many-to-many relationships 
                dbContext.TryUpdateManyToMany(dbContext.USER_ROLES.Where(x => x.UserId == user.Id), user.Roles);
                
            });

            return user;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        //[Authorize(Roles = new[] { "Admin", "Moderator" })]***********************************
        [UseDbContext(typeof(ApplicationDbContext))]
        public bool DeleteUser(int id, [ScopedService] ApplicationDbContext dbContext) => Delete(id, dbContext);
    }
}

