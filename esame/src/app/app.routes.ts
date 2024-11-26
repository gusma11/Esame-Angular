import { Routes } from '@angular/router';
import { PrenotaDeviceComponent } from './prenota-device/prenota-device.component';
import { ListaPrenotazioniComponent } from './lista-prenotazioni/lista-prenotazioni.component';

export const routes: Routes = [
    { path: '', pathMatch: "full", redirectTo: 'device' },
    { path: 'device', component: PrenotaDeviceComponent },
    { path: 'lista-prenotazioni', component: ListaPrenotazioniComponent }
];
