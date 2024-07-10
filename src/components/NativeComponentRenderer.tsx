import React from 'react';
import {forwardRef} from '@chakra-ui/react';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps, useActionHandlers, usePageStateValueByComponentRef, useSnackbar } from '@libreforge/libreforge-framework';
import { useNavigate } from "react-router-dom";

const NativeComponentRenderer = forwardRef(
  (props: { componentId: string; _x_name: string; pageComponents: IComponents; type: any, overridenComponentPageState: any }, ref) => {

    const router = useNavigate();
    const snackbar = useSnackbar();

    const value = usePageStateValueByComponentRef(props._x_name, props.overridenComponentPageState);    
    const actionGroup = props.pageComponents[props.componentId].actionGroup;
    let propsElement = useActionHandlers({ ...props, ref, ...value }, actionGroup, router, snackbar);    
    const { type } = props;

    const elementProps = cleanupCustomComponentProps(propsElement)
    return React.createElement(type, {
        ...elementProps,
        ref,
    });
  },
);

export default NativeComponentRenderer;
