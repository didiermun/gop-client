import { Component, OnInit } from '@angular/core';
import { Apollo,gql } from 'apollo-angular';
import { Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


const LOGIN = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      token
      success
    }
  }
`;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  error: string = "";
  loading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  hide: boolean = false;

  constructor(private apollo: Apollo,private router: Router,private _snackBar: MatSnackBar,private _formBuilder: FormBuilder) { }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['bg-blue-400','text-white','shadow-xl'],
      duration: 3500,
    });
  }

  submit(){
    this.loading = true;
    this.error = "";
    this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        data: this.loginFormGroup.value
      }
    }).subscribe(({ data }) => {
      let res: any = data;
      if(res.login.success){
        this.openSnackBar("Login successful!");
        localStorage.setItem("gop_app_token",res.login.token)
        this.router.navigateByUrl("/reports");
      }
    },(error) => {
      console.log(error);
      if(error.networkError){
        this.error = "Slow or no internet detected";
        this.openSnackBar("Slow or no internet detected");
      }
      else if(error.graphQLErrors[0]){
        this.error = error.graphQLErrors[0].message;
        this.openSnackBar(error.graphQLErrors[0].message);
      }
      
      // this.notifier.notify('error', `${error.}`);
    });
    this.loading = false;
  }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
