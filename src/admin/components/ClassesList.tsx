import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    ShowButton,
    ListProps
} from 'react-admin'

const ClassesList = (props: ListProps) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source='id'/>
                <TextField source='name'/>
                <EditButton basePath='/classes'/>
                <DeleteButton basePath='/classes'/>
                <ShowButton basePath='/classes'/>
            </Datagrid>
        </List>
    )
}

export default ClassesList
