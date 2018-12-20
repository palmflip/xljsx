import RowElement from './Row'
import { Node } from '../interfaces'

export interface IRowGroupAttributes {}

const filterChildren = (children: Node[]): Array<RowElement | RowGroupElement> => {
  return children.reduce<Array<RowElement | RowGroupElement>>((acc, curr) => {
    if (Array.isArray(curr)) {
      return [...acc, ...filterChildren(curr)]
    }

    return RowElement.isRowElement(curr) || RowGroupElement.isRowGroupElement(curr)
      ? [...acc, curr]
      : acc
  }, [])
}

export class RowGroupElement {
  public type: 'rowGroup' = 'rowGroup'
  public options: IRowGroupAttributes

  public rowsAndGroups: Array<RowElement | RowGroupElement> = []

  static isRowGroupElement(instance: any): instance is RowGroupElement {
    return instance instanceof RowGroupElement
  }

  constructor(attributes: IRowGroupAttributes, children: Node[]) {
    this.options = attributes

    this.rowsAndGroups = filterChildren(children)
  }
}

export default RowGroupElement
