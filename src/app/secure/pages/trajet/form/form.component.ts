import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConducteurList } from '../../../../core/models/conducteur';
import { RestResponse } from '../../../../core/models/rest.response';
import { TrajetServiceImpl } from '../../../../core/services/impl/trajet.service.impl';
import { Router } from '@angular/router';
import { ConducteurServiceImpl } from '../../../../core/services/impl/conducteur.service.impl';
import { User } from '../../../../core/models/authentification';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  form = this.fb.group({
    id: new FormControl(),
    date: [0, [Validators.required,this.validateDate]],
    conducteur:[0],
    pointDepart: ["",[Validators.required,Validators.minLength(4)]],
    pointArrivee: ["",[Validators.required,Validators.minLength(4)]],
    nbrPassagers:[0,[Validators.required, Validators.min(0)]],
    nbrPlace:[0,[Validators.required, Validators.min(1)]],
    prix:[0.0,[Validators.required, Validators.min(50)]],
  });


  get id() {
    return this.form.controls['id'] as FormControl;
  }
  get date() {
    return this.form.controls['date'] as FormControl;
  }
  get conducteur() {
    return this.form.controls['conducteur'] as FormControl;
  }
  get pointDepart() {
    return this.form.controls['pointDepart'] as FormControl;
  }
  get pointArrivee() {
    return this.form.controls['pointArrivee'] as FormControl;
  }
  get nbrPassagers() {
    return this.form.controls['nbrPassagers'] as FormControl;
  }
  get nbrPlace() {
    return this.form.controls['nbrPlace'] as FormControl;
  }
  get prix() {
    return this.form.controls['prix'] as FormControl;
  }

  isEdit: Boolean = false;
  id_data: string  = "";
  echec: String | null = null;
  success: String | null = null;
  conducteurList?:RestResponse<ConducteurList[]> ;
  connectedUser:User=JSON.parse(localStorage.getItem("connectedUser")!);

  constructor(
    private fb: FormBuilder,
    private service: TrajetServiceImpl,
    private conducteurService: ConducteurServiceImpl,
    private router: Router
  ) {
   
  }

  
  validateDate(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate: Date = new Date(control.value);
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0)
    if (selectedDate<today) { // 0 représente dimanche
      return { 'dateIsPast': true };
    } 
    return null;
  }

  
  onSubmit() {
    const { ...formData} = this.form.value;
    console.log(formData);
    
    this.service.create(formData).subscribe((data) => {
      if (data.statuts == 201) {
        this.form.reset();
        this.echec=null;
        this.success = 'Enregistrement effectué avec succès';
        setTimeout(() => {this.success = null;}, 3000);
      } else {
        this.echec = "Erreur d'enregistrement";
      }
    });

  }


 
  ngOnInit(): void {
    this.conducteurService.findAllList().subscribe((data)=>this.conducteurList=data);
    if (this.connectedUser.roles.includes('ROLE_CONDUCTEUR')) {
      this.conducteur.setValue(this.connectedUser.userId);
    }else{
      this.conducteur.addValidators(Validators.min(1))
    }
  }
}
