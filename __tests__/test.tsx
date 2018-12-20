import Xljsx from '../src/Xljsx'
import { render } from '../src/Excel'

import { IWorkbookAttributes } from '../src/intrinsics/Workbook'

describe('render in file', () => {
  const createEmptyWorkbook = (params: IWorkbookAttributes = {}) => (
    <workbook {...params}>
      <worksheet name="Example Worksheet">
        <header>
          <column id={'c'}>Cell</column>
        </header>
        <row>
          <cell id={'c'}>Hello world!</cell>
        </row>
        <row>
          <cell id={'c'}>Hello world 2!</cell>
        </row>
      </worksheet>
    </workbook>
  )

  it('should works', () => {
    const workbook = render(createEmptyWorkbook({})).getWorkbook()

    return workbook.xlsx.writeFile('test.xlsx')
  })
})