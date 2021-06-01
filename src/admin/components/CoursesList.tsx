import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    ShowButton,
    ListProps, ReferenceField
} from 'react-admin'

const CoursesList = (props: ListProps) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source='id'/>
                <TextField source='name'/>
                <ReferenceField label="Teacher" source="teacherId" reference="users" sortable={false}>
                    <TextField source="email"/>
                </ReferenceField>
                <ReferenceField label="Class" source="classId" reference="classes"  sortable={false}>
                    <TextField source="name"/>
                </ReferenceField>
                <EditButton basePath='/courses'/>
                <DeleteButton basePath='/courses'/>
                <ShowButton basePath='/courses'/>
            </Datagrid>
        </List>
    )
}

export default CoursesList
