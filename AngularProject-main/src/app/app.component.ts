import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpDetailDialogComponent } from './emp-detail-dialog/emp-detail-dialog.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { nextTick } from 'process';
import { error } from 'console';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  displayedColumns: string[] = [
    'id',
    'Employee_Name',
    'Email',
    'Phone_no',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog, 
    private _empService:EmployeeService,
    private _coreService:CoreService
  ){}

  opendetaildialogform(){
    const DialogRef= this._dialog.open(EmpDetailDialogComponent);
    DialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    });
  }

  ngOnInit(): void {
      this.getEmployeeList();
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort
        this.dataSource.paginator=this.paginator;
      },
      error:console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar('Employee deleted successfully','done');
        this.getEmployeeList();
      },
      error:console.log,
    });
  }

  openEditForm(data:any){
    const DialogRef= this._dialog.open(EmpDetailDialogComponent, {
      data,
    });

    DialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    });
  }
}
