import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'about',
            loadChildren: () =>
                import('../home-about/home-about.module').then(m => m.HomeAboutPageModule)
          },
          {
            path: 'imprint',
            loadChildren: () =>
                import('../home-imprint/home-imprint.module').then(m => m.HomeImprintPageModule)
          }

        ]
      },
      {
        path: 'dictionary',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../dictionary/dictionary.module').then(m => m.DictionaryPageModule)
          },
          {
            path: 'word/:wordId',
            loadChildren: () =>
                import('../dictionary-word/dictionary-word.module').then(m => m.DictionaryWordModule)
          }
        ]
      },
      {
        path: 'training',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../training/training.module').then(m => m.TrainingPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
