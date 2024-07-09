import { Text } from '@chakra-ui/react';
import { cleanupCustomComponentProps, getCurrentPageState, getExpressionVariableNames, replaceVariable } from '@libreforge/libreforge-framework';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

const VariableTextComponent = forwardRef((props: { componentId: string, children: string, 
    overridenComponentPageState: any, designMode: boolean }, ref) => {
  
  let currentPageState = useSelector(getCurrentPageState);
  /* Override page state in case ${overridenComponentPageState} is provided.
   * This approach used in forEach component to narrow scope to iterating ${row}
   */
  if (!!props.overridenComponentPageState) {
    currentPageState = props.overridenComponentPageState;
  }    

  let targetText = undefined;

  if (true === props.designMode) {
    targetText = props.children;

  } else {
    const variables = getExpressionVariableNames(props.children);
    targetText = replaceVariable(props.children, variables, currentPageState);
  }

  const elementProps = cleanupCustomComponentProps(props);

  return (
    <Text ref={ref} {...elementProps}>
      {targetText}
    </Text>
  );
});

export default VariableTextComponent;
