import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users.component";
import { EditUserFormComponent } from "./edit-user-form/edit-user-form.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [UsersComponent, EditUserFormComponent, ManageUsersComponent],
})
export class UsersModule {}
