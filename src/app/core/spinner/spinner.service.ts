import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface SpinnerState {
    show: boolean;
}

@Injectable()
export class SpinnerService {
    private spinnerSubject = new Subject<SpinnerState>();

    public spinnerState = this.spinnerSubject.asObservable();

    constructor() { }

    public show(): void {
        this.spinnerSubject.next(<SpinnerState>{ show: true });
    }

    public hide(): void {
        this.spinnerSubject.next(<SpinnerState>{ show: false });
    }
}