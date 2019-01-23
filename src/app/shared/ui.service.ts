import { Subject } from 'rxjs'
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UIService {
    public loadingStateChanged = new Subject<boolean>()
}