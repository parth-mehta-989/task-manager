import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreViewComponent } from './core-view/core-view.component';

const routes: Routes = [
  { path: '', component: CoreViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
