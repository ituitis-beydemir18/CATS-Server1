import { NgModule } from "@angular/core";
import { AlertService } from "@shared/notification/services/alert.service";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { InMemoryCache } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client/link/core";
import { HttpErrorResponse } from "@angular/common/http";

// URL of the GraphQL server
const uri = "/graphql";

export function createApollo(httpLink: HttpLink, alert: AlertService) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      // determine error type (internal or user-handled)
      let errorCode = (graphQLErrors[0]?.extensions?.code ??
        graphQLErrors[0]?.extensions?.message ??
        graphQLErrors[0]?.message) as string;
      let errorDescription = errorCode + " (Description)";

      // create message for user-aware handled errors
      if (graphQLErrors[0]?.extensions?.code) {
        var message = "";
        for (let error of graphQLErrors) {
          message =
            message == ""
              ? error.message
              : message.concat(error.message, "\r\n");
        }
      }

      // fire-up the error dialog
      alert.error(errorCode, errorDescription, message);
    } else if (networkError) {
      // cast error to httpErrorResponse
      let httpError = networkError as HttpErrorResponse;
      let errorCode = `${httpError.status}-${httpError.statusText}`;
      let errorDescription = `${errorCode} (Description)`;

      // fire-up the error dialog
      alert.error(errorCode, errorDescription);
    }
  });
  const link = httpLink.create({ uri });
  const linkWithErrorHandling = ApolloLink.from([errorLink, link]);

  return {
    link: linkWithErrorHandling,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-first",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    },
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AlertService],
    },
  ],
})
export class GraphQLModule {}
