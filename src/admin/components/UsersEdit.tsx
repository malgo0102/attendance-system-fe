import React from 'react'
import {TextInput, Edit, SimpleForm, CreateProps, SelectInput, ReferenceInput} from 'react-admin';

const UsersEdit = (props: CreateProps) => (
    <Edit title="Edit a Class" {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
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
    </Edit>
);
export default UsersEdit
