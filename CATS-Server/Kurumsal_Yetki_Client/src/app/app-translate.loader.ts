import { Injectable } from "@angular/core";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { Apollo } from "apollo-angular";
import { gql } from "apollo-angular";
import { map } from "rxjs/operators";

@Injectable()
export class AppTranslateLoader implements TranslateLoader {
  constructor(private apollo: Apollo) {}

  getTranslation(lang: string): Observable<any> {
    return this.apollo
      .query({
        query: gql`
          query($code: String!) {
            languages(where: { code: { eq: $code } }) {
              id
              code
              name
              translations {
                id
                key
                value
              }
            }
          }
        `,
        variables: { code: lang },
      })
      .pipe(
        map((response: any) => {
          let dictionary = {};
          response.data.languages[0].translations.forEach((item, index) => {
            dictionary[item.key] = item.value;
          });
          return dictionary;
        })
      );
  }
}
