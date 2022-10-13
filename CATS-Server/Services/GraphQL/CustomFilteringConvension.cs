using HotChocolate.Data;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    public class CustomFilteringConvension : FilterConvention
    {
        protected override void Configure(IFilterConventionDescriptor descriptor)
        {
            descriptor.AddDefaults();
            descriptor.Operation(DefaultFilterOperations.Contains).Name("contains");
            descriptor.AddProviderExtension(
                new QueryableFilterProviderExtension(
                    x => x.AddFieldHandler<QueryableStringInvariantEqualsHandler>()));
        }
    }
}
