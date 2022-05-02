import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Mister';

  translatedValue = $localize`:@@my-key-3:Translated value in code.`;

  today = new Date();
}
