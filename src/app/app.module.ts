import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeEN from '@angular/common/locales/en';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// you can also use dynamic webpack imports with hints for this
registerLocaleData(localeDE);
registerLocaleData(localeEN);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    // set the new BASE_HREF depending if/what language language is included in the url
    // it's also possible not include the language in the url at all as it's stored in the
    // localStorage
    {
      provide: APP_BASE_HREF,
      useFactory: (): string => {
        const locale =
          window.location.pathname.match(/^\/([A-z]{2})(\/|$)/)?.[1];
        return locale ? `/${locale}/` : '/';
      },
    },
    // provide the LOCALE_ID so you can inject the current language in your components
    // and also get the correct formatting for dates, numbers, etc.
    {
      provide: LOCALE_ID,
      useFactory: () => sessionStorage.getItem('app-locale'),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
