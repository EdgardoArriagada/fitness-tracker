import { Subject } from 'rxjs'
import { User } from './user.model';
import { AuthDAta } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {

    // Subject (ts -> ts) is like an EventEmitter (ts -> html)
    public AuthChange = new Subject<boolean>()
    private isAuthenticated = false

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService
    ) { }

    public initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                // .next is like the .emit of the eventEmitter
                this.isAuthenticated = true
                this.AuthChange.next(true)
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubscriptions()
                this.AuthChange.next(false)
                this.isAuthenticated = false
                this.router.navigate(['/login'])
            }
        })
    }

    registerUser(authData: AuthDAta) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password,
        )
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log(error))
    }

    login(authData: AuthDAta) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password,
        )
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log(error))
    }

    logout(): void {
        this.afAuth.auth.signOut()
    }

    isAuth(): boolean {
        return this.isAuthenticated
    }
}
