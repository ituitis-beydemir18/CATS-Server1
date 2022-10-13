using HotChocolate;
using HotChocolate.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Data;
using HotChocolate.AspNetCore.Authorization;

namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: SchemaConstants.Query)]
    public class AccountQueries : BaseQuery
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="contextAccessor"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [Authorize]
        [UseDbContext(typeof(ApplicationDbContext))]
        [UseSingleOrDefault]
        [UseProjection]
        public IQueryable<User> GetMe([Service] IHttpContextAccessor contextAccessor, [ScopedService] ApplicationDbContext dbContext)
            => dbContext.USERS.Where(u => u.Id == contextAccessor.HttpContext.User.GetId());
    }
}
