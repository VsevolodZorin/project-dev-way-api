// export type UserType = Omit<UserEntity, 'password'>;

// todo role type admin | user
export type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  // todo role string or RoleType
  roles: string[];
  isActivated: boolean;
};
