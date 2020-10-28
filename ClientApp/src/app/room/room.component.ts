import { Component} from '@angular/core';
import { HubConnection, HubConnectionBuilder} from "@aspnet/signalr"; // signalR Import
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  public showForm = false;
  public hubConnection : HubConnection;
  public room : string;
  public loginToken : string = "Hola";

  constructor(private ActivatedRoute : ActivatedRoute) {
    this.builConnection();
   }

  
  builConnection() {
    this.hubConnection = new HubConnectionBuilder().withUrl("/room", { accessTokenFactory : () => this.loginToken  }).build();

    this.hubConnection.start().then(() => {
      this.getCodeRoom();
      this.hubConnection.invoke("AddToGroup",this.room);
      
    })
    .then(() => console.log("Bingo Hub Connection is start!"))
    .catch(() => console.log("Bingo Hub Connection not start"));

  }

  getCodeRoom()
  { 
    this.ActivatedRoute.paramMap.subscribe(param => {
      this.room = param.get('code');
      console.log(this.room);
    })
  }



}
