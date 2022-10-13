using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;
using HotChocolate.Types;
using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: nameof(User))]
    public class UserExtensions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [UseDbContext(typeof(ApplicationDbContext))]
        [UseProjection]
        [UseSorting]
        public IQueryable<Application> GetApplications(
            [Parent] User user,
            [ScopedService] ApplicationDbContext dbContext)
        {
            return dbContext.APPLICATIONS.Where(a => (a.GuestAccess ?? false) || a.Roles.Any(ar => ar.Role.UserRoles.Any(ur => ur.UserId == user.Id)));
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        /// //[Authorize(Roles = new[] { "Admin" })]****************************************
        [UseDbContext(typeof(ApplicationDbContext))]
        [UseProjection]
        [UseSorting]
        [UseFiltering]
        [UsePaging]
        public IQueryable<Request> GetReviewerRequestsbyUser([Parent] User user, [ScopedService] ApplicationDbContext dbContext)
        {
            return dbContext.REQUESTS.Where(r => r.ReviewerId == user.Id);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        /// //[Authorize(Roles = new[] { "Admin" })]****************************************
        [UseDbContext(typeof(ApplicationDbContext))]
        [UseProjection]
        [UseSorting]
        [UseFiltering]
        [UsePaging]
        public IQueryable<Request> GetRequesterRequestsbyUser([Parent] User user, [ScopedService] ApplicationDbContext dbContext)
        {
            return dbContext.REQUESTS.Where(r => r.RequesterId == user.Id);
        }
    }
}
