import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [
    MatCardModule,
    MatChipsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  userInformation: any = {};

  constructor(private router: Router, private authService: AuthService) {}

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  nombre: string = '';
  email: string = '';
  rol: string = '';
  avatar: string = '';
  ultimo_acceso: string = '';


  ngOnInit(): void {
    this.getUserInfo();  
  }

  // get user Info from local storage
  getUserInfo() {
    const userName = this.authService.getUserName();
    const email = this.authService.getUserEmail();
    const rol = this.authService.getUserRole();
    const avatar = this.authService.getUserAvatar();
    const ultimo_acceso = this.authService.getUserLastAccess();

    this.userInformation = {
      userName: userName,
      email: email,
      rol: rol,
      avatar: avatar,
      ultimo_acceso: ultimo_acceso
    };    
  }

}
