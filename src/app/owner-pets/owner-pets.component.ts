import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { UpdateModalComponent } from "../update-modal/update-modal.component";
import { AddPetModalComponent } from "./../add-pet-modal/add-pet-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiEndPoint } from "./../constants/api";
@Component({
  selector: "app-owner-pets",
  templateUrl: "./owner-pets.component.html",
  styleUrls: ["./owner-pets.component.scss"]
})
export class OwnerPetsComponent implements OnInit {
  pets: any;
  error: boolean;
  id: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private api: ApiEndPoint
  ) {
    this.error = false;
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);
  }

  ngOnInit() {
    this.http.get(`${this.api.endPoint}/owner/${this.id}`).subscribe(
      response => {
        this.pets = response;
        if (this.pets.length > 0) {
          this.pets = response;
        } else {
          this.error = true;
        }
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

  createNewPet() {
    const modalRef = this.modalService.open(AddPetModalComponent, {
      size: "lg"
    });
    modalRef.componentInstance.id = this.id;
  }
  goBack() {
    this.router.navigateByUrl("/");
  }
}
