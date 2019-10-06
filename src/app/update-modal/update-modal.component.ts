import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ApiEndPoint } from "./../constants/api";
@Component({
  selector: "app-update-modal",
  templateUrl: "./update-modal.component.html",
  styleUrls: ["./update-modal.component.scss"]
})
export class UpdateModalComponent implements OnInit {
  @Input() pet;

  registerForm: FormGroup;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private api: ApiEndPoint
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

  update() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm.value.ownedBy = this.pet.ownedBy;

    this.http
      .put(`${this.api.endPoint}/pets/${this.pet.id}`, this.registerForm.value)
      .subscribe(
        response => {
          this.activeModal.close();
        },
        err => {
          this.activeModal.close();
        }
      );
  }
}
