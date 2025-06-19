import { inject, Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private userService = inject(UserService);
  private url: string = 'http://localhost:8080';

  constructor(private router: Router) {}

  async logIn(user: User) {
    try {
      const body = { email: user.email, password: user.password };
      const response = await axios.post(this.url + '/login', body);
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined')
        localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', JSON.stringify(response.data.username));

      // Opcional: navegar a otra vista
      this.router.navigate(['/inventory']);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.status === 404) {
        // notificar no se pudo iniciar sesion
        return;
      }
    }
  }

  async register(user: User): Promise<User> {
    const response = await axios.post(this.url + '/users/register', user);
    this.router.navigate(['/login']);
    return response.data;
  }

  async logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  async isAdmin(): Promise<boolean> {
    if (typeof window === 'undefined') {
      console.warn('No hay acceso al window (SSR?)');
      return false;
    }

    const username = localStorage.getItem('username');
    if (!username) return false;

    try {
      const email = username.replace(/"/g, '');
      const user = await this.userService.getByEmail(email);
      return user.role === 'admin';
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return false;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return now >= payload.exp;
    } catch (error) {
      return true; // Si el token está mal formado, lo consideramos inválido
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      this.logOut();
      return false;
    }
    return true;
  }
}
