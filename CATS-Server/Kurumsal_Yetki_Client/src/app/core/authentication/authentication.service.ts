import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentIdentitySubject: BehaviorSubject<any>;

  constructor(private apollo: Apollo) {
    this.currentIdentitySubject = new BehaviorSubject<any>(null);
  }

  get currentIdentityValue(): any {
    return this.currentIdentitySubject.value;
  }

  login() {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation {
            login {
              authType
              name
              token
            }
          }
        `,
        variables: {},
      })
      .pipe(
        map((response: any) => {
          if (response.data.login) {
            this.currentIdentitySubject.next(response.data?.login);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    this.currentIdentitySubject.next(null);
  }
}
