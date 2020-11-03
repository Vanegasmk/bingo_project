import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    
  }

   listOfNums() {
    let fd = new FormData();
    return this.httpClient.post<Int32List>(this.baseUrl + `api/Numeros`, fd);
  }


  getListOfNum() {
    let fd = new FormData();
  return this.httpClient.get<Int32List>(this.baseUrl + `api/Numeros`);
  }

  





}

