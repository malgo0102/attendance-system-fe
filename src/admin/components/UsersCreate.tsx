import React from 'react'
import {TextInput, Create, SimpleForm, SelectInput, ReferenceInput, CreateProps} from 'react-admin';

const UsersCreate = (props: CreateProps) => (
    <Create title="Create a User" {...props}>
        <SimpleForm>
            <TextInput source="email"/>
            <TextInput source="firstName"/>
            <TextInput source="lastName"/>
            <SelectInput source='role' choices={[
                {id: 'Student', name: 'Student'},
                {id: 'Teacher', name: 'Teacher'},
                {id: 'Admin', name: 'Admin'},
            ]}/>
            <ReferenceInput label="Class" source="classId" reference="classes">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
export default UsersCreate
