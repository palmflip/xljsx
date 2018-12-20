import * as excel from 'exceljs'
import {
  WorkbookElement,
  HeaderElement,
  WorksheetElement,
  IWorkbookAttributes,
  RowElement,
  CellElement,
} from './intrinsics'

class Excel {
  private _workbook: excel.Workbook

  static render(workbook: WorkbookElement) {
    return new Excel(workbook)
  }

  constructor(workbook: WorkbookElement) {
    this._workbook = new excel.Workbook()

    const options = workbook.getOptions()
    const worksheets = workbook.getWorksheets()

    this.setWorkbookOptions(options)

    for (const worksheet of worksheets) {
      const excelWorksheet = this._workbook.addWorksheet(worksheet.getName())

      const header = worksheet.getHeader()

      this.setHeader(excelWorksheet, header)

      for (const row of this.iterateRows(worksheet)) {
        const excelRow = excelWorksheet.addRow([])

        this.setRow(excelRow, row)

        for (const cell of this.iterateCells(row)) {
          const excelCell = excelRow.getCell(cell.options.id)
          
          this.setCell(excelCell, cell)
        }
      }
    }
  }

  private *iterateRows(worksheet: WorksheetElement) {
    const flatList = worksheet.getRows()

    for (const row of flatList) {
      yield row
    }
  }

  private *iterateCells(row: RowElement) {
    for (const cell of row.getCells()) {
      yield cell
    }
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
