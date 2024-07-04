import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { RxDividerHorizontal } from "react-icons/rx";
import { StandardComponentProvider } from '@libreforge/libreforge-framework';
import NativeComponentRenderer from '@libreforge/libreforge-framework/dist/components/NativeComponentRenderer';

@injectable()
export class DividerProvider extends StandardComponentProvider {
  
  type = 'Divider';

  getCategory(): ComponentCategory {
    return "basic";
  }

  getIcon() {
    return <RxDividerHorizontal />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, forwardedProps: any, 
    overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {
    return (
      <NativeComponentRenderer
        type={Chakra['Divider']} pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props} {...forwardedProps} componentId={component.id}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      {
        control: InspectorControlEnum.OrientationControl,
        props: { name: 'orientation', label: 'Orientation' },
      },
      {
        control: InspectorControlEnum.ColorsControl,
        props: { name: 'borderColor', label: 'Border Color' },
      },
    ];
  }

  getDefaultProps() {
    return { borderColor: 'blackAlpha.500' };
  }

  isContainer() {
    return false;
  }
}
