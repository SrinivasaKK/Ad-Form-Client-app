import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OwnerComponent } from "./owner/owner.component";
import { PetComponent } from "./pet/pet.component";
import { OwnerPetsComponent } from "./owner-pets/owner-pets.component";
const routes: Routes = [
  {
    path: "",
    component: OwnerComponent
  },
  {
    path: "owner",
    component: OwnerComponent
  },
  {
    path: "pets",
    component: PetComponent
  },
  {
    path: "owner/:id",
    component: OwnerPetsComponent
  },
  {
    path: "**",
    redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
