import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { StatusEnum } from "../../models/enums/status.enum";
import { DeliveryInterface } from "../../models/interfaces/delivery.interface";
import { DeliveryService } from "../../services/delivery.service";
import { GridHeaderComponent } from "../../components/grid-header/grid-header.component";
import { GridContentComponent } from "../../components/grid-content/grid-content.component";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "../../components/footer/footer.component";
import { take } from "rxjs";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.page.html',
  styleUrls: ['./pagination.page.scss'],
  imports: [
    IonicModule,
    GridHeaderComponent,
    GridContentComponent,
    FormsModule,
    FooterComponent
  ],
  standalone: true
})
export class PaginationPage implements OnInit, OnChanges {

  //#region Dependency Injection

  private readonly deliveryService: DeliveryService = inject(DeliveryService);

  //#endregion

  //#region Decorators Properties

  @Input()
  public data: DeliveryInterface[] = [];

  //#endregion

  //#region Public Properties

  public filteredList: DeliveryInterface[] = [];

  public paginatedList: DeliveryInterface[] = [];

  public page: number = 1;

  public itemsPerPage: number = 10;

  public selectedDriver: string = '';

  public selectedStatus: string = '';

  public selectedDistrict: string = '';

  public selectedOrigin: string = '';

  public statusEnum: typeof StatusEnum = StatusEnum;

  public driversList: string[] = [];

  public districtList: string[] = [];

  public originList: string[] = [];

  public isLoading: boolean = false;

  //#endregion

  //#region Life Cycle Events

  public ngOnInit(): void {
    this.isLoading = true;

    this.data = this.deliveryService.getCurrentDelivery();

    if (this.data.length) {
      this.setFiltersValues();
      this.applyFilters();
      return;
    }

    this.deliveryService.fetchDelivery().pipe(take(1)).subscribe({
      next: data => {
        this.data = data;

        this.setFiltersValues();
        this.applyFilters();
      },
      error: error => console.error(error),
      complete: () => this.isLoading = false,
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.setFiltersValues();
      this.applyFilters();
    }
  }

  //#endregion

  //#region Public Methods

  public applyFilters(): void {
    this.filteredList = this.data.filter(item =>
      (!this.selectedStatus || item.status_entrega === this.selectedStatus) &&
      (!this.selectedDriver || item.motorista.nome === this.selectedDriver) &&
      (!this.selectedDistrict || item.cliente_destino.bairro === this.selectedDistrict) &&
      (!this.selectedOrigin || item.cliente_origem.bairro === this.selectedOrigin)
    );
    this.page = 1;
    this.paginate();
  }

  public cleanFilters(): void {
    this.selectedDriver = '';
    this.selectedStatus = '';
    this.selectedDistrict = '';
    this.selectedOrigin = '';
    this.applyFilters();
  }

  public handlePageChange(newPage: number): void {
    this.page = newPage;
    this.paginate();
  }

  //#endregion

  //#region Private Methods

  private setFiltersValues(): void {
    this.driversList = [...new Set(this.data.map(d => d.motorista.nome))];
    this.originList = [...new Set(this.data.map(u => u.cliente_origem.bairro))];
    this.districtList = [...new Set(this.data.map(u => u.cliente_destino.bairro))];
  }

  private paginate(): void {
    const start = (this.page - 1) * this.itemsPerPage;
    this.paginatedList = this.filteredList.slice(start, start + this.itemsPerPage);
  }

  //#endregion

}
