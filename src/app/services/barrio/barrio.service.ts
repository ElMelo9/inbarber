import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createHeaders } from '../../helpers/auth-helper';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { barrioResponse } from '../../models/barrio.interface';

@Injectable({
  providedIn: 'root'
})
export class BarrioService {

  private apiUrl = environment.apiUrl + 'barrios';

  constructor(private http: HttpClient) { }

  getAll(): Observable<barrioResponse[]> {
    const headers = createHeaders();
    const url = this.apiUrl + '/getAll'
    return this.http.get<barrioResponse[]>(url, { headers })
  }
}
