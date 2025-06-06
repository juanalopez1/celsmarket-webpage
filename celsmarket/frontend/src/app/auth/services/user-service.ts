import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'http://localhost:8080/users';

  async getByEmail(email: string) {
    try {
        const response = await axios.get(this.url + '/' + email);
        return response.data;
    } catch(e) {
        if (axios.isAxiosError(e) && e.status === 404){
            console.log(e.message);
            return;
        }
    }
  }
}
