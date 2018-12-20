import Xljsx from '../Xljsx'

import { FC } from '../interfaces'

interface IProps {
  cellId?: 'a'
}

const Body: FC<IProps> = (props) => {
  const { cellId, children } = props

  return (
    <row>
      <cell id={cellId || 'a'}>A</cell>
      {children}
    </row>
  )
}

export default Body
