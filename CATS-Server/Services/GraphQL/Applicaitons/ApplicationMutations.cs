using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.Data;
using CATS_Server.Extensions;

namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: SchemaConstants.Mutation)]
    public class ApplicationMutations : BaseMutation<Application>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        //[Authorize(Roles = new[] { "Admin" })]****************************************
        [UseDbContext(typeof(ApplicationDbContext))]
        public Application SaveApplication(ApplicationInput input, [ScopedService] ApplicationDbContext dbContext)
        {
            // Add/Update user  
            var application = Save(input.Id, input, dbContext, (application) =>
            {
                // Update Many-to-many relationships 
                dbContext.TryUpdateManyToMany(dbContext.APPLICATION_ROLES.Where(x => x.ApplicationId == application.Id), application.Roles);
            });

            return application;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dbContext"></param>
        //[Authorize(Roles = new[] { "Admin" })]*********************************************
        [UseDbContext(typeof(ApplicationDbContext))]
        public bool DeleteApplication(int id, [ScopedService] ApplicationDbContext dbContext) => Delete(id, dbContext);
    }
}
