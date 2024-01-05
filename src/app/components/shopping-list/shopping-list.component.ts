import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { myObservableOfStrings$ } from 'src/app/examples/RxJSExamples';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Product } from 'src/app/types/product.type';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: Product[] = [];
  subscription: Subscription = new Subscription();
  subject$: Subject<string> = new Subject();
  behaviorSubject$: BehaviorSubject<string> = new BehaviorSubject('Hello'); // The BehaviorSubject needs an initial value

  constructor(private shoppingService: ShoppingService) {}
  /**
   * next => the functionality that receives the Observable
   * error => an optional functionality that receives the notifications of errors that the Observable can emit
   * complete => an optional functionality that receives a notification when the Observable is completed
   */
  ngOnInit(): void {
    // This is okay but it's not the optimal way to subscribe to an Observable

    // this.subscription = this.shoppingService
    //   .getAllProducts()
    //   .subscribe((list: Product[]) => {
    //     this.shoppingList = list;
    //   });
    // (error: any) =>
    //   console.error(`There was an error getting the list: ${error.message}`);
    // (() => console.info('The list was successfully retrieved'));

    // The optimal way is to specify the next, error and complete callbacks in a explicit way

    this.subscription = this.shoppingService.getAllProducts().subscribe({
      next: (list: Product[]) => {
        this.shoppingList = list;
        console.table(this.shoppingList);
      },
      error: (error: any) =>
        console.error(`There was an error getting the list: ${error.message}`),
      complete: () => console.info('The list was successfully retrieved'),
    });

    // Example of a reception of different values

    //  * Execution of the observable => with the subscription

    this.subscription.add(
      this.shoppingService.getUserData().subscribe({
        next: (value: string | number) => {
          console.log(` - ${value}`);
        },
        error: (error: any) => {
          console.error(`There was an error: ${error.message}`);
        },
        complete: () => {
          console.info('The observable was completed');
        },
      })
    );

    // Example of the use of a personalized Observable
    myObservableOfStrings$('Hi', 'Erika', 'how are you', 'fine').subscribe({
      next: (value: string) => {
        console.log(` - ${value}`);
      },
      error: (error: any) => {
        console.error(`There was an error: ${error}`);
      },
      complete: () => {
        console.info('The observable was completed');
      },
    });

    // Example of the use of an Observable that emits values ​​from events that occur in the DOM (clicks, mouse movements, etc.). Using fromEvent of RxJS

    this.shoppingService.getClicks().subscribe({
      next: (event: Event) => {
        console.log(`There was a click: ${event.target}`);
      },
      error: (error: any) => {
        console.error(`There was an error: ${error}`);
      },
      complete: () => {
        console.info('The observable was completed');
      },
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription when the component is destroyed
    this.subscription.unsubscribe();
  }
}
