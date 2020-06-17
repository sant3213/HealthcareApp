import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {DialogData} from '../../user/register-component/register-form.component';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-popup-type',
  templateUrl: './popup-type.component.html',
  styleUrls: ['./popup-type.component.css']
})
export class PopupTypeComponent implements OnInit {
  types: Type[] = [
    {value: '2', viewValue: 'Doctor'},
    {value: '3', viewValue: 'Paciente'}
  ];
  buttonDisabled= true;
  constructor(public dialogRef: MatDialogRef<PopupTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private route: ActivatedRoute, private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  save(type) {
    this.dialogRef.close(type);
}

close() {
    this.dialogRef.close();
}

onChange(event){
  this.buttonDisabled = false
}

}
