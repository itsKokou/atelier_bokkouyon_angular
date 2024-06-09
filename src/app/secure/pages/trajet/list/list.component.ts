import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { TrajetList } from '../../../../core/models/trajet';
import { RestResponse } from '../../../../core/models/rest.response';
import { User } from '../../../../core/models/authentification';
import { TrajetServiceImpl } from '../../../../core/services/impl/trajet.service.impl';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CommonModule, PaginationComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<TrajetList[]>;

  connectedUser:User=JSON.parse(localStorage.getItem("connectedUser")!);

  constructor(
    private trajetService: TrajetServiceImpl,
  ) {}

  trajets?:RestResponse<TrajetList[]> ;

  paginate(page: number) {
    this.refresh(page)
  }

  refresh(page:number=0){
    this.trajetService.findAll(page).subscribe((data) => {
      this.response = data
      this.dataPagination.currentPage = data.currentPage!
      this.dataPagination.hasNext = data.hasNext!
      this.dataPagination.hasPrev = data.hasPrev!
      this.dataPagination.pages = data.pages! 
      this.dataPagination.totalPages = data.totalPages!
    }); 
  }

  
  ngOnInit(): void { 
    this.refresh();
  }

}
