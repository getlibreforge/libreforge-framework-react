import { Checkbox } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { IPages } from '@libreforge/libreforge-framework-shared';
import { cleanupCustomComponentProps, useCheckboxActions, usePageStateValueByComponentRef } from '@libreforge/libreforge-framework';

const CheckboxComponent = forwardRef((props: { componentId: string, _x_name: string, pages: IPages, componentPage: string }, ref) => {

  const propsWithOnChange = useCheckboxActions(props);  
  const propsWithCleanup = cleanupCustomComponentProps(propsWithOnChange);

  const checked = !!usePageStateValueByComponentRef(props._x_name).value;

  return (
    <Checkbox 
      {...propsWithCleanup} 
      isChecked={checked}
      ref={ref} 
      type='checkbox'/>
  );
});

export default CheckboxComponent;
