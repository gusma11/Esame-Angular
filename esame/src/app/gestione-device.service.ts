import { Injectable } from '@angular/core';
import { Categoria } from './dto/categoria';
import { Device } from './dto/device';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestioneDeviceService {

  private listaPrenotazioni: Device[] = [];

  private listCategorie: Categoria[] = [];

  constructor(private httpClient: HttpClient) {
  }

  prenota(item: Device) {

    let totalPriceCalculated = item.category.price * item.hours;

    let content = {
      category: item.category,
      startDate: item.startDate,
      nominative: item.nominative,
      hours: item.hours,
      totalPrice: totalPriceCalculated
    };


    this.httpClient.post('http://localhost:8080/device',
      content
    ).subscribe(res => {
      console.log(res);
    })

  }

  getCategoria() {
    return this.listCategorie;
  }

  getListaPrenotazioni() {
    this.httpClient.get<Device[]>('http://localhost:8080/device/list')
      .subscribe(res => {
        this.listaPrenotazioni = res;
      })
    return this.listaPrenotazioni;
  }

  getListaCategorie(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>('http://localhost:8080/category/list')
      .pipe(
        tap(res => {
          this.listCategorie = res;
        })
      );
  }

}