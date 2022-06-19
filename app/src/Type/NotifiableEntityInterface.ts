export interface NotifiableEntityInterface {
  transformObjectToEventData(): { [key: string]: any };
}
