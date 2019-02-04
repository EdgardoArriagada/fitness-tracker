import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = []
  public isLoading$: Observable<boolean>
  public userEmail: AuthData['email']

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.subs.push(
      this.store.select(fromRoot.getUserEmail).subscribe(
      userEmail => {
        this.userEmail = userEmail
      })
    )
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form!.value!.email,
      password: form!.value!.password,
    })
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

}
