import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Observable } from 'rxjs';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public maxDate: Date
  public isLoading$: Observable<boolean>

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.maxDate = new Date()    
    this.maxDate.setDate(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUserAndSendEmail({
      email: form!.value!.email,
      password: form!.value!.password,
    })
  }

}
