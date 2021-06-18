import { group } from '@angular/animations';
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

  constructor(private _formBuilder: FormBuilder,private apollo: Apollo,private router: Router) { }

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
        formDirective.resetForm();
        this.newGroupFormGroup.reset();
        console.log(res.newGroup);
      }
    },(error) => {
      if(error.networkError){
        console.log("Slow or no internet detected");
      }
      else if(error.graphQLErrors[0].status == 401){
        localStorage.removeItem('gop_app_token')
        this.router.navigateByUrl('/login');
      }
    });
    this.loading = false;
  }

}
