import React from 'react'
import {TextInput, Create, SimpleForm, CreateProps, ReferenceInput, SelectInput} from 'react-admin';

const CoursesCreate = (props: CreateProps) => (
    <Create title="Create a Course" {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <ReferenceInput label="Teacher" source="teacherId" reference="users"
                            filterToQuery={() => ({role: 'Teacher'})}>
                <SelectInput optionText={(record: any) => `${record.firstName} ${record.lastName}`}/>
            </ReferenceInput>
            <ReferenceInput label="Class" source="classId" reference="classes">
                <SelectInput optionText='name'/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
export default CoursesCreate
