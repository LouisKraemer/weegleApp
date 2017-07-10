import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortBy'
})

export class SortBy implements PipeTransform {
    transform(items: Array<any>) : Array<any> {
        if (items == null) {
            return null;
        } else {
            return items.sort(function (user1, user2) {
                if (user1.lastName.toLowerCase() < user2.lastName.toLowerCase()) {
                    return -1;
                } else if (user1.lastName.toLowerCase() > user2.lastName.toLowerCase()) {
                    return 1;
                }
                else {
                    if (user1.firstName.toLowerCase() < user2.firstName.toLowerCase()) {
                        return -1;
                    } else if (user1.firstName.toLowerCase() > user2.firstName.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            })
        }
    }
}
