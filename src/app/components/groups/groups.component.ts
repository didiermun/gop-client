import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef,gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router'

const GET_GROUPS =  gql`
  query groups{
    groups{ 
      id
      code
      leader
      name
    }
  }
`

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(private apollo: Apollo,private router: Router) { }

  groups: any[] = [];
  groupsQuery!: QueryRef<any>;
  private querySubscription!: Subscription;
  page: number = 1;
  loading: boolean = true;
  ngOnInit(): void {
    this.groupsQuery = this.apollo.watchQuery<any>({
      query: GET_GROUPS,
      pollInterval: 500,
    });
    this.querySubscription = this.groupsQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.groups = [...this.groups,...data.groups];
        this.page++;
    },(error) => {
      if(error.graphQLErrors[0]?.status == 401){
        localStorage.removeItem('gop_app_token')
        this.router.navigateByUrl('/login');
      }
      console.log(Object.getOwnPropertyNames(error.networkError.error));
      if(error.networkError?.error){
      console.log(error.networkError.error);
    }
    });
  }

}
