import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { rolResponse } from '../../models/rol.interface';
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
}
