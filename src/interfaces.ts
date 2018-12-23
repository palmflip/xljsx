import * as excel from 'exceljs'

import {
  IColumnAttributes,
  IHeaderAttributes,
  ICellAttributes,
  IRowAttributes,
  IWorkbookAttributes,
  IRowGroupAttributes,
  IWorksheetAttributes,
  WorkbookElement,
  WorksheetElement,
  RowGroupElement,
  RowElement,
} from './intrinsics'

export type Text = string | number
export type Child = { type: keyof JSX.IntrinsicElements } | Text
export type Node = Child | boolean | null | undefined

export interface FC<P = {}> {
  (
    props: P & {
      children?: Node[]
    }
  ): Node
}

export interface CellAttributes {
  id: string
  numFmt?: string
}

export interface RowGroupAttributes {}

export interface HeaderAttributes {}

export interface ColumnAttributes {
  id: string
  width?: number
}

export interface WorksheetAttributes {
  name: string
}

export interface IWorksheetRenderContext {
  workbookElement: WorkbookElement
  workbook: excel.Workbook
}

export interface IHeaderRenderContext extends IWorksheetRenderContext {
  worksheet: excel.Worksheet
  worksheetElement: WorksheetElement
}

export interface IWorksheetChildRenderContext extends IWorksheetRenderContext {
  worksheet: excel.Worksheet
  worksheetElement: WorksheetElement
}

export interface IRowGroupRenderContext extends IWorksheetChildRenderContext {
  rowGroupElement?: RowGroupElement
}

export interface IRowRenderContext extends IWorksheetChildRenderContext {
  rowGroupElement?: RowGroupElement
}

export interface ICellRenderContext extends IRowRenderContext {
  rowElement: RowElement
  row: excel.Row
}

declare global {
  namespace JSX {
    interface ElementAttributesProperty {
      props: {}
    }

    interface ElementChildrenAttribute {
      children: {}
    }

    interface IntrinsicElements {
      cell: ICellAttributes & { children?: any }
      row: IRowAttributes & { children: any }
      header: IHeaderAttributes & { children: any }
      column: IColumnAttributes & { children: any }
      rowGroup: IRowGroupAttributes & { children: any }
      worksheet: IWorksheetAttributes & { children: any }
      workbook: IWorkbookAttributes & { children: any }
    }
  }
}
