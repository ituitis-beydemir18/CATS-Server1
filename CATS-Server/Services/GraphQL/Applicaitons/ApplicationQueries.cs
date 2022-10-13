using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: SchemaConstants.Query)]
    public class ApplicationQueries
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
        public IQueryable<Application> GetApplications([ScopedService] ApplicationDbContext dbContext) => dbContext.APPLICATIONS.AsQueryable();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [UseDbContext(typeof(ApplicationDbContext))]
        [UseSingleOrDefault]
        [UseProjection]
        public IQueryable<Application> GetApplication(int id, [ScopedService] ApplicationDbContext dbContext) => dbContext.APPLICATIONS.Where(x => x.Id == id);
    }
}
