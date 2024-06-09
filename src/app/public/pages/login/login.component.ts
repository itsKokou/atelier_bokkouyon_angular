import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthentificateService } from '../../../core/services/auth/authentificate.service';
import { Router } from '@angular/router';
import { RestResponse } from '../../../core/models/rest.response';
import { TokenResponse } from '../../../core/models/authentification';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form: FormGroup;
  error!:string|null;
  
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthentificateService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: '',
      password: '',
    });
  }

  onSubmit() {
    
    let data = this.form.getRawValue();
    console.log(data);
    this.authService.login(data).subscribe((res: RestResponse<TokenResponse>) => {
      
      if (res.statuts==200) {
        //Aller recuperer le user
        this.error=null;
        this.authService.isAuthentificated=true;
        this.authService.username=res.results.username
        this.authService.roles=res.results.roles
        var {token,...user} = res.results;
        localStorage.setItem("token",res.results.token)
        localStorage.setItem("connectedUser",JSON.stringify(user));
        if(user.roles.includes("ROLE_ADMIN")){
          this.router.navigateByUrl('/admin/trajet');
        }else{
          this.authService.isAuthentificated=false;
          this.error="Accès refusé !!!";
        }
      } else {
        this.authService.isAuthentificated=false;
        this.error="Login ou mot de passe incorrect";
        
      }
    });
  }
  
  ngOnInit(): void {
    
  }

}
