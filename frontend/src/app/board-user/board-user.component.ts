import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  linkControl: any;
  links: any;
  selectedLink: any;
  accountControl: any;
  accounts: any;
  selectedAccount: any;
  showGenerateReportBtn: boolean = false;
  owners: any;
  incomes: any;
  loading = false;

  view: [number, number] = [700, 400];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Types';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = '';
  legendTitle: string = 'Year Income';
  showOwners: boolean = false
  showIncomeReport: boolean = false


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true
    this.userService.getLinks().subscribe(
      data => {
        this.links = data;
        this.loading = false
      },
      err => {
        this.loading = false

      }
    );
    this.linkControl = new FormControl(null, Validators.required);
    this.accountControl = new FormControl(null, Validators.required);
  }

  updateAccountSelect(event: any): void {
    this.loading = true
    this.showOwners = false
    this.showIncomeReport = false
    let link = this.selectedLink
    console.log(link.id)
    this.userService.getAccounts(link=link.id).subscribe(
      data => {
        this.accounts = data;
        this.loading = false

      },
      err => {
        this.loading = false

      }
    );
    link = this.selectedLink
    console.log(link.id)
    this.userService.getOwners(link=link.id).subscribe(
      data => {
        this.owners = data;
        this.showOwners = true

      },
      err => {
      }
    );
  }
  enableGenerateReport(event: any): void {
    this.loading = true
    this.showIncomeReport = false
    this.showGenerateReportBtn = false;
    let link = this.selectedLink
    let account = this.selectedAccount
    this.userService.getIncomeReport(link=link.id, account.id).subscribe(
      data => {
        if ("currency" in data){
          this.yAxisLabel = data.currency
          this.incomes = data.chart;
          this.showGenerateReportBtn = true;

        }
        this.loading = false
        this.showIncomeReport = true
      },
      err => {
        this.loading = false
      }
    );
    
  }
}
