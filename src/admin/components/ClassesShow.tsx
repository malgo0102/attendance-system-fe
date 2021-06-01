import React from 'react'
import {
    TabbedShowLayout,
    TabbedShowLayoutTabs,
    Tab,
    TextField,
    Show,
    ReferenceManyField,
    Datagrid,
    ShowProps
} from 'react-admin';

const ClassesShow = (props: ShowProps) => (
    <Show title="Class view"  {...props}>
        <TabbedShowLayout syncWithLocation={false} tabs={<TabbedShowLayoutTabs/>}>
            <Tab label="summary">
                <TextField label="Id" source="id"/>
                <TextField source="name"/>
            </Tab>
            <Tab label="students">
                <ReferenceManyField reference="users" target="classId" addLabel={false}>
                    <Datagrid>
                        <TextField source="firstName"/>
                        <TextField source="lastName"/>
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);
export default ClassesShow

