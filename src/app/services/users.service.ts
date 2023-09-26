import { Injectable } from '@angular/core';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  isFavorite: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}
}
