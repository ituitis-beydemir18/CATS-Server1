using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;
using HotChocolate;
using HotChocolate.AspNetCore;
using HotChocolate.Data;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Execution;
using HotChocolate.Execution.Configuration;
using HotChocolate.Language;
using HotChocolate.Resolvers;
using HotChocolate.Types.Relay;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    public static class ShemaInitializer
    {
        public static void AddGraphQLServices(this IServiceCollection services) =>
            services.AddGraphQLServer()
                .AddAuthorization()
                .AddHttpRequestInterceptor<HttpRequestInterceptor>()
                .AddQueryType(type => type.Name(SchemaConstants.Query))
                .AddType<ApplicationQueries>()
                .AddType<ApplicationTypeQueries>()
                .AddType<AuthenticationQueries>()
                .AddType<AccountQueries>()
                .AddType<LanguageQueries>()
                .AddType<TranslationQueries>()
                .AddType<UserTypeQueries>()
                .AddType<RoleQueries>()
                .AddType<UserQueries>()
                .AddType<UserTypeQueries>()
                .AddType<RequestQueries>()
                .AddType<RequestTypesQueries>()
                .AddType<StationQueries>()
                .AddMutationType(type => type.Name(SchemaConstants.Mutation))
                .AddType<ApplicationMutations>()
                .AddType<AuthenticationMutations>()
                .AddType<AccountMutations>()
                .AddType<LanguageMutations>()
                .AddType<TranslationMutations>()
                .AddType<UserMutations>()
                .AddType<RequestMutations>()
                .AddType<UserExtensions>()
                .AddProjections()
                .AddFiltering()
                .AddSorting()
                .SetPagingOptions(new HotChocolate.Types.Pagination.PagingOptions()
                {
                    IncludeTotalCount = true
                });
    }
    public class HttpRequestInterceptor : DefaultHttpRequestInterceptor
    {
        public override ValueTask OnCreateAsync(HttpContext context,
            IRequestExecutor requestExecutor, IQueryRequestBuilder requestBuilder,
            CancellationToken cancellationToken)
        {
            // Audit Log Request
            return base.OnCreateAsync(context, requestExecutor, requestBuilder,
                cancellationToken);
        }
    }
}
