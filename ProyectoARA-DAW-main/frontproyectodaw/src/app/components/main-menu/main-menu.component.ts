import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
  title = '';

  constructor(private router: Router) {}


  //functionto redirect
  redirectTo(path: string) {
    this.router.navigate([path]);
  }

}
