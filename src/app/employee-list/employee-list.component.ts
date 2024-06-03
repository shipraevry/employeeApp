// src/app/employee-list/employee-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [EmployeeService]
})
export class EmployeeListComponent {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }
}
