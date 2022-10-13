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
    public class RequestQueries : BaseQuery
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
        public IQueryable<Request> GetRequests([ScopedService] ApplicationDbContext dbContext) => dbContext.REQUESTS.AsQueryable();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [UseDbContext(typeof(ApplicationDbContext))]
        [UseSingleOrDefault]
        [UseProjection]
        public IQueryable<Request> GetRequest(int id, [ScopedService] ApplicationDbContext dbContext) => dbContext.REQUESTS.Where(x => x.Id == id);
    }
}
