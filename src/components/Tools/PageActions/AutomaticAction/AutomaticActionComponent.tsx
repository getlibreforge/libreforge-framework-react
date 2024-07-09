import { ReactElement, forwardRef, memo, useContext, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { VscGithubAction } from "react-icons/vsc";
import { IComponents, IPages } from '@libreforge/libreforge-framework-shared';
import { useNavigate } from 'react-router-dom';
import { ActionExecutionContext, InversifyContainerProviderContext, ProviderFactory, cleanupCustomComponentProps, getCurrentPageState, getSharedState, useActions, useDispatch, useSnackbar } from '@libreforge/libreforge-framework';

const AutomaticActionExecutorComponent = forwardRef((props: { componentId: string, 
  designMode: boolean, pageComponents: IComponents, pages: IPages,
  wrapperComponent?: ReactElement, wrapperContainer?: ReactElement }, ref) => {

  const component = props.pageComponents[props.componentId];
  const logId = `_action_executed_${props.componentId}`;
  const isJustOnce = component.props.isJustOnce;

  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();
  const router = useNavigate();
  const snackbar = useSnackbar();
  const currentPageState = useSelector(getCurrentPageState);
  const sharedState = useSelector(getSharedState);
  const container = useContext(InversifyContainerProviderContext);

  const actionGroup = props.pageComponents[props.componentId].actionGroup;
  const propBasedActions = useActions(actionGroup, props);

  useEffect(() => {
    let intervalId: any = undefined;

    if (true === props.designMode) {
      /* Do nothing */
      
    } else if (!!currentPageState[logId]) {
      console.warn(`Action AutomaticActionComponent [id = ${props.componentId}] already executed. Skipping...`)
  
    } else if (propBasedActions.length > 0) {
  
      /* Report execution log to prevent redundant execution */
      dispatch.app.changeCurrentPageState({ name: logId, value: 'true'});
  
      const action = propBasedActions[0].action;
      const args = propBasedActions[0].args;
  
      const actionExecutionContext: ActionExecutionContext = {
        componentId: props.componentId, args, pageComponents: props.pageComponents,
        currentPageState, sharedState, dispatch, snackbar, router, container, collectionRefIdx: undefined, prevExecutionState: undefined
      }
  
      const callback = () => {
        console.log('> Callback function called');

        action.execute(actionExecutionContext)
          .then(result => {
            if (false === result.next) {
              /* Action execution failed, hence unblock action */
              dispatch.app.changeCurrentPageState({ name: logId, value: undefined});
            }
          }).catch(error => {
            snackbar.error(error);
            dispatch.app.changeCurrentPageState({ name: logId, value: undefined});
          })
      }
  
      if (isJustOnce === true) {
        console.log('Just one time callback execution');
        callback();

      } else /* Scheduled */ {
        console.log('Interval-based callback execution');
        callback();

        const scheduledSeconds = parseInt(component.props.seconds);        
        intervalId = setInterval(() => { 
          callback(); 
        }, scheduledSeconds * 1000);        
      }
  
    } else {
      console.warn(`No action defined for AutomaticActionComponent [id = ${props.componentId}]`);
    }
    
    return () => {
      if (!!intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [counter, props.designMode])
  
  if (true === props.designMode) {
    const cleanedProps = cleanupCustomComponentProps({ ...props, ref });

    return (
      //@ts-ignore
      <Box {...cleanedProps}>
        <VscGithubAction size="28" />
      </Box>
    );
  } else {
    return <></>;    
  }
});

export default memo(AutomaticActionExecutorComponent);
