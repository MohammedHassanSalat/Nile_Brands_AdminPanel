export interface CreateUser {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly confirmPassword: string;
}


export interface User {
  _id: string;
  name: string;
  userImage: string;
}

export interface Pagination {
  currentPage: number;
  limit: number;
  totalpages: number;
  next: number;
  prev: number;
}

export interface UsersResponse {
  length: number;
  pagination: Pagination;
  data: User[];
}

export interface updateUserStatus {
  readonly name: string;
  readonly active: boolean;
}

export interface updateUserPassword {
  readonly password: string;
  readonly confirmPassword: string;
}
