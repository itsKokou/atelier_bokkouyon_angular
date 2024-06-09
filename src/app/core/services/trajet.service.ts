import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { TrajetCreate, TrajetList } from "../models/trajet";

export interface TrajetService { 
    findAll(page: number): Observable<RestResponse<TrajetList[]>>;
    create(dataCreate: TrajetCreate): Observable<RestResponse<TrajetCreate>>;
}
