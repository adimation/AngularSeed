# Angular Seed Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

Angular 7.2.0,

NG Ant Design 7.2.0,

RXJS 6.3.3,

Typescript 3.2.2

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## For Production
Add following lines in angular.json projects > AMAdminPortal > architect > configurations > production

    "optimization": true,
    "outputHashing": "all",
    "sourceMap": false,
    "extractCss": true,
    "namedChunks": false,
    "aot": true,
    "extractLicenses": true,
    "vendorChunk": false,
    "buildOptimizer": true,
    "budgets": [{
        "type": "initial",
        "maximumWarning": "2mb",
        "maximumError": "5mb"
    }]

and set 'production: true' in environment.prod.ts
