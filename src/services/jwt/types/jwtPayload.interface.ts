export interface IJwtPayload {
  id: string;
  email: string;
  roles: string[];
  isActivated: boolean;
}
