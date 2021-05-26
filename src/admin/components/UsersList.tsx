import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    EmailField, ChipField,
    EditButton,
    DeleteButton, ReferenceField,
    ListProps, ShowButton
} from 'react-admin'

const UserList = (props: ListProps) => {
    return (
        <List {...props}>
            <Datagrid>
                <EmailField source='email'/>
                <TextField label={"First Name"} source='firstName'/>
                <TextField label={"Last Name"} source='lastName'/>
                <ReferenceField label="Class" source="classId" reference="classes">
                    <TextField source="name"/>
                </ReferenceField>
                <ChipField source='role'/>
                <EditButton basePath='/users'/>
                <ShowButton basePath='/users'/>
                <DeleteButton basePath='/users'/>
            </Datagrid>
        </List>
    )
}

export default UserList
