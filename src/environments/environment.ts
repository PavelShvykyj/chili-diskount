// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBHmGkd0ZMNRQ8hhu2aQvuaPu6S3ULUreA",
    authDomain: "chili-discount.firebaseapp.com",
    databaseURL: "https://chili-discount.firebaseio.com",
    projectId: "chili-discount",
    storageBucket: "chili-discount.appspot.com",
    messagingSenderId: "105850696462"
  }
};
