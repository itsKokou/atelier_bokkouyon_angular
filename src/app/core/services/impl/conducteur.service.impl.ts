import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../models/rest.response';
import { TrajetService } from '../trajet.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { TrajetCreate, TrajetList } from '../../models/trajet';
import { ConducteurService } from '../conducteur.service';
import { ConducteurList } from '../../models/conducteur';

@Injectable({
  providedIn: 'root'
})
export class ConducteurServiceImpl implements ConducteurService {
  
  private ApiUrl = `${environment.APIURL}/conducteurs`;

  constructor(private http: HttpClient) {}

  findAllList(): Observable<RestResponse<ConducteurList[]>> {
    return this.http.get<RestResponse<ConducteurList[]>>(this.ApiUrl); 
  }

}
