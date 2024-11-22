
export interface Task{
  id?: number,
  title: string,
  description: string,
  priority: string,
  createdAt?: Date,
  assignedTo?: User,
  userId?: number,
  edit?: boolean
}

export interface User {
    id: number,
    name: string,
    email: string,
    password?: string,
    tasks?: Task[],
}

export interface Users {
  users: User[],
}

export interface UserLogged {
  token: string,
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface Resource {
  id: number,
  type:    String,
  level:   number,
  events?:    Event[],
  critical: boolean,
  createdAt?: Date,
  updatedAt?: Date,
}

export interface Event {
  id: number,
  description: string,
  typeResource: string,
  createdAt: Date,
}

export interface Alert {
  description: string,
  typeResource: string,
  levelResource: number,
  critical: boolean,
  createdAt: Date,
}

export interface Pagination {
  total: number,
  page: number,
  limit: number,
  totalPages: number,
}

export interface PaginationRequest {
  limit: number,
  page: number,
}

export interface AlertRequest {
  events: Alert[],
  pagination: Pagination,
}
