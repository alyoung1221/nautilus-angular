import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'reservations/check-availability', component: SearchComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }