using HotChocolate;
using Mapster;
using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.Types;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using HotChocolate.Data;
using CATS_Server.Models.Enums;


namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: SchemaConstants.Mutation)]
    public class RequestMutations : BaseMutation<Request>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        /// [Authorize(Roles = new[] { "Admin", "Moderator" })]
        [UseDbContext(typeof(ApplicationDbContext))]
        public Request SaveCorporateRequest(CorporateRequestInput input, [Service] IHttpContextAccessor contextAccessor, [ScopedService] ApplicationDbContext dbContext)
        {
            var request = Save(input.Id, input, dbContext);

            return request;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        /// [Authorize(Roles = new[] { "Admin", "Moderator" })]
        [UseDbContext(typeof(ApplicationDbContext))]
        public Request SavePersonalRequest(CorporateRequestInput input, [Service] IHttpContextAccessor contextAccessor, [ScopedService] ApplicationDbContext dbContext)
        {
            var request = Save(input.Id, input, dbContext);

            return request;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        //[Authorize(Roles = new[] { "Admin", "Moderator" })]
        [UseDbContext(typeof(ApplicationDbContext))]
        public bool DeleteRequest(int id, [ScopedService] ApplicationDbContext dbContext) => Delete(id, dbContext);
    }
}
