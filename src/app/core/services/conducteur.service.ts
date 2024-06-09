import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { TrajetCreate, TrajetList } from "../models/trajet";
import { ConducteurList } from "../models/conducteur";

export interface ConducteurService { 
    findAllList(): Observable<RestResponse<ConducteurList[]>>;
}
