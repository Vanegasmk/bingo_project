import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr"; // signalR Import
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  public showFormLogin = true;
  public showFormGame = false;
  public showFormAdmin = false;

  public hubConnection: HubConnection;
  public room: string;
  public totalCards: number;
  public userType: string;
  public userForm: FormGroup;
  public totalUsers : number = 0;

  constructor(private ActivatedRoute: ActivatedRoute, private _builder: FormBuilder) {
    this.userForm = this._builder.group({
      cards: ["", Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required])]
    });
    this.builConnection();

  }


  builConnection() {
    this.hubConnection = new HubConnectionBuilder().withUrl("/room").build();
    this.hubConnection.start().then(() => {
      this.getCodeRoom();
      this.hubConnection.invoke("AddToGroup", this.room);

    })
      .then(() => console.log("Bingo Hub Connection is start!"))
      .catch(() => console.log("Bingo Hub Connection not start"));


  }

  getCodeRoom() {
    this.ActivatedRoute.paramMap.subscribe(param => {
      this.room = param.get('code');

      if (this.userType == 'admin') {
        this.showFormLogin = false;
      }
    });
  }

  setNumberCards(values) {
    this.totalCards = values.cards;

    if (this.totalCards >= 1 && this.totalCards <= 3) {
      this.showFormLogin = false;
      this.showFormGame = true;
      this.totalUsers++;

    } else if (this.totalCards > 3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The maximum number of cartons is three!'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The minimum quantity of cartons must be one!'
      });
    }
  }




}
