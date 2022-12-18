import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo, gql } from "apollo-angular";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private currentUserSubject: BehaviorSubject<any>;
  private currentStationSubject: BehaviorSubject<any>;

  constructor(private apollo: Apollo) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentStationSubject = new BehaviorSubject<any>(null);
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  get currentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  fetchUser(): Observable<any> {
    return this.apollo
      .query<any>({
        query: gql`
          query {
            me {
              id
              name
              applications(order: { rowIndex: ASC }) {
                id
                name
                typeId
                groupName
                pageUrl
                iconUrl
                rowIndex
                type {
                  id
                  name
                }
              }
              language {
                id
                name
                code
              }
            }
          }
        `,
      })
      .pipe(
        map(({ data, loading }: any) => {
          this.currentUserSubject.next(data.me);
          return data.me;
        })
      );
  }

  savePreferences(input: any): void {
    this.apollo
      .mutate({
        mutation: gql`
          mutation($input: AccountPreferencesInput) {
            saveAccountPreferences(input: $input)
          }
        `,
        variables: {
          input: input,
        },
      })
      .subscribe((result: any) => this.fetchUser().subscribe());
  }
}
