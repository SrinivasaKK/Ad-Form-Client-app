import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { OwnerComponent } from "./owner/owner.component";
import { PetComponent } from "./pet/pet.component";
import { UpdateModalComponent } from "./update-modal/update-modal.component";
import { OwnerPetsComponent } from "./owner-pets/owner-pets.component";
import { AddPetModalComponent } from "./add-pet-modal/add-pet-modal.component";
import { ApiEndPoint } from "./constants/api";
import { ToastrService } from "ngx-toastr";
@NgModule({
  declarations: [
    AppComponent,
    OwnerComponent,
    PetComponent,
    UpdateModalComponent,
    OwnerPetsComponent,
    AddPetModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      preventDuplicates: true
    })
  ],
  providers: [HttpClient, ApiEndPoint, ToastrService],
  entryComponents: [UpdateModalComponent, AddPetModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
