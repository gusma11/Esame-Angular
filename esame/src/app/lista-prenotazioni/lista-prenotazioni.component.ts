import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ListaPrenotazioniDataSource } from './lista-prenotazioni-datasource';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Device } from '../dto/device';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-prenotazioni',
  templateUrl: './lista-prenotazioni.component.html',
  styleUrl: './lista-prenotazioni.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe]
})
export class ListaPrenotazioniComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Device>;
  dataSource = new ListaPrenotazioniDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'confirmCode', 'category', 'startDate', 'hours', 'nominative', 'totalPrice'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
