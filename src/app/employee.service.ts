// src/app/employee.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private localStorageKey = 'employees';

  constructor() { }

  getEmployees(): Observable<any[]> {
    const employees = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    return of(employees);
  }

  addEmployee(employee: any): Observable<any> {
    const employees = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    employees.push(employee);
    localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
    return of(employee);
  }
}
