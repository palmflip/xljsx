import * as excel from 'exceljs'

import Xljsx from '../src/Xljsx'
import { render } from '../src/Excel'
import { IWorkbookAttributes } from '../src/intrinsics'

describe('render xlsx', () => {
  const createEmptyWorkbook = (params: IWorkbookAttributes = {}) => (
    <workbook {...params}>
      <worksheet name="Example Worksheet">
        <header>
          <column id={'cell'}>Cell</column>
        </header>
        <row>
          <cell id={'cell'}>Hello world!</cell>
        </row>
        <row>
          <cell id={'cell'}>Hello world, 2!</cell>
        </row>
      </worksheet>
    </workbook>
  )

  describe('workbook', () => {
    it('should create empty workbook', () => {
      const result = render(createEmptyWorkbook()).getWorkbook()

      expect(result).toBeInstanceOf(excel.Workbook)
    })

    it('should set `creator`', () => {
      const result = render(createEmptyWorkbook({ creator: 'Alexander Simonov' })).getWorkbook()

      expect(result.creator).toBe('Alexander Simonov')
    })

    it('should set `created`', () => {
      const created = new Date('2018-01-01T00:00:00.000Z')
      const result = render(createEmptyWorkbook({ created })).getWorkbook()

      expect(result.created).toBe(created)
    })

    it('should set `lastModifiedBy`', () => {
      const result = render(createEmptyWorkbook({ lastModifiedBy: 'Alexander Simonov' })).getWorkbook()

      expect(result.lastModifiedBy).toBe('Alexander Simonov')
    })

    it('should set `lastPrinted`', () => {
      const lastPrinted = new Date('2018-01-01T00:00:00.000Z')
      const result = render(createEmptyWorkbook({ lastPrinted })).getWorkbook()

      expect(result.lastPrinted).toBe(lastPrinted)
    })

    it('should set `modified`', () => {
      const modified = new Date('2018-01-01T00:00:00.000Z')
      const result = render(createEmptyWorkbook({ modified })).getWorkbook()

      expect(result.modified).toBe(modified)
    })
  })

  describe('worksheet', () => {
    it('should create worksheet with name `Example Worksheet`', () => {
      const result = render(createEmptyWorkbook()).getWorkbook()

      expect(result.worksheets[0]).toMatchObject({
        name: 'Example Worksheet',
      })
    })
  })
})
