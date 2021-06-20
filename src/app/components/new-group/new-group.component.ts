import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo,gql } from 'apollo-angular';

const CREATE_GROUP = gql`
  mutation newGroup($data: NewGroup!) {
    newGroup(data: $data) {
      id
      leader
      name
    }
  }
`;

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  newGroupFormGroup!: FormGroup;
  loading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _formBuilder: FormBuilder,private _snackBar: MatSnackBar,private apollo: Apollo,private router: Router) { }

  ngOnInit(): void {
    this.newGroupFormGroup = this._formBuilder.group({
      leader: ['', Validators.required],
      code: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(formDirective: FormGroupDirective){
    this.loading = true;
    console.log(this.newGroupFormGroup.value);
    this.newGroupFormGroup.value.name = this.newGroupFormGroup.value.leader+ "'s group"
    this.apollo.mutate({
      mutation: CREATE_GROUP,
      variables: {
        data: this.newGroupFormGroup.value
      }
    }).subscribe(({ data }) => {
      let res: any = data;
      if(res.newGroup){
        this.openSnackBar("Report added successfully");
        formDirective.resetForm();
        this.newGroupFormGroup.reset();
      }
    },(error) => {
      if(error.networkError){
        this.openSnackBar("Slow or no internet detected");
      }
      else if(error.graphQLErrors[0].status == 401){
        localStorage.removeItem('gop_app_token')
        this.router.navigateByUrl('/login');
      }
    });
    this.loading = false;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['bg-blue-400','text-white','shadow-xl'],
    });
  }

}
