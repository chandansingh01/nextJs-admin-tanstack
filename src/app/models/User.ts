export type User = {
      first_name: string;
      last_name: string;
      email: string;
      alternate_email: string;
      age: number | null;
      password:string;
      id: string;
      selected?:boolean
};