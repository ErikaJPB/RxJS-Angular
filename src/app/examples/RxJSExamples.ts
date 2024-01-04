import { Observable, of } from 'rxjs';

//  **** Example 1 ****
// Basic use of an Observable and an Observer

// * 1. Create an Observable that emits many values : "Hello" and "Erika"

const observable = of('Hello', 'Erika', 22);

// * 2. Create an Observer object

const observer = {
  next: (value: string | number) => console.log(`- ${value}`),
  error: (error: any) => console.error(`There was an error: ${error}`),
  complete: () => console.info('The observable has ended'),
};

// * 3. Execute the Observable => You must subscribe to the Observable to execute it

observable.subscribe(observer);

//  **** Example 2 ****

// Creation of a function that returns a personalized Observable

export const myObservableOfStrings = (
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
