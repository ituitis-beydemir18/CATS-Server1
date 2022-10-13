using HotChocolate;
using HotChocolate.Execution;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    public static class ExceptionBuilder
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static QueryException Create(string code, string message) => new QueryException(ErrorBuilder.New().SetMessage(message).SetCode(code).Build());

        /// <summary>
        /// 
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static void Throw(string code, string message) => throw new QueryException(ErrorBuilder.New().SetMessage(message).SetCode(code).Build());
    }
}
