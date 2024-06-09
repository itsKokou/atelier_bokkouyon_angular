import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    TopbarComponent,
    
  ],
  imports: [CommonModule, SecureRoutingModule,RouterLink],
  exports: [
  
    //Les composants accessibles à l'extérieur du module
  ],
})
export class SecureModule {}
