using HotChocolate;
using Mapster;
using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CATS_Server.Services.GraphQL;
using HotChocolate.Types;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;

namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: SchemaConstants.Mutation)]
    public class LanguageMutations : BaseMutation<Language>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [Authorize(Roles = new[] { "Admin", "Moderator" })]
        [UseDbContext(typeof(ApplicationDbContext))]
        public Language SaveLanguage(LanguageInput input, [ScopedService] ApplicationDbContext dbContext) => Save(input.Id, input, dbContext);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [Authorize(Roles = new[] { "Admin", "Moderator" })]
        [UseDbContext(typeof(ApplicationDbContext))]
        public bool DeleteLanguage(int id, [ScopedService] ApplicationDbContext dbContext) => Delete(id, dbContext);
    }
}
