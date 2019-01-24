import { Subject } from 'rxjs'
import { User } from './user.model';
import { AuthDAta } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {

    // Subject (ts -> ts) is like an EventEmitter (ts -> html)
    public AuthChange = new Subject<boolean>()
    private isAuthenticated = false

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
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
        this.uiService.loadingStateChanged.next(true)
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password,
        )
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            this.uiService.showSnackBar(error.message, null, 3000)
        })
        .finally(() => {
            this.uiService.loadingStateChanged.next(false)
        })
    }

    login(authData: AuthDAta) {
        this.uiService.loadingStateChanged.next(true)
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password,
        )
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            this.uiService.showSnackBar(error.message, null, 3000)
        })
        .finally(() => {
            this.uiService.loadingStateChanged.next(false)
        })
    }

    logout(): void {
        this.afAuth.auth.signOut()
    }

    isAuth(): boolean {
        return this.isAuthenticated
    }
}
