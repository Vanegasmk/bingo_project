import { Component, Inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr"; // signalR Import
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Cardboard } from './cardboard.interface.';
import Swal from 'sweetalert2';
import { NumberService } from '../Services/number.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  public showFormLogin = true;
  public showFormGame = false;//show div from cards
  public showFormAdmin = false;//show div from admin
  
  public number = 0; //nuevo numero
  public list = []; //lista numeros salidos

  public showFormUser = false;//show div from
  
  public hubConnection: HubConnection;//variable for connection with signalr
  public room: string;//variable to set room code
  public totalCards: number;//variable to set amount of player cards
  public userForm: FormGroup;//fromGroup object
  public usersOnline: number = 0;//variable to set usersOnline

  public cardboards = [];//Array of cards

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private _builder: FormBuilder,
    private numServices: NumberService,
    public http: HttpClient, @Inject('BASE_URL') public baseUrl: string
  ) {
    this.userForm = this._builder.group({
      cards: ["", Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required])]
    });
    this.showForms();
    this.builConnection();

    this.getList();
  }

  getList() {
    this.list = [];
    this.numServices.getListOfNum().subscribe(result => {
      result.forEach(element => {
        this.list.push(element);
      });
    });

  }


  obtain(){
    this.getNewNumber();
  }

  getNewNumber() {
    this.list = [];
    this.numServices.listOfNums().subscribe(result => {
      result.forEach(element => {
        this.list.push(element);
        this.sendMetadataNumber(element);
      });
    });  
    
  }



  builConnection() {//connection generated signalr
    this.hubConnection = new HubConnectionBuilder().withUrl("/room").build();

    this.hubConnection.on("SendCount", (msg) => {
      this.usersOnline = this.usersOnline + msg;
    });

    this.hubConnection.on("SendNumbers", (msg) => {
      this.list.push(msg);
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
      this.sendCount();
      this.generateTotalCarboards(values.cards);
      this.showFormGame = true;
      this.showFormLogin = false;
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

  sendCount() {//add a user when they enter the game
    this.hubConnection.invoke("SendCountToGroup", this.room, 1);
  }

  getCardboard(id: number) {
    var data = [];
    this.http.get<Cardboard>(this.baseUrl + 'api/cardboards/' + id).subscribe(result => {
       data.push(result);
    }, error => console.error(error));
    this.cardboards.push(data);
  }

  sendMetadataNumber(value){
    this.hubConnection.invoke("SendNumbersBingo",this.room,value);
  }
  
  generateTotalCarboards(totalcarboards: number) {
    for (let i = 0; i < totalcarboards; i++) {
      var id = Math.floor(Math.random() * (11 - 1) + 1);
      console.log(id);
      this.getCardboard(id);
    }
    console.log(this.cardboards[0]);
  }

  showForms()//
  { 
    if("admin" in localStorage)
    { 
      this.showFormLogin = false;
      this.showFormAdmin =  true;
      this.showFormUser = false;
    }else{
      this.showFormLogin = true;
      this.showFormUser = true;
      this.showFormAdmin = false;
    }
  }
  
}
