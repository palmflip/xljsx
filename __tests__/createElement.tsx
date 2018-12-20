import Xljsx from '../src/Xljsx'
import Body from '../src/components/Body'

describe('function component', () => {
  it('should works', () => {
    const cell = Xljsx.create('cell', { id: 'B' }, 'something', 'wrong', false, 'troe')
    const bodyOne = Xljsx.create(Body, null, cell)

    expect(bodyOne).toMatchSnapshot()
  })
})

describe('cells', () => {
  it('should create cell', () => {
    const cell = Xljsx.create('cell', { id: 'A' }, 'something', 'wrong', false, 'troe')

    expect(cell).toMatchSnapshot()

    expect(
      <cell id={'A'}>
        something{'wrong'}
        {false}troe
      </cell>
    ).toEqual(cell)
  })
})

describe('rows', () => {
  it('should create row with cell', () => {
    const cell = Xljsx.create('cell', { id: 'A' }, 'something')
    const row = Xljsx.create('row', null, cell)

    expect(row).toMatchSnapshot()

    expect(
      <row>
        <cell id={'A'}>something</cell>
      </row>
    ).toEqual(row)
  })
})

describe('rowGroups', () => {
  it('should create rowGroup with rows', () => {
    const cellA = Xljsx.create('cell', { id: 'A' }, 'A')
    const cellB = Xljsx.create('cell', { id: 'B' }, 'B')
    const cellC = Xljsx.create('cell', { id: 'C' }, 'C')

    const rowOne = Xljsx.create('row', null, cellA, cellB, cellC)
    const rowTwo = Xljsx.create('row', null, cellA, cellB, cellC)

    const rowGroup = Xljsx.create('rowGroup', null, rowOne, rowTwo)

    expect(rowGroup).toMatchSnapshot()

    expect(
      <rowGroup>
        <row>
          <cell id="A">A</cell>
          <cell id="B">B</cell>
          <cell id="C">C</cell>
        </row>
        <row>
          <cell id="A">A</cell>
          <cell id="B">B</cell>
          <cell id="C">C</cell>
        </row>
      </rowGroup>
    ).toEqual(rowGroup)
  })
})

describe('worksheets', () => {
  it('should create worksheet with row and cells', () => {
    const hColumnA = Xljsx.create('column', { id: 'A' }, 'Column A')
    const hColumnB = Xljsx.create('column', { id: 'B' }, 'Column B')
    const hColumnC = Xljsx.create('column', { id: 'C' }, 'Column C')

    const header = Xljsx.create('header', null, hColumnA, hColumnB, hColumnC)

    const cellA = Xljsx.create('cell', { id: 'A' }, 'CellA')
    const cellB = Xljsx.create('cell', { id: 'B' }, 'CellB')
    const cellC = Xljsx.create('cell', { id: 'C' }, 'CellC')

    const row = Xljsx.create('row', null, cellA, cellB, cellC)

    const worksheet = Xljsx.create('worksheet', { name: 'Example' }, header, row)

    expect(worksheet).toMatchSnapshot()

    expect(
      <worksheet name="Example">
        <header>
          <column id={'A'}>Column A</column>
          <column id={'B'}>Column B</column>
          <column id={'C'}>Column C</column>
        </header>
        <row>
          <cell id={'A'}>CellA</cell>
          <cell id={'B'}>CellB</cell>
          <cell id={'C'}>CellC</cell>
        </row>
      </worksheet>
    ).toEqual(worksheet)
  })
})

describe('workbooks', () => {
  it('should create workbook with worksheets', () => {
    const hColumnA = Xljsx.create('column', { id: 'A' }, 'Column A')
    const hColumnB = Xljsx.create('column', { id: 'B' }, 'Column B')
    const hColumnC = Xljsx.create('column', { id: 'C' }, 'Column C')

    const cellA = Xljsx.create('cell', { id: 'A' }, 'CellA')
    const cellB = Xljsx.create('cell', { id: 'B' }, 'CellB')
    const cellC = Xljsx.create('cell', { id: 'C' }, 'CellC')

    const header = Xljsx.create('header', null, hColumnA, hColumnB, hColumnC)

    const row = Xljsx.create('row', null, cellA, cellB, cellC)

    const worksheet = Xljsx.create('worksheet', { name: 'Example' }, header, row)
    const worksheet2 = Xljsx.create('worksheet', { name: 'Example2' }, header, row)

    const workbook = Xljsx.create(
      'workbook',
      { creator: 'Alexander Simonov' },
      worksheet,
      worksheet2
    )

    expect(workbook).toMatchSnapshot()

    expect(
      <workbook creator="Alexander Simonov">
        <worksheet name="Example">
          <header>
            <column id={'A'}>Column A</column>
            <column id={'B'}>Column B</column>
            <column id={'C'}>Column C</column>
          </header>
          <row>
            <cell id={'A'}>CellA</cell>
            <cell id={'B'}>CellB</cell>
            <cell id={'C'}>CellC</cell>
          </row>
        </worksheet>
        <worksheet name="Example2">
          <header>
            <column id={'A'}>Column A</column>
            <column id={'B'}>Column B</column>
            <column id={'C'}>Column C</column>
          </header>
          <row>
            <cell id={'A'}>CellA</cell>
            <cell id={'B'}>CellB</cell>
            <cell id={'C'}>CellC</cell>
          </row>
        </worksheet>
      </workbook>
    ).toEqual(workbook)
  })
})
