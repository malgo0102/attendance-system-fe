import React from 'react'
import {TextInput, Edit, SimpleForm, CreateProps} from 'react-admin';

const ClassesEdit = (props: CreateProps) => (
    <Edit title="Edit a Class" {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="name"/>
        </SimpleForm>
    </Edit>
);
export default ClassesEdit
