import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          MatNativeDateModule,
          MatSlideToggleModule,
          MatDatepickerModule,
          MatCheckboxModule, 
          MatIconModule, 
          MatDialogModule, 
          MatTreeModule,
          MatTooltipModule,
          MatProgressSpinnerModule,
          MatRadioModule,
          MatSelectModule,
          MatGridListModule,
          MatExpansionModule,
          MatCardModule,
          MatMenuModule,
          MatProgressBarModule,
          MatIconRegistry, 
          MatAutocompleteModule} from '@angular/material';
import 'hammerjs';

@NgModule({
  imports: [ 
    BrowserAnimationsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatSlideToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatTreeModule,
    MatTooltipModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule, 
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatAutocompleteModule,
  ],
  exports: [ 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatDialogModule,
    MatTreeModule,
    MatTooltipModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatAutocompleteModule,
  ]
})

export class AppMatModule {
  constructor(
    public matIconRegistry: MatIconRegistry ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fas');
  }
}