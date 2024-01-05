import { Observable, fromEvent, of, interval, zip } from 'rxjs';
import { take, map, zipAll, groupBy } from 'rxjs/operators';

//  **** Example 1 ****
// Basic use of an Observable and an Observer

// * 1. Create an Observable that emits many values : "Hello" and "Erika"

// const observable$ = of('Hello', 'Erika', 22);

// * 2. Create an Observer object

// const observer = {
//   next: (value: string | number) => console.log(`- ${value}`),
//   error: (error: any) => console.error(`There was an error: ${error}`),
//   complete: () => console.info('The observable has ended'),
// };

// * 3. Execute the Observable => You must subscribe to the Observable to execute it

// observable$.subscribe(observer);

//  **** Example 2 ****

// Creation of a function that returns a personalized Observable

export const myObservableOfStrings$ = (
  ...args: string[]
): Observable<string> => {
  return new Observable((observer) => {
    if (args.length > 10) {
      observer.error('There are too many arguments');
    }
    // We emit the values ​​of the arguments
    args.forEach((arg) => observer.next(arg));
    // We complete the Observer
    observer.complete();
  });
};

// **** Example 3 ****
// Emition of values from events that occur in the DOM (clicks, mouse movements, etc.). Using fromEvent of RxJS

//  1. Create an Observable with fromEvent

// export const observableFromEvent$ = fromEvent(document, 'click');

// 2. Create the observer of the Observable

// observableFromEvent$.subscribe({
//   next: (event: Event) => console.log(`There was a click: ${event.type}`),
//   error: (error: any) => console.error(`There was an error: ${error}`),
//   complete: () => console.info('The observable has ended'),
// });

// **** Example 4 ****

// Creation of an Observable with the interval function of RxJS and the use of the operator take of RxJS

//  1. Create an Observable with interval
const observableInterval$ = interval(2000);

// 2. Create the observer of the Observable

observableInterval$.pipe(take(3)).subscribe({
  next: (value: number) => console.log(`- ${value}`),
  error: (error: any) => console.error(`There was an error: ${error}`),
  complete: () => console.info('The observable has ended'),
});

// **** Example 5 ****
// Use of zip and map operators of RxJS

const timer$ = interval(1000);
const pieces$: Observable<string> = of('', '♞', '', '♞', '♘', '♞');
const columns$: Observable<string> = of('e', 'c', 'g', 'd', 'e', 'f');
const rows$: Observable<string> = of('4', '6', '4', '4', '2', '3');

// 1. Create an Observable with zip
const chessPieces$ = zip(timer$, pieces$, columns$, rows$);

// 2. Create the observer of the Observable

chessPieces$.subscribe({
  next: ([time, piece, column, row]: [number, string, string, string]) =>
    console.log(`- ${time} ${piece} ${column}${row}`),
  error: (error: any) => console.error(`There was an error: ${error}`),
  complete: () => console.info('The observable has ended'),
});
