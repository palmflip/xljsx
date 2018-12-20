import * as exceljs from 'exceljs'

import ColumnElement from './Column'
import { Node } from '../interfaces'

export interface IHeaderAttributes extends Partial<exceljs.Style> {}

const filterChildren = (children: Node[]): ColumnElement[] => {
  return children.reduce<ColumnElement[]>((acc, curr) => {
    if (Array.isArray(curr)) {
      return [...acc, ...filterChildren(curr)]
    }

    return ColumnElement.isColumnElement(curr) ? [...acc, curr] : acc
  }, [])
}

export class HeaderElement {
  public type: 'header' = 'header'
  public options: IHeaderAttributes
  public columns: ColumnElement[]

  static isHeaderElement(instance: any): instance is HeaderElement {
    return instance instanceof HeaderElement
  }

  constructor(attributes: IHeaderAttributes, children: Node[]) {
    this.options = attributes

    const filteredValues = filterChildren(children)

    this.columns = filteredValues
  }
}

export default HeaderElement
