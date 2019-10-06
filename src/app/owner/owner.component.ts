import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddPetModalComponent } from "./../add-pet-modal/add-pet-modal.component";
import { ApiEndPoint } from "./../constants/api";
@Component({
  selector: "app-owner",
  templateUrl: "./owner.component.html",
  styleUrls: ["./owner.component.scss"]
})
export class OwnerComponent implements OnInit {
  owners: any;
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
    this.http.get(`${this.api.endPoint}/owner`).subscribe(
      response => {
        this.owners = response;
      },
      err => {
        this.error = true;
      }
    );
  }

  viewAllPets() {
    this.router.navigateByUrl("/pets");
  }
  viewOwnerPet(id) {
    this.router.navigateByUrl("/owner/" + id);
  }

  createNewPet(id) {
    const modalRef = this.modalService.open(AddPetModalComponent, {
      size: "lg"
    });
    modalRef.componentInstance.id = id;
  }
}
