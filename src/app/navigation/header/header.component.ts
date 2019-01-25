import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() menuToggle = new EventEmitter()
  isAuth$: Observable<boolean>
  authSubscription: Subscription

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onMenuClick() {
    this.menuToggle.emit()
  }

  onLogout() {
    this.authService.logout()
  }

}
