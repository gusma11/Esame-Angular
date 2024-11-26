import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Categoria } from '../dto/categoria';
import { GestioneDeviceService } from '../gestione-device.service';
import { Device } from '../dto/device';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-prenota-device',
  templateUrl: './prenota-device.component.html',
  styleUrls: ['./prenota-device.component.css'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatTableModule,
    MatDatepickerModule
  ]
})
export class PrenotaDeviceComponent implements OnInit {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    category: [null, Validators.required],
    hours: null,
    startDate: [null, Validators.required],
    nominative: [null, Validators.required],
    totalPrice: null
  });

  hasUnitNumber = false;
  items: Categoria[] = [];
  service: GestioneDeviceService = inject(GestioneDeviceService);

  constructor() { }

  ngOnInit(): void {
    this.service.getListaCategorie().subscribe(categorie => {
      this.items = categorie;
      console.log('Categorie caricate:', this.items);
    });

    this.addressForm.get('category')?.valueChanges.subscribe(() => this.calculateTotalPrice());
    this.addressForm.get('hours')?.valueChanges.subscribe(() => this.calculateTotalPrice());
  }

  calculateTotalPrice() {
    const category = this.addressForm.get('category')?.value;
    const hours = this.addressForm.get('hours')?.value;

    if (category && hours) {
      const selectedCategory = this.items.find(item => item.id === category);
      const categoryPrice = selectedCategory?.price;

      console.log(categoryPrice, hours);

      if (categoryPrice && hours > 0) {
        const totalPrice: any = categoryPrice * hours;
        this.addressForm.get('totalPrice')?.setValue(totalPrice);
      } else {
        this.addressForm.get('totalPrice')?.setValue(null);
      }
    } else {
      this.addressForm.get('totalPrice')?.setValue(null);
    }
  }

  prenota() {
    const idNumber: Number = this.addressForm.get('category')?.value ?? 0;
    const category: Categoria = this.items.find(b => b.id === idNumber) || { id: 0, name: '', price: 0 };

    const device: Device = {
      id: 0,
      confirmCode: '',
      category: category,
      startDate: this.addressForm.get('startDate')?.value ?? new Date(),
      nominative: this.addressForm.get('nominative')?.value ?? '',
      hours: this.addressForm.get('hours')?.value ?? 0
    };

    console.log(device);

    this.service.prenota(device);
    alert('Prenotazione confermata');
  }
}
