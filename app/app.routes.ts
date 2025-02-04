import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { ShowSpaceDetailComponent } from './Pages/show-space-detail/show-space-detail.component';
import { ViewAllQlikAppsComponent } from './Components/view-all-qlik-apps/view-all-qlik-apps.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'space-detail/:id', component: ShowSpaceDetailComponent },
  { path: 'view-all-apps', component: ViewAllQlikAppsComponent },
];
