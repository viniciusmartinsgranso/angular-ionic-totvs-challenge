import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TripsPage } from "./pages/trips/trips.page";
import { PaginationPage } from "./pages/pagination/pagination.page";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trips',
    pathMatch: "full"
  },
  {
    path: 'trips',
    component: TripsPage
  },
  {
    path: 'pagination',
    component: PaginationPage
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
