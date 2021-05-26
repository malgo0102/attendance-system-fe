import React from 'react'
import {TextInput, Create, SimpleForm, CreateProps} from 'react-admin';

const ClassesCreate = (props: CreateProps) => (
    <Create title="Create a Class" {...props}>
        <SimpleForm>
            <TextInput source="name"/>
        </SimpleForm>
    </Create>
);
export default ClassesCreate
