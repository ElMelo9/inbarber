import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createHeaders } from '../../helpers/auth-helper';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { tipoDocResponse } from '../../models/tipoDoc.interface';

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
}
