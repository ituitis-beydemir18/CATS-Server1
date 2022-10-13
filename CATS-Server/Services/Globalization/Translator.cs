using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;

namespace CATS_Server.Services.Globalization
{
    public class Translator
    {
        #region injected services
        private readonly IServiceProvider _serviceProvider;
        #endregion

        /// <summary>
        /// 
        /// </summary>
        public Translator(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            LoadDictionary();
        }

        /// <summary>
        /// 
        /// </summary>
        public List<Translation> Translations { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public void LoadDictionary()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                Translations = dbContext.TRANSLATIONS.ToList();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="key"></param>
        /// <param name="lang"></param>
        /// <returns></returns>
        public string Translate(string key, LanguageCode lang = LanguageCode.tr)
        {
            return Translations.FirstOrDefault(x => x.LanguageCode == lang.ToString() && x.Key == key)?.Value ?? key;
        }
    }
}
