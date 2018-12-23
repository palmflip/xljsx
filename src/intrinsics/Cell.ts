import { Node, ICellRenderContext, ICellRenderResult } from '../interfaces'

export interface ICellOnRender {
  (cellElement: CellElement, result: ICellRenderResult, context: ICellRenderContext): void
}

export interface ICellAttributes {
  id: string
  numFmt?: string
  onRender?: ICellOnRender
}

export class CellElement {
  public type: 'cell' = 'cell'
  public options: ICellAttributes
  public value: string | number | null

  static isCellElement(instance: any): instance is CellElement {
    return instance instanceof CellElement
  }

  constructor(attributes: ICellAttributes, children: Node[]) {
    this.options = attributes

    const filteredValues = children.filter(
      (item): item is string | number => typeof item === 'string' || typeof item === 'number'
    )

    if (filteredValues.length === 0) {
      this.value = null
    } else if (filteredValues.length === 1) {
      this.value = filteredValues[0]
    } else {
      this.value = filteredValues.join('')
    }
  }
}

export default CellElement
