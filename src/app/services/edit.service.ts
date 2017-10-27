import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Jsonp } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
    constructor(private jsonp: Jsonp) {
        super([]);
    }

    private data: any[] = [];

    public read() {
        if (this.data.length) {
            return super.next(this.data);
        }

        this.fetch()
            .do(data => this.data = data)
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        this.reset();

        this.fetch(action, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public remove(data: any) {
        this.reset();

        this.fetch(REMOVE_ACTION, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        //find orignal data item
        const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);

        //revert changes
        Object.assign(originalDataItem, dataItem);

        super.next(this.data);
    }

    private reset() {
        this.data = [];
    }

    private fetch(action: string = "", data?: any): Observable<any[]>  {
        return this.jsonp
            .get(`https://demos.telerik.com/kendo-ui/service/Products/${action}?callback=JSONP_CALLBACK${this.serializeModels(data)}`)
            .map(response => response.json());
    }

    private serializeModels(data?: any): string {
       return data ? `&models=${JSON.stringify([data])}` : '';
    }
	
	
	
	//private searchUrl = 'http://ip.jsontest.com/?callback=SEARCH_RESULT';  // URL to web api
	private searchUrl = 'http://192.168.11.30:8079/TameeniApi/tam/CompQuotes/getTameeni?callback=JSONP_CALLBACK';  // URL to web api
	
	 public onSearch() : void {
		 console.log("inside onSearch() method");
		 
		 let promise = this.jsonp
		 .get(this.searchUrl)
		 .map((response: any) =>
                    response.json()
                )
		 .subscribe(
              () => console.log('get actual visits complete')
         );
 /*        return promise;
		
		
	        return this.jsonp
            .request(this.searchUrl, { method: 'Get' })
            .map(response => response.json()); 
 */			
			/* 		
			return this.http.get(this.searchUrl)
             .toPromise()
             .then(response => response.json().data as Hero[])
			 .catch(this.handleError); 
			 */
			
	}
	 
	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}

}
