import { RoleDTO } from '../role/role-dto';

export class UserDTO {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public langKey: string;
    public imageUrl: string;
    public roles: Array<RoleDTO>
}