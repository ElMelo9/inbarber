import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { usuarioResponse, UsuarioUpdate, usuarioCreate } from '../../models/usuario.inteface';
import { Observable } from 'rxjs';
import { createHeaders } from '../../helpers/auth-helper';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl + 'usuarios';

  constructor(private http: HttpClient) {

  }

  create(usuario: usuarioCreate): Observable<usuarioResponse> {
    const headers = createHeaders();
    const url = this.apiUrl + '/insert'
    return this.http.post<usuarioResponse>(url,usuario,{headers})
  }


  getAll(): Observable<usuarioResponse[]> {
    const headers = createHeaders();
    const url = this.apiUrl + '/getAll'
    return this.http.get<usuarioResponse[]>(url, { headers })
  }

  updateById(id: number, usuario: UsuarioUpdate): Observable<usuarioResponse> {
    const headers = createHeaders();
    const url = this.apiUrl + '/update/' + id
    return this.http.put<usuarioResponse>(url, usuario, { headers })
  }

  deleteById(id: number): Observable<boolean> {
    const headers = createHeaders();
    const url = this.apiUrl + '/delete/' + id
    return this.http.delete<boolean>(url, { headers })
  }


}
