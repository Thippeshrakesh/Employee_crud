import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
  styleUrl: './emp-detail-dialog.component.css'
})
export class EmpDetailDialogComponent implements OnInit {

    empForm:FormGroup;

    constructor(
      private _fb:FormBuilder, 
      private _empService:EmployeeService , 
      private _dialogRef:MatDialogRef<EmpDetailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any,
      private _coreservice:CoreService
    ) 
      {
      this.empForm=this._fb.group({
        Employee_Name:'',
        Email:'',
        Phone_no:''
      })
    }

    ngOnInit(): void {
        this.empForm.patchValue(this.data)
    }

    onFormSubmit(){
      if(this.empForm.valid){
        if(this.data){
          this._empService.UpdateEmployee(this.data.id,this.empForm.value).subscribe({
            next:(val:any)=>{
              
              this._coreservice.openSnackBar('Employee Updated successfully','done');
              this._dialogRef.close(true);
            },
            error:(err:any)=>{
              console.error(err);
            },
           });

        }else{
          this._empService.addEmployee(this.empForm.value).subscribe({
            next:(val:any)=>{

              this._coreservice.openSnackBar('Employee Updated successfully','done');
              this._dialogRef.close(true);
            },
            error:(err:any)=>{
              console.error(err);
            },
           });
        }
        
      }
    }
}
