

export interface TrajetList {    
  id: number,
  date: string,
  etat: string,
  pointDepart: string,
  pointArrivee: string,
  nbrPassagers: number,
  nbrPlace: number,
  conducteur: string,
}

export interface TrajetCreate {
  id?: any;
  date?: number | null | undefined;
  conducteur?: number | null | undefined;
  pointDepart?: string | null | undefined;
  pointArrivee?: string | null | undefined;
  nbrPassagers?: number | null | undefined;
  nbrPlace?: number | null|undefined;
  prix?: number |undefined|null;
}
