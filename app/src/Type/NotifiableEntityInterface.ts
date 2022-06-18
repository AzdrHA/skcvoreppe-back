export interface NotifiableEntityInterface {
  transformObjectToEventData(): { [key: string]: string };
}
