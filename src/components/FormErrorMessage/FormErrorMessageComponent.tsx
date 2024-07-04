import { forwardRef } from 'react';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import React from 'react';
import * as Chakra from '@chakra-ui/react';
import { cleanupCustomComponentProps, useFormErrorMessage } from '@libreforge/libreforge-framework';

const FormErrorMessageComponent = forwardRef((props: { 
    componentId: string; pageComponents: IComponents; designMode: boolean }, ref) => {
  
  const propsElement = useFormErrorMessage(props.componentId, props.pageComponents, props.designMode, props);
  const elementProps = cleanupCustomComponentProps(propsElement)
  
  return React.createElement(Chakra['FormErrorMessage'], {
      ...elementProps,
      ref,
  });
});

export default FormErrorMessageComponent;
