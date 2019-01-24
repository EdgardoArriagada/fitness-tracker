import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public maxDate: Date
  public isLoading = false
  private loadingSub: Subscription

  constructor(
    private authService: AuthService,
    private uiService: UIService,
  ) { }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading 
    )
    this.maxDate = new Date()    
    this.maxDate.setDate(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form!.value!.email,
      password: form!.value!.password,
    })
  }

  ngOnDestroy() {
    if(this.loadingSub) {
      this.loadingSub.unsubscribe()
    }
  }

}
