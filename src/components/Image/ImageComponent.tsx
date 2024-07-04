import { forwardRef } from 'react';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import React from 'react';
import * as Chakra from '@chakra-ui/react';
import { cleanupCustomComponentProps, useActionHandlers, useHiddenByComponentRef, usePageStateValueByComponentRef } from '@libreforge/libreforge-framework';

const ImageComponent = forwardRef(
  (props: { componentId: string; _x_name: string; pageComponents: IComponents; type: any, overridenComponentPageState: any }, ref) => {

    const value = usePageStateValueByComponentRef(props._x_name, props.overridenComponentPageState);
    const hidden = useHiddenByComponentRef(props._x_name, props.overridenComponentPageState);
    
    const actionGroup = props.pageComponents[props.componentId].actionGroup;
    let propsElement = useActionHandlers({ ...props, ref, ...value, ...hidden }, actionGroup);    

    const elementProps = cleanupCustomComponentProps(propsElement)
    return React.createElement(Chakra['Image'], {
        ...elementProps,
        ref,
    });
});

export default ImageComponent;
