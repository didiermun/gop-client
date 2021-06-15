import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef,gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router'

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
  constructor(private apollo: Apollo,private router: Router) { }

  ngOnInit(): void {
    this.meQuery = this.apollo.watchQuery<any>({
      query: GET_ME,
      pollInterval: 1000,
    });
    this.querySubscription = this.meQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        if(!loading){
          this.group = data.me.group;
      }
      },(error) => {
        if(error.graphQLErrors[0].status == 401){
          localStorage.removeItem('gop_app_token')
          this.router.navigateByUrl('/login');
        }
        console.log(error.graphQLErrors)
        console.log('error', `${error.message}`);
      });
  }

}
