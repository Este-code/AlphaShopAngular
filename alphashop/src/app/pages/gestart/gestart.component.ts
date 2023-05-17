import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ArticoliService } from 'src/services/data/articoli.service';
import { IArticoli } from 'src/app/models/Articoli';

@Component({
  selector: 'app-gestart',
  templateUrl: './gestart.component.html',
  styleUrls: ['./gestart.component.css']
})
export class GestartComponent implements OnInit {

  title : string = "Modifica Articoli";

  CodArt: string = '';
  articolo!: IArticoli;


  constructor(private route: ActivatedRoute, private articoliService: ArticoliService) { }

  ngOnInit(): void {

    this.CodArt =  this.route.snapshot.params['codart'];
    console.log("Selezionato articolo " + this.CodArt);

    this.articoliService.getArticoliByCode(this.CodArt).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });


  }

  handleResponse(response : any) {
    this.articolo = response;

    console.log(this.articolo);
  }

  handleError(error: any) {
    console.log(error);
  }

}
