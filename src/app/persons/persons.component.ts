import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonsService } from './persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit, OnDestroy {
  personList!: string[];
  private personListSubs!: Subscription;
  isFetching = false;
  constructor(private prsService: PersonsService) {
    // this.personList = prsService.persons;
  }
  ngOnInit() {
    this.personListSubs = this.prsService.personChanged.subscribe(persons => {
      this.isFetching = false
      this.personList = persons;
    });
    this.isFetching = true
    this.prsService.fetchPersons();
  }
  onRemovePerson(personName: string){
    this.prsService.removePerson(personName);
  }
  ngOnDestroy() {
    this.personListSubs.unsubscribe();
  }
}
