import {
  CellElement,
  RowElement,
  WorksheetElement,
  WorkbookElement,
  HeaderElement,
  RowGroupElement,
  ColumnElement,
  IWorksheetAttributes,
  IWorkbookAttributes,
  IRowGroupAttributes,
  IColumnAttributes,
  IHeaderAttributes,
  IRowAttributes,
  ICellAttributes,
} from './intrinsics'

import { Node, FC } from './interfaces'

type AllElements =
  | CellElement
  | RowElement
  | WorksheetElement
  | WorkbookElement
  | HeaderElement
  | RowGroupElement
  | ColumnElement
  | null

type IntrinsicsAttributes =
  | ICellAttributes
  | IRowAttributes
  | IHeaderAttributes
  | IColumnAttributes
  | IRowGroupAttributes
  | IWorksheetAttributes
  | IWorkbookAttributes

function isElement(element: any): element is AllElements {
  return (
    CellElement.isCellElement(element) ||
    ColumnElement.isColumnElement(element) ||
    RowElement.isRowElement(element) ||
    RowGroupElement.isRowGroupElement(element) ||
    HeaderElement.isHeaderElement(element) ||
    WorksheetElement.isWorksheetElement(element) ||
    WorkbookElement.isWorkbookElement(element)
  )
}

function create<P = {}>(type: FC<P>, attributes: P | null, ...children: Node[]): AllElements
function create(type: 'cell', attributes: ICellAttributes, ...children: Node[]): CellElement
function create(type: 'header', attributes: IHeaderAttributes | null, ...children: Node[]): HeaderElement
function create(type: 'column', attributes: IColumnAttributes, ...children: Node[]): ColumnElement
function create(type: 'row', attributes: IRowAttributes | null, ...children: Node[]): RowElement
function create(type: 'rowGroup', attributes: IRowGroupAttributes | null, ...children: Node[]): RowGroupElement
function create(type: 'worksheet', attributes: IWorksheetAttributes, ...children: Node[]): WorksheetElement
function create(type: 'workbook', attributes: IWorkbookAttributes | null, ...children: Node[]): WorkbookElement
function create<P = {}>(
  type: 'cell' | 'row' | 'worksheet' | 'workbook' | 'header' | 'rowGroup' | 'column' | FC<P>,
  attributes: P | IntrinsicsAttributes | null,
  ...rawChildren: Node[]
): AllElements {
  const children = rawChildren

  if (typeof type === 'function') {
    const attrs = attributes ? (attributes as P) : null
    const props = attrs
      ? Object.assign(attrs, {
          children,
        })
      : ({ children } as P & { children: Node[] })

    const result = type(props)

    if (isElement(result)) {
      return result
    }

    return null
  }

  switch (type) {
    case 'cell': {
      return new CellElement(attributes as ICellAttributes, children)
    }
    case 'row': {
      return new RowElement((attributes || {}) as IRowAttributes, children)
    }
    case 'header': {
      return new HeaderElement((attributes || {}) as IHeaderAttributes, children)
    }
    case 'column': {
      return new ColumnElement(attributes as IColumnAttributes, children)
    }
    case 'rowGroup': {
      return new RowGroupElement((attributes || {}) as IRowGroupAttributes, children)
    }
    case 'worksheet': {
      return new WorksheetElement(attributes as IWorksheetAttributes, children)
    }
    case 'workbook': {
      return new WorkbookElement((attributes || {}) as IWorkbookAttributes, children)
    }
    default: {
      return null
    }
  }
}

export default {
  create,
}
