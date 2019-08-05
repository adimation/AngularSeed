import { LoggerService } from './../services/logger.service';
import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map, catchError, tap, finalize, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as _ from 'pako';
import { APP_SETTINGS, IAppSettings } from '../app-settings';
import { ApplicationService } from '../services/application.service';
import { AppInjector } from '../../app.injector';
import { UserService } from '../services/user.service';
import { ServerException } from 'src/app/models/server-exception';

// @Injectable()
export class BaseService {
    public static spinnerCounter = 0;
    protected http: HttpClient;
    protected loggerService: LoggerService;
    private self: BaseService;
    private timeoutValue: number = 60000; //will be overridden by config.requestTimeoutValue

    constructor(
        @Inject(APP_SETTINGS) protected config: IAppSettings,
        protected applicationService: ApplicationService,
        protected userService: UserService
    ) {
            const injector = AppInjector.getInjector();
            this.http = injector.get(HttpClient);
            this.self = this;
            this.timeoutValue = config.requestTimeoutValue;
    }

    protected getAll<T>(url: string, showSpinner: boolean = true): Observable<T> {
        if (showSpinner) { this.addSpinner(); }
        return this.http.get<T>(this.config.apiEndpoint + encodeURI(url))
        .pipe(
            timeout(this.timeoutValue),
            map(this.handleResponse),
            catchError((error) => this.handleError(error, this)),
            finalize(() => {
                if (showSpinner) {
                    this.removeSpinner();
                }
            })
        );
    }

    protected get<T>(url: string, showSpinner: boolean = true, addHeaders: boolean = false): Observable<T> {
        if (showSpinner) { this.addSpinner(); }
        let options: any = {};
        // if (addHeaders) {
        //     const headers: HttpHeaders = new HttpHeaders({
        //         'Content-Type': 'application/pdf; charset=x-user-defined-binary',
        //         'Content-Encoding': 'gzip'
        //     });
        //     options = {
        //         headers
        //     };
        // }
        return this.http.get<Observable<T>>(this.config.apiEndpoint + encodeURI(url), options)
        .pipe(
            timeout(this.timeoutValue),
            map(this.handleResponse),
            catchError((error) => this.handleError(error, this)),
            finalize(() => {
                if (showSpinner) {
                    this.removeSpinner();
                }
            })
        );
    }

    protected post<T>(url: string, body: any, showSpinner: boolean = true, addHeaders: boolean = true): Observable<T> {
        if (showSpinner) { this.addSpinner(); }
        let options: any = {};
        if (addHeaders) {
            const headers: HttpHeaders = new HttpHeaders({
                'Content-Type': 'application/json'
            });
            options = {
                headers
            };
        }
        return this.http.post<T>(this.config.apiEndpoint + url, body, options)
        .pipe(
            timeout(this.timeoutValue),
            map(this.handleResponse),
            catchError((error) => this.handleError(error, this)),
            finalize(() => {
                if (showSpinner) {
                    this.removeSpinner();
                }
            })
        );
    }

    protected put<T>(url: string, body: any, showSpinner: boolean = true, addHeaders: boolean = true): Observable<T> {
        if (showSpinner) { this.addSpinner(); }
        let options: any = {};
        if (addHeaders) {
            const headers: HttpHeaders = new HttpHeaders({
                'Content-Type': 'application/json'
            });
            options = {
                headers
            };
        }
        return this.http.put<T>(this.config.apiEndpoint + url, body, options)
        .pipe(
            timeout(this.timeoutValue),
            map(this.handleResponse),
            catchError((error) => this.handleError(error, this)),
            finalize(() => {
                if (showSpinner) {
                    this.removeSpinner();
                }
            })
        );
    }

    protected post_<T>(url: string, body: any, showSpinner: boolean = true): Observable<T> {
        if (showSpinner) { this.addSpinner(); }
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json; charset=x-user-defined-binary',
            'Content-Encoding': 'gzip'
        });
        const options: any = {
            headers
        };
        const stingtogzip = JSON.stringify(body);
        const gzipstring = _.gzip(stingtogzip);
        const blob = new Blob([gzipstring]);
        return this.http.post<T>(this.config.apiEndpoint + url, blob, options)
        .pipe(
            timeout(this.timeoutValue),
            map(this.handleResponse),
            catchError((error) => this.handleError(error, this)),
            finalize(() => {
                if (showSpinner) {
                    this.removeSpinner();
                }
            })
        );
    }

    private handleError(error: HttpErrorResponse, that: BaseService) {
        if (error.status === 401) { // unauthurized api call.
            that.userService.logout();
            this.removeSpinner();
            return;
            //return throwError('Unauthorized request.');
        }

        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        // return throwError('Something bad happened; please try again later.');
        let serverException: ServerException = error.error;
        if(!serverException.Message) {
            serverException.Message = 'Something went wrong. Please try again.';
        }
        return throwError(serverException);
    }

    private handleResponse(value: any): any {
        return value;
    }

    private addSpinner = () => {
        BaseService.spinnerCounter++;
        setTimeout(() => this.applicationService.showLoaderOverlay());
    }

    private removeSpinner = () => {
        BaseService.spinnerCounter--;
        if (BaseService.spinnerCounter <= 0) {
            setTimeout(() => this.applicationService.hideLoaderOverlay());
            BaseService.spinnerCounter = 0;
        }
    }
}
