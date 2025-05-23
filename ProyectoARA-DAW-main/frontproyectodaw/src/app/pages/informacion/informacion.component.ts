import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { GeneralDescriptionComponent } from '../general-description/general-description.component';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';
import { PrivacyPoliciesComponent } from '../privacy-policies/privacy-policies.component';

@Component({
  selector: 'app-informacion',
  imports:[
    MatCardModule,
    MatTabGroup,
    MatTabsModule,
    MatIconModule,
    GeneralDescriptionComponent,
    TermsConditionsComponent,
    PrivacyPoliciesComponent
  ],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent {

}
