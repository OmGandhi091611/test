import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
@Injectable({ providedIn: 'root'})
export class PersonsService{
  personChanged = new Subject<string[]>();
  persons: string[] = []
  constructor(private http: HttpClient){

  }
  fetchPersons(){
    this.http.get<any>('https://swapi.dev/api/people').pipe(map(resData => {
      return resData.results.map(character => character.name);
    }))
    .subscribe(tranformedData => {
      this.personChanged.next(tranformedData);
    });
  }
  addPerson(name: string){
    this.persons.push(name);
    this.personChanged.next(this.persons);
  }

  removePerson(name: string){
    this.persons = this.persons.filter(person => {
      return person !== name;
    })
    this.personChanged.next(this.persons);
  }
}
