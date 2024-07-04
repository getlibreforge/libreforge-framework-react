import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import FormSubmitButtonComponent from './FormSubmitButtonComponent';
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { MdOutlineSmartButton } from 'react-icons/md';
import { StandardComponentProvider } from '@libreforge/libreforge-framework';

@injectable()
export class FormSubmitButtonProvider extends StandardComponentProvider {

  type = 'SubmitButton';

  getCategory(): ComponentCategory {
    return "forms";
  }

  getIcon() {
    return <MdOutlineSmartButton />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {
    return (
      <FormSubmitButtonComponent
        componentId={component.id} 
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props} {...forwardedProps}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.ChildrenControl, props: {} },
      { control: InspectorControlEnum.SizeControl, props: { name: 'size', label: 'Size' } },
      { control: InspectorControlEnum.VariantsControl, props: { name: 'variant', label: 'Variant' } },
      { control: InspectorControlEnum.ColorsControl, props: { name: 'colorScheme', label: 'Color Scheme' } },
      { control: InspectorControlEnum.IconControl, props: { name: 'leftIcon', label: 'Left Icon' } },
      { control: InspectorControlEnum.IconControl, props: { name: 'rightIcon', label: 'Right Icon' }, },
      { control: InspectorControlEnum.TextControl, props: { name: '_x_url', label: 'URL' } },
      { control: InspectorControlEnum.TextControl, props: { name: '_x_method', label: 'Method' } },
      { control: InspectorControlEnum.ActionGroupControl, props: { name: 'actionGroup', label: 'Actions' } },
    ];
  }

  getDefaultProps() {
    return { children: 'Submit', variant: 'solid', size: 'md',
            _x_url: "/auth/login", _x_method: "POST" };
  }

  isContainer() {
    return false;
  }
}
