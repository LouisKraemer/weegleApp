import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(users: any[], filter: string) {
      var filterResult = [];
      for(var i in users) {
          if (filter == "noAnswer" && !users[i].answered) {
              filterResult.push(users[i]);
          } else if (filter == "coming" && users[i].answered && users[i].coming) {
              filterResult.push(users[i]);
          } else if (filter == "all") {
              return users;
          }
      }
      return filterResult;
  }
}
