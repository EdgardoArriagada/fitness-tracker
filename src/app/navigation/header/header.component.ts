import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter()
  isAuth: boolean = false
  authSubscription: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.AuthChange.subscribe(
      authState => {
        this.isAuth = authState
      }
    )
  }

  onMenuClick() {
    this.menuToggle.emit()
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }

}
