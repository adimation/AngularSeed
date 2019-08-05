import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APP_SETTINGS, IAppSettings } from '../app-settings';
import { ApplicationService } from './application.service';
import { UserService } from './user.service';
import { stringify } from '@angular/core/src/util';

interface ILog {
    date: Date;
    log: string;
    component: string;
    method: string;
}

@Injectable()
export class LoggerService {

    public currentMethod: string;

    constructor(
        @Inject(APP_SETTINGS) protected config: IAppSettings,
        protected applicationService: ApplicationService,
        protected userService: UserService,
        protected http: HttpClient
    ) {
    }

    public info(...msg): void {
        if (environment.loggerEnabled) {
            console.info(...msg);
        }
    }

    public debug(...msg): void {
        if (environment.loggerEnabled) {
            console.debug(...msg);
        }
    }

    public warn(...msg): void {
        if (environment.loggerEnabled) {
            console.error(...msg);
        }
    }

    public error(...msg): void {
        if (environment.loggerEnabled) {
            console.error(...msg);
        }
    }

    public infoToServer(msg: string): void {
        // var err = new Error();
        // err.stack.split('\n')[1].indexOf('infoToServer')
        // let ee = /\w+\.(\w+) /.exec(err.stack.split('\n')[2].trim())[0].trim().split('.');
        // console.log(ee);
        debugger;
        if (environment.loggerToServerEnabled) {
            this.sendLogToServer('Logging/Info', {date: new Date(), component: this.getCalleeComponent('infoToServer'), method: this.getCalleeMethod('infoToServer'), log: msg});
        }
    }

    public debugToServer(msg: string): void {
        if (environment.loggerToServerEnabled) {
            this.sendLogToServer('Logging/Debug', {date: new Date(), component: this.getCalleeComponent('debugToServer'), method: this.getCalleeMethod('debugToServer'), log: msg});
        }
    }

    public warnToServer(msg: string): void {
        if (environment.loggerToServerEnabled) {
            this.sendLogToServer('Logging/Warn', {date: new Date(), component: this.getCalleeComponent('warnToServer'), method: this.getCalleeMethod('warnToServer'), log: msg});
        }
    }

    public errorToServer(msg: string): void {
        if (environment.loggerToServerEnabled) {
            this.sendLogToServer('Logging/Error', {date: new Date(), component: this.getCalleeComponent('errorToServer'), method: this.getCalleeMethod('errorToServer'), log: msg});
        }
    }

    private getCalleeComponent(methodToSearch: string): string {
        try{
            let err: Error = new Error();
            let index: number = 0;
            let errArray: string[] = err.stack.split('\n');
            for(let i = 0; i < errArray.length; i++) {
                if(errArray[i].indexOf(methodToSearch) != -1){
                    index = i+1;
                    break;
                }
            }
            let compMethodStr: string[] = /\w+\.(\w+) /.exec(err.stack.split('\n')[index].trim())[0].trim().split('.');
            return compMethodStr[0];
        }catch(e) {
            return "";
        }
    }

    private getCalleeMethod(methodToSearch: string): string {
        try{
            let err: Error = new Error();
            let index: number = 0;
            let errArray: string[] = err.stack.split('\n');
            for(let i = 0; i < errArray.length; i++) {
                if(errArray[i].indexOf(methodToSearch) != -1){
                    index = i+1;
                    break;
                }
            }
            let compMethodStr: string[] = /\w+\.(\w+) /.exec(err.stack.split('\n')[index].trim())[0].trim().split('.');
            return compMethodStr[1];
        }catch(e) {
            return "";
        }
    }

    private sendLogToServer(url: string, body: ILog): void {
        this.http.post(this.config.apiEndpoint + url, body).subscribe(
            (res: any) => {
                debugger;
            },
            (err: any) => {
                debugger;
            }
        );
    }
}
