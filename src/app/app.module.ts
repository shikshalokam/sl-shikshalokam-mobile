import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { FormsModule }   from '@angular/forms';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ApiProvider } from '../app/api/api';
import {CurrentUserProvider} from './current-user';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,HttpModule,
    HttpClientModule,FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    StatusBar, AppLauncher,InAppBrowser,Network,
    SplashScreen,CurrentUserProvider,ApiProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private statusBar: StatusBar) {this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#af4038'); }

}
