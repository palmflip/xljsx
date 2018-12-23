import * as exceljs from 'exceljs'
import { Node, IRowRenderContext } from '../interfaces'

import CellElement from './Cell'

export interface IRowOnRender {
  (rowElement: RowElement, row: exceljs.Row, context: IRowRenderContext): void
}

export interface IRowAttributes extends Partial<exceljs.Style> {
  onRender?: IRowOnRender
}

const filterChildren = (children: Node[]): CellElement[] => {
  return children.reduce<CellElement[]>((acc, curr) => {
    if (Array.isArray(curr)) {
      return [...acc, ...filterChildren(curr)]
    }

    return CellElement.isCellElement(curr) ? [...acc, curr] : acc
  }, [])
}

class RowElement {
  public type: 'row' = 'row'
  public options: IRowAttributes
  private cells: CellElement[]

  static isRowElement(instance: any): instance is RowElement {
    return instance instanceof RowElement
  }

  constructor(attributes: IRowAttributes, children: Node[]) {
    this.options = attributes

    const filteredValues = filterChildren(children)

    this.cells = filteredValues
  }

  public getCells() {
    return this.cells
  }
}

export default RowElement
