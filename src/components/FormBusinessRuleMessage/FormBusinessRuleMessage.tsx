import { forwardRef } from 'react';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import * as Chakra from '@chakra-ui/react';
import React from 'react';
import { cleanupCustomComponentProps, useSharedError } from '@libreforge/libreforge-framework';

const FormBusinessRuleMessage = forwardRef((props: { componentId: string, pageComponents: IComponents, designMode: boolean }, ref) => {

  const propsMessage = useSharedError(props.designMode, { ...props, ref });
  const propsCleaned = cleanupCustomComponentProps(propsMessage)

  return React.createElement(Chakra['FormErrorMessage'], {
      ...propsCleaned,
      ref,
  });  
});

export default FormBusinessRuleMessage;
