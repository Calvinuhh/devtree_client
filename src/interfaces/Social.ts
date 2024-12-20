export default interface Social {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
}

export type DevTreeLink = Pick<Social, "name" | "url" | "enabled">;

