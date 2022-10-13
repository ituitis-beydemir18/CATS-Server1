using HotChocolate;
using Mapster;
using CATS_Server.DataAccess;
using CATS_Server.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.Types;
using HotChocolate.Data;
using CATS_Server.Services.Globalization;

namespace CATS_Server.Services.GraphQL
{
    [ExtendObjectType(name: SchemaConstants.Mutation)]
    public class TranslationMutations : BaseMutation<Translation>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [UseDbContext(typeof(ApplicationDbContext))]
        public Translation SaveTranslation(TranslationInput input, [Service] Translator translator, [ScopedService] ApplicationDbContext dbContext)
        {
            var translation = Save(input.Id, input, dbContext);
            translator.LoadDictionary();
            return translation;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        [UseDbContext(typeof(ApplicationDbContext))]
        public bool DeleteTranslation(int id, [Service] Translator translator, [ScopedService] ApplicationDbContext dbContext)
        {
            var result = Delete(id, dbContext);
            translator.LoadDictionary();
            return result;
        }
    }
}
