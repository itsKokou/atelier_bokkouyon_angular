import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../models/rest.response';
import { TrajetService } from '../trajet.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { TrajetCreate, TrajetList } from '../../models/trajet';

@Injectable({
  providedIn: 'root'
})
export class TrajetServiceImpl implements TrajetService {
  
  private ApiUrl = `${environment.APIURL}/trajets`;

  constructor(private http: HttpClient) {}

  findAll(page: number): Observable<RestResponse<TrajetList[]>> {
    return this.http.get<RestResponse<TrajetList[]>>(`${this.ApiUrl}?page= ${page}`); 
  }

  create(dataCreate: TrajetCreate): Observable<RestResponse<TrajetCreate>> {
    return  this.http.post<RestResponse<TrajetCreate>>(`${this.ApiUrl}`, dataCreate);
  }

}
