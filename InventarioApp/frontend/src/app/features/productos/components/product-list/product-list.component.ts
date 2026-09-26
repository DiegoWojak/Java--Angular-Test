import { Component, computed, DestroyRef, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs';

import { Producto } from '../../models/producto.model';
import { ProductService } from '../../services/product.service';
import { FxService } from '../../../../shared/gl/fx.service';

import { hueDe, iconoDe, stockLabel, stockSeverity } from '../../utils/product-visual';

type Layout = 'grid' | 'list';
type Orden = 'nombre' | 'precioAsc' | 'precioDesc' | 'stockAsc';
type FiltroStock = 'todos' | 'disponibles' | 'agotados';
type ModoDrawer = 'detalle' | 'form';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  private readonly service = inject(ProductService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly messages = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fx = inject(FxService);
  private readonly countEl = viewChild<ElementRef<HTMLElement>>('countEl');

  readonly hueDe = hueDe;
  readonly iconoDe = iconoDe;
  readonly stockLabel = stockLabel;
  readonly stockSeverity = stockSeverity;

  readonly ordenOpciones: { label: string; value: Orden }[] = [
    { label: 'Nombre (A-Z)', value: 'nombre' },
    { label: 'Precio: menor a mayor', value: 'precioAsc' },
    { label: 'Precio: mayor a menor', value: 'precioDesc' },
    { label: 'Menor stock primero', value: 'stockAsc' }
  ];
  readonly stockOpciones: { label: string; value: FiltroStock }[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'En stock', value: 'disponibles' },
    { label: 'Agotados', value: 'agotados' }
  ];
  readonly layoutOpciones = [
    { icon: 'pi pi-th-large', label: 'Cuadrícula', value: 'grid' },
    { icon: 'pi pi-bars', label: 'Lista', value: 'list' }
  ];

  readonly busqueda = new FormControl('', { nonNullable: true });

  readonly productos = signal<Producto[]>([]);
  readonly loading = signal(false);
  readonly layout = signal<Layout>('grid');
  readonly orden = signal<Orden>('nombre');
  readonly filtroStock = signal<FiltroStock>('todos');
  readonly rangoPrecio = signal<[number, number]>([0, 0]);

  private rangoTocado = false;

  readonly precioMax = computed(() => {
    const max = Math.max(0, ...this.productos().map(p => p.precio));
    const paso = this.pasoPara(max);
    return Math.max(paso, Math.ceil(max / paso) * paso);
  });
  readonly precioPaso = computed(() => this.pasoPara(this.precioMax()));

  readonly visibles = computed(() => {
    const [min, max] = this.rangoPrecio();
    const stock = this.filtroStock();
    const lista = this.productos().filter(p =>
      p.precio >= min && p.precio <= max &&
      (stock === 'todos' || (stock === 'agotados' ? p.cantidad === 0 : p.cantidad > 0)));
    switch (this.orden()) {
      case 'precioAsc': return [...lista].sort((a, b) => a.precio - b.precio);
      case 'precioDesc': return [...lista].sort((a, b) => b.precio - a.precio);
      case 'stockAsc': return [...lista].sort((a, b) => a.cantidad - b.cantidad);
      default: return lista; // el backend ya devuelve ordenado por nombre
    }
  });

  readonly hayFiltros = computed(() =>
    this.filtroStock() !== 'todos' || this.rangoTocado && (this.rangoPrecio()[0] > 0 || this.rangoPrecio()[1] < this.precioMax()));

  drawerVisible = false;
  readonly modo = signal<ModoDrawer>('detalle');
  readonly seleccionado = signal<Producto | null>(null);
  readonly drawerTitulo = computed(() =>
    this.modo() === 'form' ? (this.seleccionado() ? 'Editar producto' : 'Nuevo producto') : this.seleccionado()?.nombre ?? '');

  ngOnInit(): void {
    this.busqueda.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.loading.set(true)),
        switchMap(nombre =>
          this.service.list({ nombre }).pipe(
            catchError(() => EMPTY),
            finalize(() => this.loading.set(false))
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(productos => {
        this.setProductos(productos);
        this.ripple();
      });

    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.service
      .list({ nombre: this.busqueda.value })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(productos => this.setProductos(productos));
  }

  onPrecio(rango: [number, number]): void {
    this.rangoTocado = true;
    this.rangoPrecio.set(rango);
  }

  onStock(valor: FiltroStock): void {
    if (valor) { this.filtroStock.set(valor); this.ripple(); }
  }

  onOrden(valor: Orden): void {
    this.orden.set(valor);
    this.ripple();
  }

  onLayout(valor: Layout): void {
    if (valor) { this.layout.set(valor); this.fx.pulse(); }
  }

  limpiarFiltros(): void {
    this.rangoTocado = false;
    this.rangoPrecio.set([0, this.precioMax()]);
    this.filtroStock.set('todos');
    this.busqueda.setValue('');
    this.ripple();
  }

  abrir(producto: Producto): void {
    this.seleccionado.set(producto);
    this.modo.set('detalle');
    this.drawerVisible = true;
  }

  nuevo(): void {
    this.seleccionado.set(null);
    this.modo.set('form');
    this.drawerVisible = true;
  }

  editar(producto: Producto): void {
    this.seleccionado.set(producto);
    this.modo.set('form');
    this.drawerVisible = true;
  }

  onGuardado(): void {
    this.drawerVisible = false;
    this.cargar();
  }

  onCancelarForm(): void {
    if (this.seleccionado()) {
      this.modo.set('detalle');
    } else {
      this.drawerVisible = false;
    }
  }

  confirmarEliminar(producto: Producto): void {
    this.confirmation.confirm({
      header: 'Eliminar producto',
      message: `¿Seguro que deseas eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () =>
        this.service.delete(producto.id).subscribe(() => {
          this.messages.add({ severity: 'success', summary: 'Producto eliminado', detail: producto.nombre });
          this.drawerVisible = false;
          this.cargar();
        })
    });
  }


  /* Util private methods */

  private setProductos(productos: Producto[]): void {
    this.productos.set(productos);
    if (!this.rangoTocado) {
      this.rangoPrecio.set([0, this.precioMax()]);
    }
  }

  pasoPara(max: number) {
    return max <= 500 ? 10 : max <= 5000 ? 50 : 100;
  }

  private ripple(): void {
    this.fx.pulse(this.countEl()?.nativeElement);
  }
}
