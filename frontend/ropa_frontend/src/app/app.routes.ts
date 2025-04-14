import { Routes } from '@angular/router';
import { ListComponent as ColeccionesList } from './colecciones/list/list.component';
import { CreateComponent as ColeccionesCreate } from './colecciones/create/create.component';
import { EditComponent as ColeccionesEdit } from './colecciones/edit/edit.component';
import { DeleteComponent as ColeccionesDelete } from './colecciones/delete/delete.component';
import { ListComponent as EstilosList } from './estilos/list/list.component';
import { CreateComponent as EstilosCreate } from './estilos/create/create.component';
import { EditComponent as EstilosEdit } from './estilos/edit/edit.component';
import { DeleteComponent as EstilosDelete } from './estilos/delete/delete.component';
import { ListComponent as TelasList } from './telas/list/list.component';
import { CreateComponent as TelasCreate } from './telas/create/create.component';
import { EditComponent as TelasEdit } from './telas/edit/edit.component';
import { DeleteComponent as TelasDelete } from './telas/delete/delete.component';
import { ListComponent as VentasList } from './ventas/list/list.component';
import { CreateComponent as VentasCreate } from './ventas/create/create.component';
import { EditComponent as VentasEdit } from './ventas/edit/edit.component';
import { DeleteComponent as VentasDelete } from './ventas/delete/delete.component';

export const routes: Routes = [
  {
    path: 'colecciones',
    children: [
      { path: '', component: ColeccionesList },
      { path: 'create', component: ColeccionesCreate },
      { path: 'edit/:id', component: ColeccionesEdit },
      { path: 'delete/:id', component: ColeccionesDelete }
    ]
  },
  {
    path: 'estilos',
    children: [
      { path: '', component: EstilosList },
      { path: 'create', component: EstilosCreate },
      { path: 'edit/:id', component: EstilosEdit },
      { path: 'delete/:id', component: EstilosDelete }
    ]
  },
  {
    path: 'telas',
    children: [
      { path: '', component: TelasList },
      { path: 'create', component: TelasCreate },
      { path: 'edit/:id', component: TelasEdit },
      { path: 'delete/:id', component: TelasDelete }
    ]
  },
  {
    path: 'ventas',
    children: [
      { path: '', component: VentasList },
      { path: 'create', component: VentasCreate },
      { path: 'edit/:id', component: VentasEdit },
      { path: 'delete/:id', component: VentasDelete }
    ]
  },
  { path: '', redirectTo: '/colecciones', pathMatch: 'full' },
  { path: '**', redirectTo: '/colecciones' }
];