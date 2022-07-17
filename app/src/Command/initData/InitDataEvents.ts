import { Event } from '@Entity/Event/Event';

export const initDataEvents = [
  {
    code: Event.USER_FORGOT_PASSWORD,
    name: 'Mot de passe oublié',
    description: 'Quand un utilisateur oublie son mot de passe',
  },
  {
    code: Event.USER_REGISTER,
    name: 'Message de bienvenue',
    description: "Quand un nouveau adhérent s'inscrit",
  },
];
