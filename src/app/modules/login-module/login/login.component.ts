import { Router } from '@angular/router';
import { LoggerService } from '../../../core/services/logger.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../core/abstraction/base-component';
import { ApplicationService } from '../../../core/services/application.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ApplicationUserService } from '../../../services/application-user.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
    public validateForm: FormGroup;
    public formSubmitError: string;
    public isLoading: boolean = false;
    private authWindow: Window;

    constructor(
        private fb: FormBuilder,
        protected applicationService: ApplicationService,
        protected loggerService: LoggerService,
        protected applicationUserService: ApplicationUserService,
        private localstorageService: LocalStorageService,
        private route: Router,
        private accountService: AccountService
    ) {
        super(applicationService, loggerService);
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });
    }

    public submitForm(): void {
        if (this.isLoading) {
            return;
        }

        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        if (this.validateForm.valid) {
            this.isLoading = true;
            this.formSubmitError = null;

            this.route.navigateByUrl('/dashboard');

            // this.accountService.login(
            //     this.validateForm.value.userName,
            //     this.validateForm.value.password
            // ).subscribe(
            //     (resp: any) => {
            //         this.loggerService.debug(resp);
            //         this.localstorageService.saveToken(resp.access_token);
            //         this.route.navigateByUrl('/dashboard');
            //     },
            //     (error: any) => {
            //         this.formSubmitError = error.error_description;
            //         this.isLoading = false;
            //     }
            // );
        }
    }
}
