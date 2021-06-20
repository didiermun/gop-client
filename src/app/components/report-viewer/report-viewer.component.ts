import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QueryRef,Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_REPORT =  gql`
  query report($id: ID!){
    report(id: $id){ 
      _id
      reporter{
        leader
      }
      budget{
        feeding
        distance
      }
      baseInfo{
        individuals
        Oindividuals
        family
        village
        distance
        location
        habituated
      }
      health{
        sick
        signs
      }
      interaction{
        reaction
        distance
        reaction
        observation
        behaviour
      }
      touristActivity{
        tourist
        period
        behaviour
      }
      timing{
        end
        start
        date
      }
    }
  }
`
@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnInit {

  reportQuery!: QueryRef<any>;
  private querySubscription!: Subscription;
  loading: boolean = true;
  report: any = {}
  constructor(private route: ActivatedRoute,private apollo: Apollo,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.reportQuery = this.apollo.watchQuery<any>({
          query: GET_REPORT,
          variables: {
            id: params['report_id'],
          },
          pollInterval: 500,
        });
        this.querySubscription = this.reportQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.report = data.report;
        this.loading = loading;
    },(error) => {
      if(error.networkError){
        // this.notifier.notify('error','Internet connection problems detected')
        console.log('network error detected');
      }
      else if(error.graphQLErrors[0].status == 401){
        localStorage.removeItem('gop_app_token')
        this.router.navigateByUrl('/login');
      }
    });
      }
    );
  }

}
