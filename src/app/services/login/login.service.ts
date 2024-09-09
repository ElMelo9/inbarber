import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { LoginI, LoginResponse } from '../../models/login.interface';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl + 'login';

  constructor(private http: HttpClient) { }

  login(form: LoginI): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}`, form)
}

}
