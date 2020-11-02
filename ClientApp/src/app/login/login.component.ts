import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Admin } from './login.interfase'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public admin : Admin[];


  constructor() {

  }

  ngOnInit(): void {
  }

  Login() {



  }

}
