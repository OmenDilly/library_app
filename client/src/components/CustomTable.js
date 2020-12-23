import MaterialTable from 'material-table'
import { createRef, useState } from 'react'
import { LogDialog } from './LogDialog'

export function CustomTable(data, addFunc = null, deleteFunc = null, updateFunc = null) {

  // const [open, setOpen] = useState(false)

  // const addButtonClick = (rowData) => {
  //   console.log(rowData)
  //   setOpen(!open)
  // }

  // const handleCloseDialog = (data) => {
  //   setOpen(prev => !prev)
  // }

  const tableRef = createRef();

  return (
    <>
      {/* <LogDialog open={open} close={handleCloseDialog} title='Новый пользователь'/> */}
      <MaterialTable
        columns={data.columns}
        data={data.values}
        title=""
        tableRef={tableRef}
        detailPanel={rowData => {
          return (
            <div>
              {rowData.name}
            </div>
          )
        }}
        actions={[
          // {
          //   icon: 'add',
          //   tooltip: 'Создать',
          //   isFreeAction: true,
          //   onClick: addButtonClick
          // },
          {
            icon: 'refresh',
            tooltip: 'Обновить',
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
          searchFieldAlignment: 'left',
          columnsButton: true
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        editable={{
          // onRowAdd: newData =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       // setData([...data, newData]);
                
          //       resolve();
          //     }, 1000)
          //   }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // const dataUpdate = [...data];
                // const index = oldData.tableData.id;
                // dataUpdate[index] = newData;
                // setData([...dataUpdate]);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // const dataDelete = [...data];
                // const index = oldData.tableData.id;
                // dataDelete.splice(index, 1);
                // setData([...dataDelete]);
                
                resolve()
              }, 1000)
            }),
        }}
        localization={{
                  body: {
                      emptyDataSourceMessage: "Нет данных",
                      addTooltip: 'Создать',
                      deleteTooltip: 'Удалить',
                      editTooltip: 'Редактировать',
                      filterRow: {
                          filterTooltip: 'Сортировка'
                      },
                      editRow: {
                          deleteText: 'Точно хотите удалить?',
                          cancelTooltip: 'Отмена',
                          saveTooltip: 'Принять'
                      }
                  },
                  grouping: {
                      placeholder: "Сортировать",
                      groupedBy: 'Сортировка по:'
                  },
                  header: {
                      actions: 'Действия'
                  },
                  pagination: {
                      labelDisplayedRows: '{from}-{to} из {count}',
                      labelRowsSelect: 'строчек',
                      labelRowsPerPage: 'строчек на странице:',
                      firstAriaLabel: 'Первая страница',
                      firstTooltip: 'Первая страница',
                      previousAriaLabel: 'Предыдущая страница',
                      previousTooltip: 'Предыдущая страница',
                      nextAriaLabel: 'Следующая страница',
                      nextTooltip: 'Следующая страница',
                      lastAriaLabel: 'Последняя страница',
                      lastTooltip: 'Последняя страница'
                  },
                  toolbar: {
                      addRemoveColumns: 'Ajouter ou supprimer des colonnes',
                      nRowsSelected: '{0} ligne(s) sélectionée(s)',
                      showColumnsTitle: 'Показать названия колонок',
                      showColumnsAriaLabel: 'Показать названия колонок',
                      exportTitle: 'Экспорт',
                      exportAriaLabel: 'Экспорт',
                      exportName: 'Скачать в виде таблицы',
                      searchTooltip: 'Поиск',
                      searchPlaceholder: 'Поиск'
                  }
              }}
      />
    </>
  )
}