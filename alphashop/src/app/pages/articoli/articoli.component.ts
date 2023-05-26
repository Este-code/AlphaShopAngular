import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ArticoliService } from 'src/services/data/articoli.service';
import { IArticoli } from 'src/app/models/Articoli';
import { ArticoliGrid } from 'src/app/models/interface';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent{

/*
  errore : string = "";
  pagina : number = 1;
  righe : number = 10;

  filter$: Observable<string | null> = of("");
  filter: string | null = "";

  filterType: number = 0;
*/
  public columnDefs: ColDef[] = [
    {field : 'codArt'},
    {field : 'descrizione'},
    {field : 'um'},
    {field : 'codStat'},
    {field : 'pzCart'},
    {field : 'pesoNetto'},
    {field : 'dataCreazione'}
  ];
 // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  public gridOptions: GridOptions<any[]> = {
    colResizeDefault: 'shift'
  }

  public paginationPageSize = 10;
  public articoli$!: Observable<any[]>;
  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  //constructor(private articoliService: ArticoliService, private route: ActivatedRoute,private http: HttpClient) { }
  constructor(private http: HttpClient) { }

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit()
    params.api.setDomLayout('autoHeight')

    this.articoli$ = this.http
    .get<ArticoliGrid[]>('http://localhost:5051/api/articoli/tutti');
  }



/*
  ngOnInit(): void {

    this.filter$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('filter')),
    );

    this.filter$.subscribe(param => (this.filter = param));

    if (this.filter) {
      this.getArticoli(this.filter);
    }

  }

  refresh = () => {
    if (this.filter) {
      this.getArticoli(this.filter);
    }
  }


  getArticoli = (filter : string) => {

    this.articoli$ = [];

    if (this.filterType === 0) {
      this.articoliService.getArticoliByCode(filter).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    }
    else if (this.filterType === 1)
    {
      this.articoliService.getArticoliByDesc(filter).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    }
    else if (this.filterType === 2)
    {
      this.articoliService.getArticoliByEan(filter).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    }
  }

  handleResponse(response : any) {

    if (this.filterType === 0 || this.filterType === 2)
    {
      let newArray : IArticoli[] = [...this.articoli$, response];
      this.articoli$ = newArray;
    }
    else
    {
      this.articoli$ = response;
    }

    this.filterType = 0;
  }

  handleError(error: any) {

    if (this.filter && this.filterType === 0) {
      this.filterType = 1;
      this.getArticoli(this.filter);
    }
    else if (this.filter && this.filterType === 1) {
      this.filterType = 2;
      this.getArticoli(this.filter);
    }
    else {
      console.log(error);
      this.errore = error.error.message;
      this.filterType = 0;
    }

  }

  Elimina = (CodArt: string) => {
    console.log(`Eliminazione articolo ${CodArt}`);

    this.articoliService.delArticoloByCodArt(CodArt).subscribe(
      response => {
        console.log(response);

        this.articoli$ = this.articoli$.filter(item => item.codArt !== CodArt);
      }
    )
  }
*/
}

