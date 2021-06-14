import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef,gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_ME =  gql`
  query me{
    me{ 
      group{
      id
      code
      name
      leader
    }
    }
  }
`

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  meQuery!: QueryRef<any>;
  group:any = {};
  date: Date = new Date();
  private querySubscription!: Subscription;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.meQuery = this.apollo.watchQuery<any>({
      query: GET_ME,
      pollInterval: 1000,
    });
    this.querySubscription = this.meQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        if(!loading){
          console.log(data.me.group);
          this.group = data.me.group;
      }
      },(error) => {
        console.log(error.graphQLErrors)
        console.log('error', `${error.message}`);
      });
  }

}
