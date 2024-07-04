import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { LiaRulerCombinedSolid } from "react-icons/lia";
import FormBusinessRuleMessage from './FormBusinessRuleMessage';
import { StandardComponentProvider } from '@libreforge/libreforge-framework';


@injectable()
export class FormBusinessRuleMessageProvider extends StandardComponentProvider {
  
  type = 'BusinessMsg';

  getCategory(): ComponentCategory {
    return "forms";
  }

  getIcon() {
    return <LiaRulerCombinedSolid />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <FormBusinessRuleMessage
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props} {...forwardedProps} componentId={component.id}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [];
  }

  getDefaultProps() {
    return { children: 'Business rule error here' };
  }

  isContainer() {
    return false;
  }
}
