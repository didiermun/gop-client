import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  newGroupFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newGroupFormGroup = this._formBuilder.group({
      groupLeader: ['', Validators.required],
      groupCode: ['', Validators.required],
      groupPassword: ['', Validators.required]
    });
  }

}
