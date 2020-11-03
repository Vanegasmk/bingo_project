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

  public showFormLogin = true;//show div from login
  public showFormGame = false;//show div from cards
  public showFormAdmin = false;//show div from admin

  public hubConnection: HubConnection;//variable for connection with signalr
  public room: string;//variable to set room code
  public totalCards: number;//variable to set amount of player cards
  public userForm: FormGroup;//fromGroup object
  public usersOnline  : number = 0;//variable to set usersOnline

  constructor(private ActivatedRoute: ActivatedRoute, private _builder: FormBuilder) {
    this.userForm = this._builder.group({
      cards: ["", Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required])]
    });
    this.builConnection();
  }


  builConnection() {//connection generated signalr
    this.hubConnection = new HubConnectionBuilder().withUrl("/room").build();

    this.hubConnection.on("SendCount",(msg) => {
      this.usersOnline = this.usersOnline + msg;
    });
    
    this.hubConnection.start().then(() => {
      this.getCodeRoom();
      this.hubConnection.invoke("AddToGroup", this.room);
    })
      .then(() => console.log("Bingo Hub Connection is start!"))
      .catch(() => console.log("Bingo Hub Connection not start"));


  }

  getCodeRoom() {//function to get room code with ActivatedRoute
    this.ActivatedRoute.paramMap.subscribe(param => {
      this.room = param.get('code');
    });
  }

  setNumberCards(values) {//function to get the number of cards per user
    this.totalCards = values.cards;

    if (this.totalCards >= 1 && this.totalCards <= 3) {
      this.showFormLogin = false;
      this.showFormGame = true;
      this.sendCount();
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

  sendCount(){
    this.hubConnection.invoke("SendCountToGroup",this.room,1);
  }





}
