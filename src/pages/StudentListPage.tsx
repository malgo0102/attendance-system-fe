import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  { field: 'email', headerName: 'Email', width: 160 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 270,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(1, 'firstName') || ''} ${params.getValue(1, 'lastName') || ''}`,
  },
];

const rows = [
  { id: 1, firstName: 'Malgorzata', lastName: 'W', email: "mw@stud.kea.dk" },
  { id: 2, firstName: 'Alin', lastName: 'P', email: "ap@stud.kea.dk" },
  { id: 3, firstName: 'Pedro', lastName: 'P', email: "pp@stud.kea.dk" },
  { id: 4, firstName: 'Aisha', lastName: 'R', email: "ar@stud.kea.dk" },
];

const StudentListPage = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection />
    </div>
  );
}

export default StudentListPage;