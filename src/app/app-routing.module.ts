import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { NoAuthGuard } from './shared/guards/no-auth.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'external',
        pathMatch: 'full',
      },
      {
        path: 'external',
        canActivate: [NoAuthGuard],
        loadChildren: () =>
          import('./external/external.module').then((m) => m.ExternalModule),
      },
      {
        path: 'initial',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./initial/initial.module').then((m) => m.InitialModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}