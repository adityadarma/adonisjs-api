export default class JsonResource {
  constructor(public resource: any) {}

  public static collection(resources: any[]): any[] {
    return resources.map(resource => new this(resource).toArray());
  }

  public static item(resource: any): any {
    return new this(resource).toArray();
  }

  public toArray(): any {
    throw new Error('Method toArray must be implemented');
  }
}
