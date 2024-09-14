import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createHeaders } from '../../helpers/auth-helper';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { tipoDocCreate, tipoDocResponse, tipoDocUpdate } from '../../models/tipoDoc.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoDocService {

  private apiUrl = environment.apiUrl + 'tipo-doc';

  constructor(private http: HttpClient) { }

  getAll(): Observable<tipoDocResponse[]> {
    const headers = createHeaders();
    const url = this.apiUrl + '/getAll'
    return this.http.get<tipoDocResponse[]>(url, { headers })
  }

  create(rol: tipoDocCreate): Observable<tipoDocResponse> {
    const headers = createHeaders();
    const url = this.apiUrl + '/insert'
    return this.http.post<tipoDocResponse>(url,rol,{headers})
  }

  updateById(id: number, tipoDoc: tipoDocUpdate): Observable<tipoDocResponse> {
    const headers = createHeaders();
    const url = this.apiUrl + '/update/' + id
    return this.http.put<tipoDocResponse>(url, tipoDoc, { headers })
  }

  deleteById(id: number): Observable<boolean> {
    const headers = createHeaders();
    const url = this.apiUrl + '/delete/' + id
    return this.http.delete<boolean>(url, { headers })
  }
}
