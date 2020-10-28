import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, Inject } from "@angular/core";
import { Room } from "./room.interface";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  public rooms: Room[];
  public room: Room;
  public showForm = false;

  constructor(public http: HttpClient, @Inject("BASE_URL") public baseUrl: string) 
  {
    this.getRooms();
  }

  newRoom() { //initialize new room
    this.showForm = true;
    this.room = {
      id: -1,
      name: "",
      code: "",
    };
  }

  saveRoom() { // Save new room in database
    this.http
      .post<Room>(this.baseUrl + "api/rooms", {
        name: this.room.name,
        code: this.createRandomCode(),
      })
      .subscribe(
        (result) => {
          this.getRooms();
        },
        (error) => console.error(error)
      );
  }

  deleteRoom(room: Room) { // Remove room from database
    
    this.http.delete(this.baseUrl + "api/rooms/" + room.id).subscribe(
      (result) => {
        this.getRooms();
      },
      (error) => console.error(error)
    );
  }

  getRooms() { //Get all room from database
    this.http.get<Room[]>(this.baseUrl + "api/rooms").subscribe(
      (result) => {
        this.rooms = result;
        this.showForm = false;
      },
      (error) => console.error(error)
    );
  }

  createRandomCode()//Generates a hexadecimal code
  { 
    var code = (Math.random() * 0xffff * 1000000).toString(16);
    return code.slice(0,6);
  }
}
