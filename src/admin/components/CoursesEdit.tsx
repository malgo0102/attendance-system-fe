import React from 'react'
import {TextInput, Edit, SimpleForm, CreateProps, ReferenceInput, SelectInput} from 'react-admin';

const CoursesEdit = (props: CreateProps) => (
    <Edit title="Edit a Course" {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id"/>
            <TextInput source="name"/>
            <ReferenceInput label="Teacher" source="teacherId" reference="users"
                            filterToQuery={() => ({role: 'Teacher'})}>
                <SelectInput optionText={(record: any) => `${record.firstName} ${record.lastName}`}/>
            </ReferenceInput>
            <ReferenceInput label="Class" source="classId" reference="classes">
                <SelectInput optionText='name'/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
export default CoursesEdit
