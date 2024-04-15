import Ezreal from '@/templates/Ezreal';
import { Template } from 'shared';

export const getTemplate = (template: Template) => {
  switch (template) {
    case 'Ezreal':
      return Ezreal;
    default:
      return Ezreal;
  }
};
