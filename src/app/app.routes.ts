import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'stall-applications',
    loadComponent: () =>
      import('./pages/stall-applications/stall-applications.page').then(
        (m) => m.StallApplicationsPage,
      ),
  },
  {
    path: 'stall-applications/:id',
    loadComponent: () =>
      import('./pages/stall-application-detail/stall-application-detail.page').then(
        (m) => m.StallApplicationDetailPage,
      ),
  },
  {
    path: 'hawker-permits',
    loadComponent: () =>
      import('./pages/hawker-permits/hawker-permits.page').then((m) => m.HawkerPermitsPage),
  },
  {
    path: 'hawker-permits/:id',
    loadComponent: () =>
      import('./pages/hawker-permit-detail/hawker-permit-detail.page').then(
        (m) => m.HawkerPermitDetailPage,
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
