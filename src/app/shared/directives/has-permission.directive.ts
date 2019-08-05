import { Directive, ElementRef, OnInit, Input, Renderer, OnChanges, SimpleChanges } from '@angular/core';
 
@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
    @Input('hasPermission')
    elementPermission: string;
    @Input('readOnlyAttr')
    readOnlyAttr: boolean = false;
    @Input('hideAttr')
    hideAttr: boolean = false;
    @Input('disableAttr')
    disableAttr: boolean = false;
    @Input('disableInputAttr')
    disableInputAttr: boolean = false;
    @Input('userPermissions')
    userPermissions: string[];

    private pass: boolean;

    constructor(private element: ElementRef, private renderer: Renderer) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateElement();
    }

    ngOnInit(): void {
        this.updateElement();
    }

    updateElement(): void {
        if (this.userPermissions == null) {
            return;
        }

        if (this.userPermissions.indexOf(this.elementPermission) === -1) {
            if (this.readOnlyAttr) {
                this.element.nativeElement.readOnly = this.readOnlyAttr;
            }
            if (this.hideAttr) {
                this.element.nativeElement.hidden = true;
            }
            if (this.disableAttr) {
                this.element.nativeElement.disabled = this.disableAttr;
            }
            if (this.disableInputAttr) {
                this.renderer.setElementAttribute(this.element.nativeElement, 'disableInput', 'true');
                this.element.nativeElement.querySelector('input').disabled = true;
            }
        } else {
            if (this.readOnlyAttr) {
                this.element.nativeElement.readOnly = this.readOnlyAttr;
            }
            if (this.hideAttr) {
                this.element.nativeElement.hidden = false;
            }
            if (this.disableAttr) {
                this.element.nativeElement.disabled = !this.disableAttr;
            }
            if (this.disableInputAttr) {
                this.renderer.setElementAttribute(this.element.nativeElement, 'disableInput', 'true');
                this.element.nativeElement.querySelector('input').disabled = false;
            }
        }
    }
}