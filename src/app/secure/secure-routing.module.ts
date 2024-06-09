import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/trajet/list/list.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FormComponent } from './pages/trajet/form/form.component';

const routes: Routes = [
  {
    path: '',
    component: TopbarComponent,
    children: [
      {
        path: 'trajet',
        component: ListComponent
      },
      {
        path: 'trajet-form',
        component: FormComponent
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
