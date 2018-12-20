import WorksheetElement from './Worksheet'
import { Node } from '../interfaces'

export type IWorkbookAttributes = Partial<{
  creator: string
  lastModifiedBy: string
  created: Date
  modified: Date
  lastPrinted: Date
}>

const filterChildren = (children: Node[]): WorksheetElement[] => {
  return children.reduce<WorksheetElement[]>((acc, curr) => {
    if (Array.isArray(curr)) {
      return [...acc, ...filterChildren(curr)]
    }

    return WorksheetElement.isWorksheetElement(curr) ? [...acc, curr] : acc
  }, [])
}

type IWorkbookParameter = keyof IWorkbookAttributes

const workbookParameters: IWorkbookParameter[] = [
  'creator',
  'created',
  'lastModifiedBy',
  'lastPrinted',
  'modified',
]

export class Workbook {
  public type: 'workbook' = 'workbook'
  private options: IWorkbookAttributes
  private worksheets: WorksheetElement[]

  static isWorkbookElement(instance: any): instance is Workbook {
    return instance instanceof Workbook
  }

  constructor(attributes: IWorkbookAttributes, children: Node[]) {
    this.options = attributes

    const filteredValues = filterChildren(children)

    this.worksheets = filteredValues
  }

  public getOptions() {
    const validKeys = Object.keys(this.options).filter<IWorkbookParameter>(
      (key: IWorkbookParameter): key is IWorkbookParameter =>
        Boolean(workbookParameters.indexOf(key) + 1)
    )

    return validKeys.reduce<IWorkbookAttributes>((acc, curr) => {
      if (this.options[curr]) {
        acc[curr] = this.options[curr]
      }

      return acc
    }, {})
  }

  public getWorksheets() {
    return this.worksheets
  }
}

export default Workbook
