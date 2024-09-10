import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { usuarioResponse } from '../../models/usuario.inteface';
import { Observable} from 'rxjs';
import { createHeaders } from '../../helpers/auth-helper';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl + 'usuarios';

  constructor(private http: HttpClient) {

   }


   getAll(): Observable<usuarioResponse[]>{
    const headers = createHeaders();
    const url = this.apiUrl + '/getAll'
    return this.http.get<usuarioResponse[]>(url, { headers })
   }



}
