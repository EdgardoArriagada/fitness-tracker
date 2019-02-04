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
                if (user.emailVerified) {
                    this.store.dispatch(new Auth.SetAuthenticated(user.uid, user.email))
                    this.router.navigate(['/training'])
                } else {
                    // save the email so we can get it on login component
                    this.store.dispatch(new Auth.SetEmail(user.email))
                    this.router.navigate(['/login'])
                }
            } else {
                this.trainingService.cancelSubscriptions()
                this.store.dispatch(new Auth.SetUnauthenticated)
                this.router.navigate(['/login'])
            }
        })
    }

    private sendEmailVerification(): void {
        this.afAuth.auth.currentUser.sendEmailVerification()
            .then(async () => {
                await this.uiService.showSnackBar('An email have been sent to your inbox', null, 3000)
            })
            .catch(async (error) => {
                await this.uiService.showSnackBar(error.message, null, 3000)
            });
    }

    public registerUserAndSendEmail(authData: AuthDAta): void {
        this.store.dispatch(new UI.StartLoading)
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password,
        )
            .then(() => {
                this.sendEmailVerification()
            })
            .catch(error => {
                this.uiService.showSnackBar(error.message, null, 3000)
            })
            .finally(() => {
                this.store.dispatch(new UI.StopLoading)
            })
    }

    public login(authData: AuthDAta) {
        this.store.dispatch(new UI.StartLoading)
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password,
        )
            .then(result => {
                if (!result.user!.emailVerified) {
                    this.uiService.showSnackBar('Please verify your email first before login', null, 3000)
                    this.logout()
                }
            })
            .catch(error => {
                this.uiService.showSnackBar(error.message, null, 3000)
            })
            .finally(() => {
                this.store.dispatch(new UI.StopLoading)
            })
    }

    public logout(): void {
        this.afAuth.auth.signOut()
    }
}
