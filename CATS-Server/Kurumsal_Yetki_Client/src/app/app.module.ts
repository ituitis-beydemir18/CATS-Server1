import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppLoadingModule } from "./app-loading.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "@core/core.module";
import { ViewsModule } from "@views/views.module";
import { GraphQLModule } from "./graphql.module";
import { NgxMatomoTrackerModule } from '@ngx-matomo/tracker';
import { NgxMatomoRouterModule } from '@ngx-matomo/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppLoadingModule,
    CoreModule,
    ViewsModule,
    GraphQLModule,
    AppRoutingModule,
    NgxMatomoRouterModule,
    NgxMatomoTrackerModule.forRoot({ trackerUrl: 'https://webanalytics.thy.com', siteId: '1' })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
