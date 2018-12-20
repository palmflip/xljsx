import { Node } from '../interfaces'

export interface IColumnAttributes {
  id: string
  width?: number
}

export class ColumnElement {
  public type: 'column' = 'column'
  public options: IColumnAttributes
  public name: string

  static isColumnElement(instance: any): instance is ColumnElement {
    return instance instanceof ColumnElement
  }

  constructor(attributes: IColumnAttributes, children: Node[]) {
    this.options = attributes

    const filteredValues = children.filter((item): item is string => typeof item === 'string')

    this.name = filteredValues.map(item => item.toString()).join('')
  }
}

export default ColumnElement
