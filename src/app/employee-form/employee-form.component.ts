import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule
  ],
  providers: [EmployeeService]
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      fullTime: [false]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.employeeForm.valid) {
      const newEmployee = this.employeeForm.value;
      this.employeeService.getEmployees().subscribe(
        employees => {
          if (employees.some(emp => emp.email === newEmployee.email)) {
            this.errorMessage = 'Email already exists.';
          } else if (employees.some(emp => emp.phone === newEmployee.phone)) {
            this.errorMessage = 'Phone number already exists.';
          } else {
            this.employeeService.addEmployee(newEmployee).subscribe(
              response => {
                console.log('Employee added successfully', response);
                this.successMessage = 'Employee added successfully!';
                this.employeeForm.reset();
              },
              error => {
                console.error('Error adding employee', error);
              }
            );
          }
        },
        error => {
          console.error('Error fetching employees', error);
        }
      );
    }
  }
}
