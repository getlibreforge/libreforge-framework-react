import { Button } from '@chakra-ui/react';
import { iconsList } from '../../iconsList';
import { forwardRef } from 'react';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { ComponentUtils, cleanupCustomComponentProps, useActionHandlers, usePageStateValueByComponentRef } from '@libreforge/libreforge-framework';

const FormSubmitButtonComponent = forwardRef((props: { componentId: string, pageComponents: IComponents }, ref) => {

  /* Find Pagination component on page, which refers to current Button */
  const pagination = new ComponentUtils().findPaginationReferingSubmit(props.componentId, props.pageComponents);
  console.warn(`Pagination component - ${pagination?.id}`);

  const attributePage = `${pagination?.id}_page`;
  console.warn(`Attribute Page - ${attributePage}`);

  const size = pagination?.props.pageSize;
  const page = usePageStateValueByComponentRef(attributePage).value;
  
  console.warn(`Page - ${page}`);
  console.warn(`Size - ${size}`);

  console.warn(`Pagination component found, componentId - ${pagination?.id}, page - ${page}, size - ${size}`);

  const actionGroup = props.pageComponents[props.componentId].actionGroup;
  let targetProps = useActionHandlers(props, actionGroup, page, size);  

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

export default FormSubmitButtonComponent;
