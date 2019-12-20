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
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'about',
            loadChildren: () => import('../home-about/home-about.module').then(m => m.HomeAboutPageModule)
          },
          {
            path: 'imprint',
            loadChildren: () => import('../home-imprint/home-imprint.module').then(m => m.HomeImprintPageModule)
          },
          {
            path: 'privacy',
            loadChildren: () => import('../home-privacy/home-privacy.module').then(m => m.HomePrivacyPageModule)
          }
        ]
      },
      {
        path: 'dictionary',
        children: [
          {
            path: '',
            loadChildren: () => import('../dictionary/dictionary.module').then(m => m.DictionaryPageModule)
          },
          {
            path: 'word/:wordId',
            loadChildren: () => import('../dictionary-word/dictionary-word.module').then(m => m.DictionaryWordModule)
          }
        ]
      },
      {
        path: 'training',
        children: [
          {
            path: '',
            loadChildren: () => import('../training/training.module').then(m => m.TrainingPageModule)
          }
        ]
      },
      {
        path: 'additional',
        children: [
          {
            path: '',
            loadChildren: () => import('../additional/additional.module').then( m => m.AdditionalPageModule)
          },
          {
            path: 'about',
            loadChildren: () => import('../additional-about/additional-about.module').then( m => m.AdditionalAboutPageModule)
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
