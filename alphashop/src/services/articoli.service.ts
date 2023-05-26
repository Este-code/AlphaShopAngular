import { IArticoli } from 'src/app/models/Articoli';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {

  server : string = "localhost";
  port : string = "5051";

  constructor(private httpClient : HttpClient) { }

  getArticoliByDesc = (descrizione : string) => {
    return this.httpClient.get<IArticoli[]>(`http://${this.server}:${this.port}/api/articoli/cerca/descrizione/${descrizione}`) // alt+96
    .pipe(
       map(response => {
          response.forEach(item => item.idStatoArt = this.getDesStatoArt(item.idStatoArt))
          return response;
       })
    )
  }

  getDesStatoArt = (idStato: string) : string => {
    if(idStato === '1')
      return 'Attivo'
    else if (idStato === '2')
      return 'Sospeso'
    else
      return 'Eliminato'
  }

  getArticoliByCode = (codart: string) => {
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/codice/${codart}`)
    .pipe(
      map(response => {
        response.idStatoArt = this.getDesStatoArt(response.idStatoArt)
        return response;
      })
    );
  }

  getArticoliByEan = (barcode: string) => {
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/barcode/${barcode}`)
    .pipe(
      map(response => {
        response.idStatoArt = this.getDesStatoArt(response.idStatoArt)
        return response;
      })
    );
  }

  delArticoloByCodArt = (codart: string) =>
    this.httpClient.delete(`http://${this.server}:${this.port}/api/articoli/elimina/${codart}`);


}
