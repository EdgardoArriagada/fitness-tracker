import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() menuToggle = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  onMenuClick() {
    this.menuToggle.emit()
  }

}
