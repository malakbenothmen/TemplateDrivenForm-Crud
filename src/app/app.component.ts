import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CrudEmployee_V.1';

  employees = new Array<Employee>();
  newEmployee: Employee = new Employee(0, '', '');

  selectedEmployee: Employee | null = null;

constructor(private  empService:EmployeeService ) {

   empService.getEmployees().subscribe(response =>
  {
    this.employees = response.map(item =>
   {
    return new Employee(item.id, item.name, item.status );
});
});
 }

 onSubmit(): void {
  if (this.selectedEmployee) {
    // Si un employé est sélectionné, c'est une confirmation d'édition
    this.selectedEmployee.name = this.newEmployee.name;
    this.selectedEmployee.status = this.newEmployee.status;

    // Appelez le service pour mettre à jour l'employé dans la base de données
    this.empService.updateEmployee(this.selectedEmployee).subscribe(response => {
      console.log('Employee updated successfully', response);
    });
    // Réinitialisez le formulaire et l'employé sélectionné
    this.newEmployee = new Employee(0, '', '');
    this.selectedEmployee = null;
  } else {
    // Sinon, c'est une addition d'un nouvel employé
    const newEmployee = new Employee(0, this.newEmployee.name, this.newEmployee.status);
    this.employees.push(newEmployee);

    // Appelez le service pour ajouter l'employé à la base de données
    this.empService.addEmployee(newEmployee).subscribe(response => {
      console.log('Employee added successfully', response);
    });

    // Réinitialisez le formulaire
    this.newEmployee = new Employee(0, '', '');
  }
}



editEmployee(employee: Employee): void {
  // Affectez la valeur de selectedEmployee pour mettre à jour le formulaire
  this.selectedEmployee = employee;
  this.newEmployee = { ...employee }; // Utilisez une copie pour éviter de modifier directement l'objet d'origine
}
cancelEdit(): void {
  // Réinitialisez le formulaire et lemployé sélectionné
  this.newEmployee = new Employee(0, '', '');
  this.selectedEmployee = null;
}

deleteEmployee(id: number): void {
  // Appelez le service pour supprimer l'employé de la base de données
  this.empService.deleteEmployee(id).subscribe(response => {
    console.log('Employee deleted successfully', response);

    // Mettez à jour la liste des employés après la suppression
    this.employees = this.employees.filter(emp => emp.id !== id);
  });
}

}


