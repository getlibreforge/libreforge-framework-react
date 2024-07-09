import { useParams } from "react-router-dom";
import { IPages } from "@libreforge/libreforge-framework-shared";
import { ReactElement, useContext, useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AuthorizationManager, InversifyContainerProviderContext, SYMBOL_AUTHORIZATION_MANAGER, getSharedState, useDispatch } from "@libreforge/libreforge-framework";
import ChildComponentRenderer from "@libreforge/libreforge-framework/dist/components/ChildComponentRenderer";

const PAGE_NAME_NOT_FOUND = "not_found";

type ApplicationPageProps = {
  overridePageName?: string;
  pages: IPages;
  designMode: boolean;
  wrapperComponent?: ReactElement;
  wrapperContainer?: ReactElement;
}

const ApplicationPage: React.FC<ApplicationPageProps> = ({ overridePageName, pages, designMode, wrapperComponent, wrapperContainer }) => {

  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  const [authCount, setAuthCount] = useState<Number>(0);
  const [redirectTo, setRedirectTo] = useState<string | undefined>(undefined);
  const container = useContext(InversifyContainerProviderContext);
  const sharedState = useSelector(getSharedState);
  const router = useNavigate();
  const authorizationManager = container.get<AuthorizationManager>(SYMBOL_AUTHORIZATION_MANAGER);

  const { pageName } = useParams()
  const targetPageName = !!overridePageName ? overridePageName: (pageName || PAGE_NAME_NOT_FOUND);
  const pageComponents = pages[targetPageName];

  useEffect(() => {
    if (!!redirectTo) {
      router(redirectTo);
    }
  }, [redirectTo]);

  useEffect(() => {
    if (true !== designMode) {
      authorizationManager.authorize(window.location.href, window.location.pathname, sharedState, container, dispatch)
        .then(fallbackUrl => {
          if (fallbackUrl !== redirectTo) {
            setRedirectTo(fallbackUrl);
          }
        })
        .catch(error => {
          console.error(error);        
        })
        .finally(() => {
          setPageLoaded(true);    
        }); 
    } else {
      setPageLoaded(true);
    }
  }, [authCount, pageName]);

  const rootChildren = !!pageComponents ? pageComponents.root.children: []

  if (true === pageLoaded) {
    return rootChildren.map((name: string) => (
      <ChildComponentRenderer key={name} overridenComponentPageState={undefined} collectionRefIdx={undefined}
        designMode={designMode} designModeInteractivityDisabled={false}
        componentName={name} pageComponents={pageComponents} pages={pages}
        wrapperComponent={wrapperComponent} wrapperContainer={wrapperContainer}
      />
    ));
  } else {
    return <></>;
  }
};

export default ApplicationPage;
