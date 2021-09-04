import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'reservations/check-availability', component: SearchComponent },
  { path: 'reservations/select-room', component: ResultsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }