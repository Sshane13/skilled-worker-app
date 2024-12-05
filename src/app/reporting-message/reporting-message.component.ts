import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-reporting-message',
  standalone: true,
  imports: [ReactiveFormsModule  ],
  templateUrl: './reporting-message.component.html',
  styleUrl: './reporting-message.component.css'
})
export class ReportingMessageComponent implements OnInit {
  reportForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form with necessary fields and validation
    this.reportForm = this.fb.group({
      reportedPerson: ['', Validators.required],
      reason: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Function to handle form submission
  onSubmit(): void {
    if (this.reportForm.valid) {
      console.log('Report Submitted:', this.reportForm.value);
      // Here you can add the logic to send this data to a service or API
    } else {
      console.log('Form is invalid');
    }
  }
}
