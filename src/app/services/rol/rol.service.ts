import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { rolCreate, rolResponse, rolUpdate } from '../../models/rol.interface';
import { Observable } from 'rxjs';
import { createHeaders } from '../../helpers/auth-helper';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl = environment.apiUrl + 'roles';

  constructor(private http: HttpClient) { }

  getAll(): Observable<rolResponse[]> {
    const headers = createHeaders();
    const url = this.apiUrl + '/getAll'
    return this.http.get<rolResponse[]>(url, { headers })
  }

  create(rol: rolCreate): Observable<rolResponse> {
    const headers = createHeaders();
    const url = this.apiUrl + '/insert'
    return this.http.post<rolResponse>(url,rol,{headers})
  }

  updateById(id: number, usuario: rolUpdate): Observable<rolResponse> {
    const headers = createHeaders();
    const url = this.apiUrl + '/update/' + id
    return this.http.put<rolResponse>(url, usuario, { headers })
  }

  deleteById(id: number): Observable<boolean> {
    const headers = createHeaders();
    const url = this.apiUrl + '/delete/' + id
    return this.http.delete<boolean>(url, { headers })
  }
}
