import { Component } from '@angular/core';

/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  text: string;

  constructor() {
    console.log('Hello GoogleLoginComponent Component');
    this.text = 'Hello World';
  }

}
