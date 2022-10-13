using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Services.GraphQL
{
    public static class StatusMessages
    {
        public const string InvalidCredential = nameof(InvalidCredential);
        public const string ResourceNotFound = nameof(ResourceNotFound);
        public const string FlightDateMissing = nameof(FlightDateMissing);
        public const string InvalidEndDate = nameof(InvalidEndDate);
        public const string DateRangeExceeded = nameof(DateRangeExceeded);
    }
}
