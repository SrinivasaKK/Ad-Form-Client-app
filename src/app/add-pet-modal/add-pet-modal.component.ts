import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { ApiEndPoint } from "./../constants/api";
import { Router } from "@angular/router";
@Component({
  selector: "app-add-pet-modal",
  templateUrl: "./add-pet-modal.component.html",
  styleUrls: ["./add-pet-modal.component.scss"]
})
export class AddPetModalComponent implements OnInit {
  @Input() id;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private api: ApiEndPoint,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      type: ["", Validators.required],
      breed: ["", [Validators.required]],
      color: ["", [Validators.required]],
      age: ["", [Validators.required, Validators.min(1), Validators.max(50)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  add() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value.id = this.id;
    this.registerForm.value.ownedBy = this.id.toString();
    this.registerForm.value.age = this.registerForm.value.age.toString();
    this.http
      .post(`${this.api.endPoint}/pets`, this.registerForm.value)
      .subscribe(
        response => {
          this.toastr.success("Successfully added new pet", "Wooff!", {
            timeOut: 3000
          });

          this.activeModal.close();
          this.router.navigateByUrl("/");
        },
        err => {
          this.activeModal.close();
        }
      );
  }
}
