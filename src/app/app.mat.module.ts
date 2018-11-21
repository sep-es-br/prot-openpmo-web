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
          MatProgressSpinnerModule,
          MatRadioModule,
          MatSelectModule,
          MatGridListModule,
          MatExpansionModule,
          MatCardModule,
          MatMenuModule,
          MatProgressBarModule,
          MatIconRegistry } from '@angular/material';
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
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule, 
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressBarModule,
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
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressBarModule,
  ]
})

export class AppMatModule {
  constructor(
    public matIconRegistry: MatIconRegistry ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fas');
  }
}