
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Admin } from './login.interfase';
import {AuthService} from 'src/app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public admin : Admin[];
  public email: string;
  public password: string;
  public isAdmin = false;


  constructor(private authService:AuthService) {

  }

  ngOnInit(): void {
  }

  Login() {





  }

}
