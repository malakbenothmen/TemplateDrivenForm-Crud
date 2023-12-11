import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

public addEmployee(employee: Employee): Observable<Employee> {
  return this.http.post<Employee>(this.apiUrl, employee);
}

public updateEmployee(employee: Employee): Observable<Employee> {
  const url = `${this.apiUrl}/${employee.id}`; // L'URL spécifique pour l'employé à mettre à jour
  return this.http.put<Employee>(url, employee);
}
public deleteEmployee(id: number): Observable<Employee> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.delete<Employee>(url);
}
  }

