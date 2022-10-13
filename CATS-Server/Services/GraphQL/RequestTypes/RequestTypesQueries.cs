using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
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
    public class RequestTypesQueries : BaseQuery
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [UseDbContext(typeof(ApplicationDbContext))]
        [UsePaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<RequestType> GetRequestTypes([ScopedService] ApplicationDbContext dbContext) => dbContext.REQUEST_TYPES.AsQueryable();
    }
}
