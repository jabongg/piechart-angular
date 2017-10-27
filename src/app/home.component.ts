import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { sampleProducts  } from './products';
import { Product } from './model';
import { EditService } from './services/edit.service';
import { process, State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Rx';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    private editService: EditService;
    private editedRowIndex: number;
    private editedProduct: Product;

    constructor(@Inject(EditService) editServiceFactory: any) {
        this.editService = editServiceFactory;
    }

    public ngOnInit(): void {
        this.view = this.editService.map(data => process(data, this.gridState));

        this.editService.read();
    }
      public onStateChange(state: State) {
        this.gridState = state;

        this.editService.read();
    }

    protected addHandler({sender}) {
        this.closeEditor(sender);

        sender.addRow(new Product());
    }

    protected editHandler({sender, rowIndex, dataItem}) {
        this.closeEditor(sender);

        this.editedRowIndex = rowIndex;
        this.editedProduct = Object.assign({}, dataItem);

        sender.editRow(rowIndex);
    }

    protected cancelHandler({sender, rowIndex}) {
        this.closeEditor(sender, rowIndex);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editService.resetItem(this.editedProduct);
        this.editedRowIndex = undefined;
        this.editedProduct = undefined;
    }

    protected saveHandler({sender, rowIndex, dataItem, isNew}) {
        this.editService.save(dataItem, isNew);

        sender.closeRow(rowIndex);

        this.editedRowIndex = undefined;
        this.editedProduct = undefined;
    }

    protected removeHandler({dataItem}) {
        this.editService.remove(dataItem);
    }
  title = 'Kendo app';
dialogOpen = false;
 //private gridData: any[] = products;
 private state: State = {
        skip: 0,
        take: 5,
        
        // Initial filter descriptor
        filter: {
          logic: "and",
          filters: [{ field: "ProductName", operator: "contains", value: "Chef" }]
        }
    };

    private gridData: GridDataResult = process(sampleProducts, this.state);

    protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(sampleProducts, this.state);
    }
onButtonClick() {
        this.title = 'Hello from Kendo UI!';
        this.dialogOpen = true;
    }
       dialogClosed() {
    this.dialogOpen = false;
    this.title = "Nice Job!";
  }

  
  onSearch(){
	this.editService.onSearch();
  }
}

