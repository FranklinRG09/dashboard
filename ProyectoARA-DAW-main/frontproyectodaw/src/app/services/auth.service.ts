import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private apiService: ApiService, private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        return this.http.post(this.apiService.API_ENDPOINTS.authentication.login, { "email": email, "password": password })
            .pipe(tap((response: any) => {
                if (response && response.token) {
                    sessionStorage.setItem('token', response.token);
                }
            }));
    }

    register(name: string, email: string, password: string, rol: string, avatar:string): Observable<any> {
        return this.http.post(this.apiService.API_ENDPOINTS.authentication.register,
            {
                "nombre": name,
                "email": email,
                "password": password,
                "rol": rol,
                "avatar": avatar
            });
    }

    logout(): void {
        sessionStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
        return !!sessionStorage.getItem('token');
    }

    getUserId(): string | null {
        return sessionStorage.getItem('user');
    }

    getUserName(): string | null {
        const token = sessionStorage.getItem('token');
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            return decodedPayload.nombre;
        }
        return null;
    }

    getUserEmail(): string | null {
        const token = sessionStorage.getItem('token');
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            return decodedPayload.sub;
        }
        return null;
    }

    getUserRole(): string | null {
        const token = sessionStorage.getItem('token');
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            return decodedPayload.rol;
        }
        return null;
    }

    getUserAvatar(): string | null {
        const token = sessionStorage.getItem('token');
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            return decodedPayload.avatar;
        }
        return null;
    }

    getUserLastAccess(): string | null {
        const token = sessionStorage.getItem('token');
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            return decodedPayload.ultimo_acceso;
        }
        return null;
    }
}
