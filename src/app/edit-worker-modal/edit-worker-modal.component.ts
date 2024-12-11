import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-worker-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule,CommonModule,MatFormFieldModule ],
  templateUrl: './edit-worker-modal.component.html',
  styleUrl: './edit-worker-modal.component.css'
})
export class EditWorkerModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EditWorkerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public worker: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    this.dialogRef.close(this.worker); // Pass the updated worker back to the parent component
  }
}