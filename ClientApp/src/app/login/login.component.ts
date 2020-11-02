
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Admin } from './login-interface';
import {AuthService} from 'src/app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

  loginUser() {

  }

}
