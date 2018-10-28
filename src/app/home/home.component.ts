import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import * as Materialize from 'angular2-materialize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  entries: any[] = [];
  feeds;
  searchedForm: FormGroup;

  constructor(private dataService: DataService,
              private fb: FormBuilder) {

    this.searchedForm = this.fb.group({
      searchedField: ['']
    });
  }

  ngOnInit() {
  }

  searchTags() {
    if (this.searchedForm.getRawValue().searchedField !== '') {

      this.dataService.getFeeds(this.searchedForm.getRawValue().searchedField.trim()).subscribe(feeds => {
        this.entries.splice(0, this.entries.length);
        this.feeds = feeds;
        this.feeds.forEach(entry => {
          this.entries.push(entry);
        });
      });
    } else {
      Materialize.toast('Please Fill the tags', 6000);
    }
  }
}
