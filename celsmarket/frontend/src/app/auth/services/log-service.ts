import { inject, Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from './user-service';
import { toast } from 'ngx-sonner';

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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', JSON.stringify(response.data.username));
      toast.success('Sesión iniciada correctamente!');
      this.router.navigate(['/inventory']);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && (e.status === 404 || e.status === 401)) {
        toast.error('No se pudo iniciar. Credenciales incorrectas.');
        return;
      }
    }
  }

  async register(user: User): Promise<User> {
    const response = await axios.post(this.url + '/users/register', user);

    toast.success('Has sido registrado correctamente!', {
      description: 'Ahora puedes iniciar sesión con tu email y contraseña.',
    });
    return response.data;
  }

  async logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.clear();
    this.router.navigate(['/inventory']);
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
