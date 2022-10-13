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
    public class TranslationQueries
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
        public IQueryable<Translation> GetTranslations([ScopedService] ApplicationDbContext dbContext) => dbContext.TRANSLATIONS.AsQueryable();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [UseDbContext(typeof(ApplicationDbContext))]
        [UseSingleOrDefault]
        [UseProjection]
        public IQueryable<Translation> GetTranslation(int id, [ScopedService] ApplicationDbContext dbContext) => dbContext.TRANSLATIONS.Where(x => x.Id == id);
    }
}
