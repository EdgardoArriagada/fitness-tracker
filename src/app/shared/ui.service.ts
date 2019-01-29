import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class UIService {

    constructor(
       private snackBar: MatSnackBar, 
    ) {}

    public showSnackBar(message, action, duration) {
        this.snackBar.open(message, action, {
            duration
        })
    }
}