import * as excel from 'exceljs'

import {
  WorkbookElement,
  HeaderElement,
  WorksheetElement,
  IWorkbookAttributes,
  RowElement,
  CellElement,
  RowGroupElement,
} from './intrinsics'

import {
  IWorksheetRenderContext,
  IHeaderRenderContext,
  IWorksheetChildRenderContext,
  IRowGroupRenderContext,
  IRowRenderContext,
  ICellRenderContext,
} from './interfaces'

class Excel {
  private _workbook: excel.Workbook

  static render(workbook: WorkbookElement) {
    return new Excel(workbook)
  }

  constructor(workbookElement: WorkbookElement) {
    const workbook = new excel.Workbook()

    this._workbook = workbook

    const options = workbookElement.getOptions()
    const worksheets = workbookElement.getWorksheets()

    this.setWorkbookOptions(options)

    this.renderWorksheets(worksheets, {
      workbook,
      workbookElement,
    })
  }

  private renderWorksheets(worksheets: WorksheetElement[], context: IWorksheetRenderContext) {
    for (const worksheet of worksheets) {
      this.renderWorksheet(worksheet, context)
    }
  }

  private renderWorksheet(worksheetElement: WorksheetElement, context: IWorksheetRenderContext) {
    const { workbook } = context

    const name = worksheetElement.getName()
    const worksheet = workbook.addWorksheet(name)

    this.setWorksheet(worksheet, worksheetElement)

    const header = worksheetElement.getHeader()

    const newContext = {
      ...context,
      worksheetElement,
      worksheet,
    }

    this.renderHeader(header, newContext)
    this.renderWorksheetChildren(worksheetElement.getChildren(), newContext)
  }

  private renderHeader(headerElement: HeaderElement, context: IHeaderRenderContext) {
    const { worksheet } = context

    this.setHeader(worksheet, headerElement)
  }

  private renderWorksheetChildren(
    children: Array<RowGroupElement | RowElement>,
    context: IWorksheetChildRenderContext
  ) {
    for (const child of children) {
      if (RowElement.isRowElement(child)) {
        this.renderRow(child, context)
      }

      if (RowGroupElement.isRowGroupElement(child)) {
        this.renderRowGroup(child, context)
      }
    }
  }

  private renderRowGroup(rowGroupElement: RowGroupElement, context: IRowGroupRenderContext) {
    for (const child of rowGroupElement.rowsAndGroups) {
      if (RowElement.isRowElement(child)) {
        this.renderRow(child, { ...context, rowGroupElement })
      }

      if (RowGroupElement.isRowGroupElement(child)) {
        this.renderRowGroup(child, { ...context, rowGroupElement })
      }
    }
  }

  private renderRow(rowElement: RowElement, context: IRowRenderContext) {
    const { worksheet } = context

    const row = worksheet.addRow([])

    this.setRow(row, rowElement)

    const cellElements = rowElement.getCells()

    const cellRenderContext: ICellRenderContext = {
      ...context,
      rowElement,
      row,
    }

    this.renderCells(cellElements, cellRenderContext)
  }

  private renderCells(cellsElements: CellElement[], context: ICellRenderContext) {
    for (const cellElement of cellsElements) {
      this.renderCell(cellElement, context)
    }
  }

  private renderCell(cellElement: CellElement, context: ICellRenderContext) {
    const { row } = context

    const cell = row.getCell(cellElement.options.id)

    this.setCell(cell, cellElement)
  }

  private setWorkbookOptions(workbookOptions: IWorkbookAttributes) {
    Object.keys(workbookOptions).forEach(optionName => {
      this._workbook[optionName] = workbookOptions[optionName]
    })
  }

  private setRow(excelRow: excel.Row, row: RowElement) {
    if (row.options.alignment) {
      excelRow.alignment = row.options.alignment
    }

    if (row.options.font) {
      excelRow.font = row.options.font
    }

    if (row.options.fill) {
      excelRow.fill = row.options.fill
    }

    if (row.options.border) {
      excelRow.border = row.options.border
    }
  }

  private setCell(excelCell: excel.Cell, cell: CellElement) {
    excelCell.value = cell.value

    if (cell.options.numFmt) {
      excelCell.numFmt = cell.options.numFmt
    }
  }

  private setWorksheet(excelWorksheet: excel.Worksheet, worksheet: WorksheetElement) {
    const options = worksheet.getOptions()

    if (options.defaultRowHeight) {
      excelWorksheet.properties.defaultRowHeight = options.defaultRowHeight
    }
  }

  private setHeader(worksheet: excel.Worksheet, header: HeaderElement) {
    worksheet.columns = header.columns.map(column => ({
      key: column.options.id,
      width: column.options.width,
      header: column.name.toString(),
    }))

    const headerRow = worksheet.getRow(1)

    if (header.options.fill) {
      headerRow.fill = header.options.fill
    }

    if (header.options.border) {
      headerRow.border = header.options.border
    }

    if (header.options.alignment) {
      headerRow.alignment = header.options.alignment
    }

    if (header.options.font) {
      headerRow.font = header.options.font
    }
  }

  public getWorkbook() {
    return this._workbook
  }
}

export const render = (workbook: WorkbookElement) => Excel.render(workbook)
