import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnection, HubConnectionBuilder} from "@aspnet/signalr"; // signalR Import
import { PublicChat } from "./chat.interface";
import { ClientRequest } from "http";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent {

  public showForm = false;
  public message: string = "";
  public messages: string[] = [];
  public hubConnection : HubConnection;
  public user : PublicChat;
  public loginToken : string = "Kevin";
  
  constructor() {
    this.builConnection();
  }

  builConnection() {
    this.hubConnection = new HubConnectionBuilder().withUrl("/room", { accessTokenFactory : () => this.loginToken  }).build();

    this.hubConnection.on("SendMessage", (msg) => {
      this.messages.push(msg);
    })

    this.hubConnection.start()
    .then(() => console.log("Bingo Hub Connection is start!"))
    .catch(() => console.log("Bingo Hub Connection not start"));

  }


 


  sendMessage() {
    this.hubConnection.invoke("Echo",this.message)
  }
}
