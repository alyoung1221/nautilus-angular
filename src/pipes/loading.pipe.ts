/*import { Pipe, PipeTransform } from "@angular/core";
import { isObservable, of } from "rxjs";
import { map, startWith, catchError } from "rxjs/operators";

@Pipe({
  name: "loading",
})
export class LoadingPipe implements PipeTransform {
  transform(val) {
    return isObservable(val)
      ? val.pipe(
        map((value: any) => ({ loading: false, value })),
        startWith({ loading: true }),
        catchError(error => of({ loading: false, error }))
      )
      : val;
  }
}*/

import { Pipe, PipeTransform } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, startWith } from "rxjs/operators";

export interface asyncResult<T> {
    loading?: boolean;
    value?: T;
    error?: string;
}

const defaultError = "An error occurred when retrieving the results.";

@Pipe({
    name: "loading",
})
export class LoadingPipe implements PipeTransform {
    transform<T = any>(val: Observable<T>): Observable<asyncResult<T>> {
        return val.pipe(
            map((value: any) => {
                return {
                    loading: value.type === "start",
                    error: value.type === "error" ? defaultError : "",
                    value: value.type ? value.value : value,
                };
            }),
            startWith({ loading: true })
        );
    }
}