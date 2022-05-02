# Angular Runtime i18n example

To run simply use `npm run start`. You can then access the auto detected translation via http://localhost:4200. Or browse another translation via http://localhost:4200/de or http://localhost:4200/en.

To extract translations just use `npm run ng extract-i18n`. The app is currently configured to have a "special" en-x-source locale which is only used so we don't always overwrite the en.json localization file with each extract. This helps to handle EN translations without changing the template source code.

**ATTENTION**: You need to use the JSON translation/interpolation format for your translation files.

To see what's actually happening look into:
* `main.ts` - detect language + load and "apply" language files
* `app.module.ts` - registerLocaleData + set BASE_HREF and LOCALE_ID
* `app.component.(ts|html)` - actually use translation (no difference to AOT handling)
