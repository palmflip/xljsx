import Xljsx from '../src/Xljsx'
import * as excel from 'exceljs'

import * as Cell from 'exceljs/dist/es5/doc/cell'
import * as Row from 'exceljs/dist/es5/doc/row'
import * as Workbook from 'exceljs/dist/es5/doc/workbook'
import * as Worksheet from 'exceljs/dist/es5/doc/worksheet'

import { render } from '../src/Excel'
import { CellElement, RowElement, WorksheetElement, WorkbookElement, RowGroupElement } from '../src/intrinsics'

let queue: string[] = []

const pushToQueue = (what: string) => () => {
  queue.push(what)
}

const onWrapperGroupRender = jest.fn(pushToQueue('onWrapperGroupRender'))
const onGroupRender = jest.fn(pushToQueue('onGroupRender'))
const onGroupHeaderRender = jest.fn(pushToQueue('onGroupHeaderRender'))
const onTotalRender = jest.fn(pushToQueue('onTotalRender'))
const onRowRender = jest.fn(pushToQueue('onRowRender'))
const onCellRender = jest.fn(pushToQueue('onCellRender'))

const getTemplate = () => (
  <workbook>
    <worksheet name="Example">
      <header>
        <column id={'user_entry'}>User / Issue ID</column>
        <column id={'rate'}>Rate</column>
        <column id={'hours'}>Hours</column>
        <column id={'totalCost'}>Total Cost</column>
      </header>
      <rowGroup onRender={onWrapperGroupRender}>
        <rowGroup onRender={onGroupRender}>
          <row onRender={onGroupHeaderRender}>
            <cell id={'user_entry'}>Alexander Simonov</cell>
            <cell id={'rate'} />
            <cell id={'hours'} />
            <cell id={'totalCost'} />
          </row>
          <row onRender={onRowRender}>
            <cell id={'user_entry'}>Рефакторинг отчётов</cell>
            <cell id={'rate'}>{1500}</cell>
            <cell id={'hours'}>{1.5}</cell>
            <cell id={'totalCost'}>{2250}</cell>
          </row>
          <row onRender={onRowRender}>
            <cell id={'user_entry'}>Созвон статус</cell>
            <cell id={'rate'}>{1000}</cell>
            <cell id={'hours'}>{2}</cell>
            <cell id={'totalCost'}>{1000}</cell>
          </row>
        </rowGroup>
        <row onRender={onTotalRender}>
          <cell id={'user_entry'} />
          <cell id={'rate'} />
          <cell id={'hours'} onRender={onCellRender}>
            {3.5}
          </cell>
          <cell id={'totalCost'}>{3250}</cell>
        </row>
      </rowGroup>
    </worksheet>
  </workbook>
)

describe('onRender hooks', () => {
  beforeEach(() => {
    queue = []

    onWrapperGroupRender.mockClear()
    onGroupRender.mockClear()
    onGroupHeaderRender.mockClear()
    onTotalRender.mockClear()
    onRowRender.mockClear()
    onCellRender.mockClear()
  })

  it('should call all hook in correct order', () => {
    render(getTemplate())

    expect(queue).toEqual([
      'onGroupHeaderRender',
      'onRowRender',
      'onRowRender',
      'onGroupRender',
      'onCellRender',
      'onTotalRender',
      'onWrapperGroupRender',
    ])
  })

  it("should call cell's `onRender` hook with correct arguments", () => {
    render(getTemplate())

    expect(onCellRender).toBeCalledTimes(1)
    expect(onCellRender).toBeCalledWith(
      expect.any(CellElement),
      expect.objectContaining({
        cell: expect.any(Cell),
      }),
      expect.objectContaining({
        workbook: expect.any(Workbook),
        workbookElement: expect.any(WorkbookElement),
        worksheet: expect.any(Worksheet),
        worksheetElement: expect.any(WorksheetElement),
        row: expect.any(Row),
        rowElement: expect.any(RowElement),
      })
    )
  })

  it("should call row's `onRender` hook with correct arguments'", () => {
    render(getTemplate())

    expect(onGroupHeaderRender).toBeCalledTimes(1)

    expect(onGroupHeaderRender).toBeCalledWith(
      expect.any(RowElement),
      expect.objectContaining({
        row: expect.any(Row),
        cells: expect.arrayContaining([expect.any(Cell)]),
      }),
      expect.objectContaining({
        workbook: expect.any(Workbook),
        workbookElement: expect.any(WorkbookElement),
        worksheet: expect.any(Worksheet),
        worksheetElement: expect.any(WorksheetElement),
        rowGroupElement: expect.any(RowGroupElement),
      })
    )

    expect(onRowRender).toBeCalledTimes(2)
  })

  it('should call rowGroups `onRender` hook with correct arguments', () => {
    render(getTemplate())

    expect(onGroupRender).toBeCalledTimes(1)

    expect(onGroupRender).toBeCalledWith(
      expect.any(RowGroupElement),
      expect.objectContaining({
        type: 'rowGroup',
        children: expect.arrayContaining([
          expect.objectContaining({
            type: 'row',
            row: expect.any(Row),
            cells: expect.arrayContaining([expect.any(Cell)]),
          })
        ])
      }),
      expect.objectContaining({
        workbook: expect.any(Workbook),
        workbookElement: expect.any(WorkbookElement),
        worksheet: expect.any(Worksheet),
        worksheetElement: expect.any(WorksheetElement),
        rowGroupElement: expect.any(RowGroupElement),
      })
    )
  })

  it("should call wrapper rowGroup's `onRender` with correct arguments", () => {
    render(getTemplate())

    expect(onWrapperGroupRender).toBeCalledTimes(1)

    expect(onWrapperGroupRender).toBeCalledWith(
      expect.any(RowGroupElement),
      expect.objectContaining({
        type: 'rowGroup',
        children: expect.arrayContaining([
          expect.objectContaining({
            type: 'row',
            row: expect.any(Row),
            cells: expect.arrayContaining([expect.any(Cell)]),
          }),
          expect.objectContaining({
            type: 'rowGroup',
            children: expect.any(Array)
          })
        ])
      }),
      expect.not.objectContaining({
        rowGroupElement: expect.any(RowGroupElement),
      })
    )
  })
})
