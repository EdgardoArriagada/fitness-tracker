import { Subject } from 'rxjs'
import { AuthDAta } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Auth from 'src/app/auth/auth.actions'

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
        private store: Store<fromRoot.State>,
    ) { }

    public initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.store.dispatch(new Auth.SetAuthenticated(user.uid))
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubscriptions()
                this.store.dispatch(new Auth.SetUnauthenticated)
                this.router.navigate(['/login'])
            }
        })
    }

    registerUser(authData: AuthDAta) {
        this.store.dispatch(new UI.StartLoading)
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
            this.store.dispatch(new UI.StopLoading)
        })
    }

    login(authData: AuthDAta) {
        this.store.dispatch(new UI.StartLoading)
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
            this.store.dispatch(new UI.StopLoading)
        })
    }

    logout(): void {
        this.afAuth.auth.signOut()
    }
}
