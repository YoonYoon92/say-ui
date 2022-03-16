import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <ExtContainer
      [viewport]="true"
      layout="vbox"
      padding="0 0 0 0"
    >
        <ExtPanel  [flex]="1">
          <router-outlet></router-outlet>
        </ExtPanel>
    </ExtContainer>
  `,
  styles: []
})
export class AppComponent implements OnInit{

  constructor( private router: Router) {}

  ngOnInit() {}

}
