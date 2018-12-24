# xljsx
Библиотека для построения Excel таблиц c помощью JSX.

⚠️*Внимание! Нестабильная версия, не советуется использовать без желания и возможности участвовать её в развитии.*

Создана в процессе разработки проекта Заебаттон и используется там для построения отчётов.

Под капотом работает с библиотекой [exceljs](https://npmjs.com/packages/exceljs). 

Позволяет применять компонентный подход (почти как в Реакте) для построения таблиц.

## Установка
```
npm install xljsx
```

### Настройка сборки
При использвании с TypeScipt необходимо в `tsconfig.json` включить поддержку jsx и выставить прагму:

```json
{
  "compilerOptions": {
    "jsxFactory": "Xljsx.create",
    "jsx": "react"
  }
}
```

При использовании Babel делается как-то аналогично, гуглите самостоятельно :)

В коде:
```jsx
import { Xljsx, render } from 'xljsx'

const workbook = render(
  <workbook>
    <worksheet name={'Hello world examples'}>
      <header>
        <column id={'language'}>Language</column>
        <column id={'text'}>Text</column>
      </header>
      <row>
        <cell id={'language'}>Russian</cell>
        <cell id={'text'}>Привет, мир!</cell>
      </row>
      <row>
        <cell id={'language'}>English</cell>
        <cell id={'text'}>Hello world</cell>
      </row>
      <row>
        <cell id={'language'}>Thai</cell>
        <cell id={'text'}>สวัสดีชาวโลก</cell>
      </row>
    </worksheet>
  </workbook>
)

workbook.xls.writeFile('demo.xlsx').then(() => {
  console.log('Done!')
})

```

## Основные элементы

### Workbook
`<workbook>{/* ... */}</workbook>`

Обычно корневой элемент. Представляет из себя документ, который можно преобразовать в `xls` или `csv` формат.

#### Пример использования:
```jsx
<workbook creator={"Alexander Simonov"}>...</workbook>
```

### Worksheet
`<worksheet>{/* ... */}</worksheet>`

Рабочая книга, представляет из себя таблицу на отдельной вкладке в Excel-документе.

#### Пример использования:
```jsx
<workbook>
  <worksheet name="Summary Report">...</worksheet>
  <worksheet name="Detailed Report">...</worksheet>
</workbook>
```

### Header
`<header>{/* только column-элементы */}</header>`

Секция, где с помощью `column` элементов указываются колонки таблицы `<column id={'id'}>Column</column>`.

### Сolumn
`<column id='string'>{/* ... */}</column>`

Представляет из себя колонку таблицы, используется только внутри элемента `header`.

Обязательный атрибут `id`.

#### Пример использования:
```jsx
<workbook>
  <worksheet name="Personal Data">
    <header>
      <column id={"name"}>Name</column>
      <column id={"position"}>Position</column>
      <column id={"rate"}>Rate</column>
      <column id={"hours"}>Hours</column>
      <column id={"total"}>Total Cost</column>
    </header>
  </worksheet>
</workbook>
```

### Row
`<row>{/* только cell элементы */}</row>`

Представляет из себя строку таблицы, аналог `<tr>...</tr>` из HTML.

Используется после того, как были объявлены колонки с помощью элементов `column` в секции `header`.


### Cell
`<cell id='string'>{/* string | number | null */}</row>`

Представляет из себя ячейку таблицы, аналог `<tr>...</tr>` из HTML.

Используется только внутри `row`, обязательный атрибут `id`.

#### Пример использования:
```jsx
<workbook>
  <worksheet name="Personal Data">
    <header>
      <column id={"name"}>Name</column>
      <column id={"position"}>Position</column>
      <column id={"rate"}>Rate</column>
      <column id={"hours"}>Hours</column>
      <column id={"total"}>Total Cost</column>
    </header>
    <row>
      <cell id={"name"}>Alexander</cell>
      <cell id={"position"}>JavaScript Developer</cell>
      <cell id={"rate"}>{100}</cell>
      <cell id={"hours"}>{1.5}</cell>
      <cell id={"total"}>{150}</cell>
    </row>
    <row>
      <cell id={"name"}>Elon Musk</cell>
      <cell id={"position"}>Great Engineer</cell>
      <cell id={"rate"}>{50}</cell>
      <cell id={"hours"}>{2.5}</cell>
      <cell id={"total"}>{125}</cell>
    </row>
  </worksheet>
</workbook>
```

### RowGroup
`<rowGroup>{/* ...элементы row или rowGroup */}</rowGroup>`

Группа из нескольких несколких строк илл других групп.

Удобно использовать, когда компонент генерирует несколько строк.

#### Пример использования:
```jsx
<workbook>
  <worksheet name="Personal Data">
    <header>
      <column id={"name"}>Name</column>
      <column id={"position"}>Position</column>
      <column id={"rate"}>Rate</column>
      <column id={"hours"}>Hours</column>
      <column id={"total"}>Total Cost</column>
    </header>
    <rowGroup>
      <row>
        <cell id={"name"}>Best employees</cell>
        <cell id={"position"} />
        <cell id={"rate"} />
        <cell id={"hours"} />
        <cell id={"total"} />
      </row>
      <row>
        <cell id={"name"}>Alexander</cell>
        <cell id={"position"}>JavaScript Developer</cell>
        <cell id={"rate"}>{100}</cell>
        <cell id={"hours"}>{1.5}</cell>
        <cell id={"total"}>{150}</cell>
      </row>
      <row>
        <cell id={"name"}>Elon Musk</cell>
        <cell id={"position"}>Great Engineer</cell>
        <cell id={"rate"}>{50}</cell>
        <cell id={"hours"}>{2.5}</cell>
        <cell id={"total"}>{125}</cell>
      </row>
    </rowGroup>
  </worksheet>
</workbook>

```

## Компоненты

Можно создавать компоненты, аналогичные Functional Components из React:

```tsx
/* GroupHeader.tsx */

import { Xljsx, FC } from 'xljsx'

interface IProps {
  name?: string
}

export const GroupHeader: FC<IProps> = props => {
  const { name = 'Best employees' } = props

  return 
    <row>
      <cell id={"name"}>{name}</cell>
      <cell id={"position"} />
      <cell id={"rate"} />
      <cell id={"hours"} />
      <cell id={"total"} />
    </row>
  )
}
```
```tsx
/* AwesomeWorkbook.tsx */

import { Xljsx, FC } from "xljsx";

import { GroupHeader } from "./GroupHeader";

const Workbook: FC = () => {
  return (
    <workbook>
      <worksheet name="Personal Data">
        <header>
          <column id={"name"}>Name</column>
          <column id={"position"}>Position</column>
          <column id={"rate"}>Rate</column>
          <column id={"hours"}>Hours</column>
          <column id={"total"}>Total Cost</column>
        </header>
        <rowGroup>
          <GroupHeader name={"Best employees"} />
          <row>
            <cell id={"name"}>Alexander</cell>
            <cell id={"position"}>JavaScript Developer</cell>
            <cell id={"rate"}>{100}</cell>
            <cell id={"hours"}>{1.5}</cell>
            <cell id={"total"}>{150}</cell>
          </row>
          <row>
            <cell id={"name"}>Elon Musk</cell>
            <cell id={"position"}>Great Engineer</cell>
            <cell id={"rate"}>{50}</cell>
            <cell id={"hours"}>{2.5}</cell>
            <cell id={"total"}>{125}</cell>
          </row>
        </rowGroup>
      </worksheet>
    </workbook>
  );
};

```

Пример не показывает, но `props.children` работает так же как в Реакте.
