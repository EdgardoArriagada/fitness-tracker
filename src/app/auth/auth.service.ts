import { Subject } from 'rxjs/Subject'
import { User } from './user.model';
import { AuthDAta } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    // Subject (ts -> ts) is like an EventEmitter (ts -> html)
    public AuthChange = new Subject<boolean>()
    private user: User

    constructor(private router: Router) {

    }

    registerUser(authData: AuthDAta) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authSuccessfuly()
    }

    login(authData: AuthDAta) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authSuccessfuly()
    }

    logout() {
        this.user = null
        this.AuthChange.next(false)
        this.router.navigate(['/login'])

    }

    getUser() {
        return { ...this.user }
    }

    isAuth() {
        // why does !== doesn't work?
        return this.user != null
    }

    private authSuccessfuly() {
        // .next is like the .emit of the eventEmitter
        this.AuthChange.next(true)
        this.router.navigate(['/training'])
    }
}