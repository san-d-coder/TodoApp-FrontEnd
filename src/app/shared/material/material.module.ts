import { NgModule } from '@angular/core';
import { 
  MatButtonModule,  
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
  MatDividerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatBottomSheetModule,       
} from '@angular/material'

import {DragDropModule} from '@angular/cdk/drag-drop'

const Material = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
  MatDividerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatCheckboxModule,
  DragDropModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatBottomSheetModule
]

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
