import { enableProdMode } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const getLocale = (): string => {
  const availableLocales = ['en', 'de'];

  let locale = window.location.pathname.match(/^\/([A-z]{2})(\/|$)/)?.[1];

  if (!locale) {
    locale =
      // if the url does not include a locale, try to get it from the sessionStorage
      sessionStorage.getItem('app-locale') ??
      // if nothing is stored get the best language as specified by the browser settings
      availableLocales.find((l) => navigator.language.startsWith(l)) ??
      // else just fallback to the default language (en in this case)
      availableLocales[0];
  }

  return locale;
};

const setLocale = (locale: string): void => {
  sessionStorage.setItem('app-locale', locale);
  window.document.documentElement.lang = locale;
};

// get current locale and store it in the session storage
// order of locale determination: url, session storage, browser languages, default language
const locale = getLocale();
setLocale(locale);

// fetch resources for runtime translations. this could also point to an API endpoint
fetch(`assets/i18n/${locale}.json`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return response.json();
  })
  .then((result) => {
    loadTranslations(result.translations);

    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  });
