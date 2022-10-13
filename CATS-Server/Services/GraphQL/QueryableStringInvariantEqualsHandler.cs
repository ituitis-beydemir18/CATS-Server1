using HotChocolate;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Language;
using HotChocolate.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    public class QueryableStringInvariantEqualsHandler : QueryableStringOperationHandler
    {
        public QueryableStringInvariantEqualsHandler(InputParser inputParser) : base(inputParser) { }

        private static readonly MethodInfo _toLower = typeof(string)
            .GetMethods()
            .Single(
                x => x.Name == nameof(string.ToLower) &&
                x.GetParameters().Length == 0);

        protected override int Operation => DefaultFilterOperations.Contains;

        public override Expression HandleOperation(
            QueryableFilterContext context,
            IFilterOperationField field,
            IValueNode value,
            object parsedValue)
        {

            Expression property = context.GetInstance();

            if (parsedValue == null)
            {
                return FilterExpressionBuilder.Equals(property, Expression.Constant(null));
            }

            if (parsedValue is string str)
            {
                return FilterExpressionBuilder.Contains(Expression.Call(property, _toLower), str.ToLower().RemoveDiacritics());
            }

            throw new InvalidOperationException();
        }
    }
}
