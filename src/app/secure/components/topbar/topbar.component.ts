import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthentificateService } from '../../../core/services/auth/authentificate.service';
import { User } from '../../../core/models/authentification';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {

  isProfileMenuOpen: Boolean = false
  classeSeance:number= +localStorage.getItem("classeSeance")!;
  professeurSeance:number=+localStorage.getItem("professeurSeance")!;
  couleurSeance:number=+localStorage.getItem("couleurSeance")!;
  connectedUser:User=JSON.parse(localStorage.getItem('connectedUser')!);

  constructor(
    private router : Router,
    private authService: AuthentificateService
  ) {
    
  }

  logout() {
    this.authService.isAuthentificated = false;
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen
  }

  closeProfileMenu() {
    this.isProfileMenuOpen = false
  }

 

  reloadPage(): void {
    var url = this.router.url;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`${url}`])
    })
  }


  reidrectToLoginIfNotAuthenticated(){
    if(localStorage.getItem('token')==null){
      this.router.navigateByUrl('/login');
    }
  }
  
  ngOnInit(): void {
    
    this.reidrectToLoginIfNotAuthenticated();
    // Souscrire aux événements de changement d'URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.reidrectToLoginIfNotAuthenticated();
      }
    });
  }
}
