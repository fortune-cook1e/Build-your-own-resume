// filter object type
// eg: Person {name:string,age:number} => type PersonWithNumber = FilterKeys<Person,number>
export type FilterKeys<T, Condition> = {
  [Key in keyof T]: T[Key] extends Condition ? Key : never;
}[keyof T];
