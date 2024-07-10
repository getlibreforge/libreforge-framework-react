import { Button } from '@chakra-ui/react';
import { iconsList } from '../../iconsList';
import { forwardRef } from 'react';
import { IComponents, IPages } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps, useActionHandlers, usePropsOverrideByComponentRef, useSnackbar } from '@libreforge/libreforge-framework';
import { useNavigate } from "react-router-dom";

const ButtonComponent = forwardRef((props: { componentId: string, pages: IPages, designMode: boolean, 
    pageComponents: IComponents, componentPage: string, collectionRefIdx: number | undefined }, ref) => {

  const router = useNavigate();
  const snackbar = useSnackbar();

  let targetProps: any = props;

  const actionGroup = props.pageComponents[props.componentId].actionGroup;
  targetProps = useActionHandlers(targetProps, actionGroup, router, snackbar);  
  targetProps = usePropsOverrideByComponentRef(props.componentId, targetProps, props.designMode);

  if (targetProps.leftIcon) {
    if (Object.keys(iconsList).includes(targetProps.leftIcon)) {
      const Icon = iconsList[targetProps.leftIcon as keyof typeof iconsList];
      targetProps.leftIcon = <Icon path="" />;
    } else {
      targetProps.leftIcon = undefined;
    }
  }

  if (targetProps.rightIcon) {
    if (Object.keys(iconsList).includes(targetProps.rightIcon)) {
      const Icon = iconsList[targetProps.rightIcon as keyof typeof iconsList];
      targetProps.rightIcon = <Icon path="" />;
    } else {
      targetProps.rightIcon = undefined;
    }
  }

  const elementProps = cleanupCustomComponentProps(targetProps)
  return <Button ref={ref} {...elementProps} />;
});

export default ButtonComponent;
