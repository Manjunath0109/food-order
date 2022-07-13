import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'food',
    loadChildren: () =>
      import('src/app/menu/menu.module').then((mod) => mod.MenuModule),
  },
  { path: '', redirectTo: '/food/menu', pathMatch: 'full' },
  { path: '**', redirectTo: '/food/menu' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
