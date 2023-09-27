import { computed, effect, Injectable, signal } from '@angular/core';

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
  private readonly _users = signal<User[]>([]);
  readonly users = this._users.asReadonly();
  readonly favoriteUsersCount = computed(
    () => this.users().filter((u) => u.isFavorite).length,
  );
  readonly totalUsersCount = computed(() => this.users().length);
  constructor() {
    try {
      const users = JSON.parse(window.localStorage.getItem('users') ?? '');
      this._users.set(users);
    } catch (err) {
      console.log('Failed to load users from Local Storage');
    }
    // This effect is run when the users signal is updated, and because
    // it reads the value of the signal,
    // then it's run again anytime the signal is updated.
    effect(() => {
      const users = this._users();
      window.localStorage.setItem('users', JSON.stringify(users));
    });
  }

  addUser(user: User) {
    this._users.mutate((arr) => arr.push(user));
  }

  updateUser(user: User) {
    this._users.mutate((arr) =>
      arr.splice(
        arr.findIndex((u) => u.email === user.email),
        1,
        user,
      ),
    );
  }

  removeUser(user: User) {
    this._users.update((arr) => arr.filter((u) => u.email !== user.email));
  }
}
