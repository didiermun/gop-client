import { Component, OnInit } from '@angular/core';
import { Apollo,gql } from 'apollo-angular';
import { Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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

  hide: boolean = false;

  constructor(private apollo: Apollo,private router: Router,private _formBuilder: FormBuilder) { }

  submit(){
    this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        data: this.loginFormGroup.value
      }
    }).subscribe(({ data }) => {
      let res: any = data;
      console.log(res);
      if(res.login.success){
        // this.notifier.notify('success', 'Login successful');
        localStorage.setItem("token",res.login.token)
        this.router.navigateByUrl("/");
      }
      else{
        // this.notifier.notify('error','Code not found');
      }
    },(error) => {
      console.log(error);
      // this.notifier.notify('error', `${error.message}`);
    });
  }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
