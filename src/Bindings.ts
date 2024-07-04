import { Container } from 'inversify';
import { ButtonProvider } from './components/Button/ButtonProvider';
import { CloseButtonProvider } from './components/CloseButton/CloseButtonProvider';
import { ContainerProvider } from './components/Container/ContainerProvider';
import { CenterProvider } from './components/Center/CenterProvider';
import { GridProvider } from './components/Grid/GridProvider';
import { LinkProvider } from './components/Link/LinkProvider';
import { LoaderProvider } from './components/Loader';
import { CheckboxProvider } from './components/Checkbox/CheckboxProvider';
import { TextareaProvider } from './components/Textarea/TextareaProvider';
import { InputProvider } from './components/Input/InputProvider';
import { DividerProvider } from './components/Divider/DividerProvider';
import { SelectProvider } from './components/Select/SelectProvider';
import { AddressFormProvider } from './composite/AddressForm/AddressFormProvider';
import { ImageProvider, WizardStepProvider, WizardStepperProvider } from './components';
import { FormProvider } from './components/Form';
import { FormControlProvider } from './components/FormControl';
import { FormLabelProvider } from './components/FormLabel';
import { FormErrorMessageProvider } from './components/FormErrorMessage';
import { StackProvider } from './components/Stack';
import { HeadingProvider } from './components/Heading';
import { FormSubmitButtonProvider } from './components/FormSubmitButton';
import { FormBusinessRuleMessageProvider } from './components/FormBusinessRuleMessage';
import { ComponentPaginationProvider, ComponentRefProvider } from './components/Tools';
import { PasswordInputProvider } from './components/PasswordInput';
import { LocalDateProvider } from './components/LocalDate';
import { VariableTextProvider, TextProvider } from './components/Label';
import { ComponentForEachProvider } from './components/Tools/ComponentForEach';
import { OnPageLoadActionProvider, ResourceLoadPageActionProvider } from './components/Tools/PageActions';
import { BusinessRulesProvider } from './components/Tools/BusinessRules';
import { ComponentProvider, SYMBOL_COMPONENT_PROVIDER } from '@libreforge/libreforge-framework';


export function bindProviders(container: Container) {

  /* Standard Components */
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(GridProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ContainerProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(StackProvider);

  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ButtonProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(CloseButtonProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(CenterProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ImageProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(TextProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(VariableTextProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(LinkProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(LoaderProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(CheckboxProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(TextareaProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(HeadingProvider);  
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(InputProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(PasswordInputProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(DividerProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(SelectProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(LocalDateProvider);

  /* Tools */
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ComponentRefProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ComponentForEachProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ComponentPaginationProvider);

  /* Page Actions */
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(ResourceLoadPageActionProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(OnPageLoadActionProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(BusinessRulesProvider);

  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormControlProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormLabelProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormErrorMessageProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormBusinessRuleMessageProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(FormSubmitButtonProvider);

  /* Wizard */
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(WizardStepperProvider);
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(WizardStepProvider);

  /* Composite Components */
  container.bind<ComponentProvider>(SYMBOL_COMPONENT_PROVIDER).to(AddressFormProvider);
}
