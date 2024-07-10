import React from 'react';
import {Button, Input, InputGroup, InputRightElement, forwardRef} from '@chakra-ui/react';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps, useActionHandlers, usePageStateValueByComponentRef, useSnackbar } from '@libreforge/libreforge-framework';
import { useNavigate } from "react-router-dom";

const PasswordInputComponent = forwardRef(
  (props: { componentId: string; _x_name: string; pageComponents: IComponents; type: any }, ref) => {

    const router = useNavigate();
    const snackbar = useSnackbar();

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const value = usePageStateValueByComponentRef(props._x_name);
    const actionGroup = props.pageComponents[props.componentId].actionGroup;
    let propsElement = useActionHandlers({ ...props, ref, ...value }, actionGroup, router, snackbar);    

    const elementProps = cleanupCustomComponentProps(propsElement);    

    return (
      <InputGroup>
        <Input
          {...elementProps}        
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          ref={ref}

        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }
);

export default PasswordInputComponent;
