import 'reflect-metadata';
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { PiTextAa } from "react-icons/pi";
import { StandardComponentProvider } from '@libreforge/libreforge-framework';
import NativeComponentRenderer from '../../NativeComponentRenderer';

@injectable()
export class TextProvider extends StandardComponentProvider {
  
  type = 'Text';

  getCategory(): ComponentCategory {
    return "basic";
  }

  getIcon() {
    return <PiTextAa />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, 
    forwardedProps: any, overridenComponentPageState: any, collectionRefIdx: number | undefined): ReactNode {

    return (
      <NativeComponentRenderer
        type={Chakra['Text']}
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        {...component.props} {...forwardedProps} componentId={component.id}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [
      { control: InspectorControlEnum.ChildrenControl, props: {} },
    ];
  }

  getDefaultProps() {
    return { children: 'Text value' };
  }

  isContainer() {
    return false;
  }
}
