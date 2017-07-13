import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(users: any[], search: string) {
      var searchResult = [];
      for(var i in users) {
          if ((users[i].lastName.toLowerCase() + ' ' + users[i].firstName.toLowerCase()).indexOf(search.toLocaleLowerCase()) != -1 || (users[i].firstName.toLowerCase() + ' ' + users[i].lastName.toLowerCase()).indexOf(search.toLocaleLowerCase()) != -1) {
              searchResult.push(users[i]);
          }
      }
      return searchResult;
  }
}
