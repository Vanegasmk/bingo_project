
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject } from '@angular/core';
import { Admin } from './login-interface';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public message = "";
  public admin: Admin = {
    id:0, 
    email:"", 
    password:""
  }; 
  
  public temp: Admin = {
    id:0, 
    email:"", 
    password:""
  }; 

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private location: Location) {}

  auth(){
    this.http.get<Admin>(this.baseUrl + 'api/admin/'+this.admin.email+"/"+this.admin.password).subscribe(result => {
      this.temp = result;
      if (this.temp.email != this.admin.email || this.temp.password == "Contrseña invalida") {
        this.message="Ha ocurrido un error, por favor revise sus datos";
      }else if(this.temp != null && this.temp.email ==this.admin.email && this.temp.password == this.admin.password){
        this.admin=this.temp;
        this.message="Log in realizado con exito";
        this.location.go("../dashboard");
        window.location.reload();
      }
    }, error => console.error(error));
  }
}

