using CATS_Server.DataAccess;
using CATS_Server.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Services.Configuration
{
    public class AppSettingsConfigureOptions : IConfigureOptions<AppSettings>
    {
        #region injected services
        protected readonly IDbContextFactory<ApplicationDbContext> _dbContextFactory;
        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="serviceProvider"></param>
        public AppSettingsConfigureOptions(IDbContextFactory<ApplicationDbContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        public void Configure(AppSettings options)
        {
            throw new NotImplementedException();
        }
    }
}
