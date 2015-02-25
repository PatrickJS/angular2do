import {assert} from "rtts_assert/rtts_assert";
import {int} from 'angular2/src/facade/lang';
import {reflector} from 'angular2/src/reflection/reflection';
import {getIntParameter,
  bindAction} from 'angular2/src/test_lib/benchmark_util';
import {bootstrap,
  Component,
  Viewport,
  Template,
  ViewContainer,
  Compiler} from 'angular2/angular2';
import {PromiseWrapper} from 'angular2/src/facade/async';
import {ListWrapper,
  MapWrapper} from 'angular2/src/facade/collection';
import {Company,
  Opportunity,
  Offering,
  Account,
  CustomDate,
  STATUS_LIST} from './common';
import {Foreach} from 'angular2/directives';
export class HasStyle {
  constructor() {
    this.style = MapWrapper.create();
  }
  set width(w) {
    MapWrapper.set(this.style, 'width', w);
  }
}
export class CompanyNameComponent extends HasStyle {}
export class OpportunityNameComponent extends HasStyle {}
export class OfferingNameComponent extends HasStyle {}
export class Stage {}
export class StageButtonsComponent extends HasStyle {
  get offering() {
    return assert.returnType((this._offering), Offering);
  }
  set offering(offering) {
    assert.argumentTypes(offering, Offering);
    this._offering = offering;
    this._computeStageButtons();
  }
  setStage(stage) {
    assert.argumentTypes(stage, Stage);
    this._offering.status = stage.name;
    this._computeStageButtons();
  }
  _computeStageButtons() {
    var disabled = true;
    this.stages = ListWrapper.clone(STATUS_LIST.map((status) => {
      var isCurrent = this._offering.status == status;
      var stage = new Stage();
      stage.name = status;
      stage.isDisabled = disabled;
      var stageStyle = MapWrapper.create();
      MapWrapper.set(stageStyle, 'background-color', disabled ? '#DDD' : isCurrent ? '#DDF' : '#FDD');
      stage.style = stageStyle;
      if (isCurrent) {
        disabled = false;
      }
      return stage;
    }));
  }
}
Object.defineProperty(Object.getOwnPropertyDescriptor(StageButtonsComponent.prototype, "offering").set, "parameters", {get: function() {
    return [[Offering]];
  }});
Object.defineProperty(StageButtonsComponent.prototype.setStage, "parameters", {get: function() {
    return [[Stage]];
  }});
export class AccountCellComponent extends HasStyle {}
export class FormattedCellComponent extends HasStyle {
  set value(value) {
    if (value instanceof CustomDate) {
      this.formattedValue = `${value.month}/${value.day}/${value.year}`;
    } else {
      this.formattedValue = value.toString();
    }
  }
}
export function setupReflectorForCells() {
  reflector.registerType(CompanyNameComponent, {
    'factory': () => new CompanyNameComponent(),
    'parameters': [],
    'annotations': [new Component({
      selector: 'company-name',
      bind: {
        'width': 'cell-width',
        'company': 'company'
      }
    }), new Template({
      directives: [],
      inline: `<div [style]="style">{{company.name}}</div>`
    })]
  });
  reflector.registerType(OpportunityNameComponent, {
    'factory': () => new OpportunityNameComponent(),
    'parameters': [],
    'annotations': [new Component({
      selector: 'opportunity-name',
      bind: {
        'width': 'cell-width',
        'opportunity': 'opportunity'
      }
    }), new Template({
      directives: [],
      inline: `<div [style]="style">{{opportunity.name}}</div>`
    })]
  });
  reflector.registerType(OfferingNameComponent, {
    'factory': () => new OfferingNameComponent(),
    'parameters': [],
    'annotations': [new Component({
      selector: 'offering-name',
      bind: {
        'width': 'cell-width',
        'offering': 'offering'
      }
    }), new Template({
      directives: [],
      inline: `<div [style]="style">{{offering.name}}</div>`
    })]
  });
  reflector.registerType(StageButtonsComponent, {
    'factory': () => new StageButtonsComponent(),
    'parameters': [],
    'annotations': [new Component({
      selector: 'stage-buttons',
      bind: {
        'width': 'cell-width',
        'offering': 'offering'
      }
    }), new Template({
      directives: [Foreach],
      inline: `
            <div [style]="style">
                <button template="foreach #stage in stages"
                        [disabled]="stage.isDisabled"
                        [style]="stage.style"
                        on-click="setStage(stage)">
                  {{stage.name}}
                </button>
            </div>`
    })]
  });
  reflector.registerType(AccountCellComponent, {
    'factory': () => new AccountCellComponent(),
    'parameters': [],
    'annotations': [new Component({
      selector: 'account-cell',
      bind: {
        'width': 'cell-width',
        'account': 'account'
      }
    }), new Template({
      directives: [],
      inline: `
            <div [style]="style">
              <a href="/account/{{account.accountId}}">
                {{account.accountId}}
              </a>
            </div>`
    })]
  });
  reflector.registerType(FormattedCellComponent, {
    'factory': () => new FormattedCellComponent(),
    'parameters': [],
    'annotations': [new Component({
      selector: 'formatted-cell',
      bind: {
        'width': 'cell-width',
        'value': 'value'
      }
    }), new Template({
      directives: [],
      inline: `<div [style]="style">{{formattedValue}}</div>`
    })]
  });
}

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/benchmarks/src/naive_infinite_scroll/cells.map

//# sourceMappingURL=./cells.map