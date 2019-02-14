// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApiURL: 'http://localhost:8080/api',
  firebase:
    {
      apiKey: 'AIzaSyD6A1ZWtpbHMNq1b6yrPYxU_ms_I_HMl0o',
      authDomain: 'iuresti-test-2.firebaseapp.com',
      databaseURL: 'https://iuresti-test-2.firebaseio.com',
      projectId: 'iuresti-test-2',
      storageBucket: 'iuresti-test-2.appspot.com',
      messagingSenderId: '379993128415'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
