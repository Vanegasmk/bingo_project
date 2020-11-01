import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr"; // signalR Import
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  public showForm = true;
  public hubConnection: HubConnection;
  public room: string;
  
  public user : string;
  public totalCards: number;
  userForm: FormGroup;

  constructor(private ActivatedRoute: ActivatedRoute,private _builder: FormBuilder) {
    this.userForm = this._builder.group({
      user:["",Validators.required],
      cards:["",Validators.compose([Validators.pattern("^[0-9]*$"),Validators.required])]
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
      console.log(this.room);
    })
  }

  setUser(values)
  {
    this.user = values.user;
    this.totalCards = values.cards;

    if(this.user.length > 1 && this.totalCards >= 1)
    { 
      console.log("se mamo");
    }
  }

 


}
