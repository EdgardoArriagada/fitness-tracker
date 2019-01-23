import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private isLoading = false
  private loadingSubs: Subscription

  constructor(
    private authService: AuthService,
    private uiService: UIService,
  ) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading
    )
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form!.value!.email,
      password: form!.value!.password,
    })
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe()
  }

}
