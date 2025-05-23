import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { routeTransitionAnimations } from '../route-transition';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MainMenuComponent,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIcon,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ProfileMenuComponent,
    MatButtonModule
  ],
  animations: [
    routeTransitionAnimations
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontproyectodaw';
  isSidenavOpen = true;
  isUserLoggedIn: boolean = false;


  constructor(private http: HttpClient, private router: Router, public route: ActivatedRoute, private authService: AuthService) {}

  toggleMenu() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  ngOnInit(): void {
    this.saveUser('1');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isUserLoggedIn = this.authService.isLoggedIn();        
      }
    });
  }
  
  // Funcion para guar usuario en localstorage
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Función para redireccionar a la página de login
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  // Función para redireccionar a la página de registro
  redirectToRegister() {
    this.router.navigate(['/register']);
  }


}
