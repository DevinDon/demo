import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserDetailComponent } from './components/detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
  ],
})
export class UserModule { }
