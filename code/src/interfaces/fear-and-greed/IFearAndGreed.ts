import { IData } from "@interfaces/fear-and-greed/IData";
import { IMetadata } from "@interfaces/fear-and-greed/IMetadata";

export interface IFearAndGreed {
  name: string;
  data: Array<IData>;
  metadata: IMetadata;
}
