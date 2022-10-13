using CATS_Server.Models.Entities;
using CATS_Server.Services.GraphQL;
using FastExpressionCompiler;
using Mapster;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Services.Mapster
{
    public static class MapperConfigurationProvider
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static void AddMapperConfiguration(this IServiceCollection services)
        {
            var config = TypeAdapterConfig.GlobalSettings;

            config.NewConfig<UserInput, User>().AfterMapping((src, dest) =>
            {
                dest.Roles = src.Roles?.Select(r => new UserRole() { RoleId = r }).ToList() ?? new List<UserRole>();
            }).IgnoreNullValues(true);

            config.NewConfig<ApplicationInput, Application>().AfterMapping((src, dest) =>
            {
                dest.Roles = src.Roles?.Select(r => new ApplicationRole() { RoleId = r }).ToList() ?? new List<ApplicationRole>();
            }).IgnoreNullValues(true);


            config.Compiler = exp => exp.CompileFast();
        }
}
}
