import { of } from 'rxjs';
import { PermissionsEnum } from 'src/app/enums/permission.enum';

//decorator will return "returnObject" if user doesn't have permission
export function ServicePermissionRequired(permission: PermissionsEnum, returnObject: any = {}) {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function( ... args: any[]) {
            if (this.userService.hasPermission(permission)) {
                const result = original.apply(this, args);
                return result;
            } else {
                return of<any>(returnObject);
            }
        };

        return descriptor;
    };
}


//usage
// @ServicePermissionRequired(PermissionsEnum.PERM_LIST_PRODUCTS, [])
// public getAllProducts(): Observable<Array<ProductDTO>> {
//     return this.get<Array<ProductDTO>>('products');
// }