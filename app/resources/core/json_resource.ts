import MissingValue from "./missing_value.js";

export default class JsonResource {
  constructor(public resource: any) {}

  public static collection(resources: any): any {
    if (resources !== undefined) {
      return resources.map((resource: any) => {
        return new this(resource).toArray();
      }).map((data: any) => {
        return removeMissingValues(data)
      })
    }

    return null
  }

  public static item(resource: any): any {
    if (resource !== undefined) {
      return removeMissingValues(new this(resource).toArray())
    }

    return null
  }

  public toArray(): any {
    throw new Error('Method toArray must be implemented')
  }

  public when(condition: boolean, value: any, defaultValue: any = null) {
    if (condition) {
      return value
    }

    return defaultValue !== undefined ? defaultValue : new MissingValue();
  }

  public merge(data: any) {
    return this.mergeWhen(true, data)
  }

  public mergeWhen(condition: any, data: any) {
    return condition && condition !== undefined ? data : new MissingValue()
  }

  public whenLoaded(relationship: any, value: any, defaultValue = null) {
    if (relationship !== undefined) {
      return value
    }

    return defaultValue !== undefined ? defaultValue : new MissingValue();
  }
}

function removeMissingValues(data: any) {
  let numericKeys = true

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];

      if (
        (value instanceof MissingValue && value.isMissing()) ||
        value instanceof MissingValue &&
        value.isMissing()
      ) {
        delete data[key];
      } else {
        numericKeys = numericKeys && !isNaN(Number(key));
      }
    }
  }

  return numericKeys ? Object.values(data) : data;
}
