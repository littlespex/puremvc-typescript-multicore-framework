import { ICommand } from './ICommand';

export interface ICommandClass {
  new(): ICommand;
}
