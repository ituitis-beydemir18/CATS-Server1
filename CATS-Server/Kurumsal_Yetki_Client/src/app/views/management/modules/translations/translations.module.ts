import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { TranslationsComponent } from "./translations.component";
import { ManageTranslationsComponent } from "./manage-translations/manage-translations.component";
import { EditTranslationDialogComponent } from "./edit-translation-dialog/edit-translation-dialog.component";
import { ManageLanguagesDialogComponent } from "./manage-languages-dialog/manage-languages-dialog.component";
import { EditLanguageFormComponent } from './edit-language-form/edit-language-form.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        TranslationsComponent,
        ManageTranslationsComponent,
        ManageLanguagesDialogComponent,
        EditTranslationDialogComponent,
        EditLanguageFormComponent,
    ]
})
export class TranslationsModule {}
