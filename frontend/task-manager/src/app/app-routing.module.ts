import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreViewComponent } from './pages/core-view/core-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:"lists/"},
  { path: 'new-list', component: NewListComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path:'lists/:listId', component:CoreViewComponent },
  { path: 'lists', component: CoreViewComponent },
  {path:"**", redirectTo:"lists/"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
