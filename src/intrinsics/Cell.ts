import { Node } from '../interfaces'

export interface ICellAttributes {
  id: string
  numFmt?: string
}

export class CellElement {
  public type: 'cell' = 'cell'
  public options: ICellAttributes
  public value: string | number

  static isCellElement(instance: any): instance is CellElement {
    return instance instanceof CellElement
  }

  constructor(attributes: ICellAttributes, children: Node[]) {
    this.options = attributes

    const filteredValues = children.filter(
      (item): item is string | number => typeof item === 'string' || typeof item === 'number'
    )

    this.value = filteredValues.length === 1 ? filteredValues[0] : filteredValues.join('')
  }
}

export default CellElement
