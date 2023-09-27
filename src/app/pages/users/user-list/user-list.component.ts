import { afterRender, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User, UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export default class UserListComponent {
  // readonly usersService = inject(UsersService);
  private _modalCtrl = inject(ModalController);
  private _alertCtrl = inject(AlertController);
  private _fb = inject(FormBuilder);
  readonly usersService = inject(UsersService);
  readonly userForm = this._fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    isFavorite: [false],
  });

  users = this.usersService.users;

  async dismiss() {
    await this._modalCtrl.dismiss();
  }

  async save() {
    this.usersService.addUser(this.userForm.value as User);
    await this._modalCtrl.dismiss();
    this.userForm.reset();
  }

  async toggleFavorite(user: User) {
    user.isFavorite = !user.isFavorite;
    this.usersService.updateUser(user);
  }

  async removeUser(user: User) {
    await (
      await this._alertCtrl.create({
        header: 'Confirm delete',
        message: `Are you sure you want to remove ${user.firstName} ${user.lastName}`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Yes',
            role: 'destructive',
            handler: () => {
              this.usersService.removeUser(user);
            },
          },
        ],
      })
    ).present();
  }
}
