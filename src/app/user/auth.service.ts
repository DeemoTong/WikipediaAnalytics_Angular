import { Injectable } from '@angular/core'
import { IUser } from '../models/user.model';

@Injectable()
export class AuthService {
  currentUser:IUser
  loginUser(userName: string, password: string) {
    this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'U-firtname',
      lastName: 'U-lastname'
    }
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName:string, lastName:string) {
    this.currentUser.firstName = firstName
    this.currentUser.lastName = lastName
  }
}