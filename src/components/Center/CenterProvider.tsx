import 'reflect-metadata';
import { ReactElement, ReactNode } from 'react';
import { injectable } from 'inversify';
import * as Chakra from '@chakra-ui/react';
import {ComponentCategory, IPages, InspectorControlEnum} from "@libreforge/libreforge-framework-shared"
import { IComponent, IComponents } from "@libreforge/libreforge-framework-shared"
import { PiAlignCenterHorizontalSimple } from 'react-icons/pi';
import { StandardComponentProvider } from '@libreforge/libreforge-framework';
import ContainerComponent from '@libreforge/libreforge-framework/dist/components/ContainerComponent';

@injectable()
export class CenterProvider extends StandardComponentProvider {
  
  type = 'Center';

  getCategory(): ComponentCategory {
    return "layout";
  }

  getIcon() {
    return <PiAlignCenterHorizontalSimple />
  }

  getName() {
    return this.type;
  }

  getComponent(component: IComponent, pageComponents: IComponents, pages: IPages, 
    designMode: boolean, designModeInteractivityDisabled: boolean, forwardedProps: any, 
    overridenComponentPageState: any, collectionRefIdx: number | undefined,
    wrapperComponent?: ReactElement, wrapperContainer?: ReactElement): ReactNode {

    return (
      <ContainerComponent type={Chakra['Center']} children={component.children}
        pageComponents={pageComponents} collectionRefIdx={collectionRefIdx}
        designMode={designMode} designModeInteractivityDisabled={designModeInteractivityDisabled}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
        {...component.props} {...forwardedProps} componentId={component.id}
      />
    );
  }

  getInspectorControls(): { control: InspectorControlEnum; props: any }[] {
    return [];
  }

  getDefaultProps() {
    return { pt: 5, pb: 5, backgroundColor: "blue.500"};
  }

  isContainer() {
    return true;
  }
}
