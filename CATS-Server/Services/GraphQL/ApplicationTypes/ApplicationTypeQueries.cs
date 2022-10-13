using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;
using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Data;

namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: SchemaConstants.Query)]
    public class ApplicationTypeQueries
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [UseDbContext(typeof(ApplicationDbContext))]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<ApplicationType> GetApplicationTypes([ScopedService] ApplicationDbContext dbContext) => dbContext.APPLICATION_TYPES.AsQueryable();
    }
}
