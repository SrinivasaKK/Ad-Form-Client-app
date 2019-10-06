import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UpdateModalComponent } from "./../update-modal/update-modal.component";
import { ApiEndPoint } from "./../constants/api";
@Component({
  selector: "app-pet",
  templateUrl: "./pet.component.html",
  styleUrls: ["./pet.component.scss"]
})
export class PetComponent implements OnInit {
  pets: any;
  error: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private api: ApiEndPoint
  ) {
    this.error = false;
  }

  ngOnInit() {
    this.http.get(`${this.api.endPoint}/pets`).subscribe(
      response => {
        this.pets = response;
      },
      err => {
        this.error = true;
      }
    );
  }
  editPet(pet) {
    const modalRef = this.modalService.open(UpdateModalComponent, {
      size: "lg"
    });
    modalRef.componentInstance.pet = pet;
  }

  goBack() {
    this.router.navigateByUrl("/");
  }
}
