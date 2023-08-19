import { Table, Space, Tag } from 'antd';
import PropTypes from 'prop-types';

export const ResourceDetails = ({ details }) => {
    if(!details || (details.length === 0 || Object.keys(details).length === 0)) {
        return <div>Select a resource to view details.</div>
    }

    const accountName = Object.keys(details)[0]
    
    return (
        <div className='flex flex-col'>
            {/* this means it's a top level account */}
            {Array.isArray(details[accountName]) ? (
                <Space
                    direction='vertical'
                    size='middle'
                >
                    <span>All resources for {accountName}</span>
                    {details[accountName].map(resource => (
                        <ResourceTable 
                            key={resource.resourceId}
                            resource={resource}
                        />
                    ))}
                </Space>
            ) : (
                <ResourceTable 
                    resource={details}
                />
            )}
        </div>
    )
}
ResourceDetails.propTypes = {
    details: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}

const ResourceTable = ({ resource }) => {
    const keys = Object.keys(resource);
    const tableData = keys.map((key) => {
        let value = resource[key];

        if (Array.isArray(value)) {
            value = value.map((tag, k) => (
                <Tag key={k} bordered={false}>
                    <span className='font-mono'>{tag}</span>
                </Tag>
            ));
            value = (
                <Space direction='vertical'>
                    {value}
                </Space>
            );
        }

        return {
            key: key,
            value: value
        }
    })
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: "Value",
            dataIndex: 'value',
            key: 'value',
            
        }
    ]
    return (
        <Table 
            rowClassName="align-top"
            dataSource={tableData}
            columns={columns}
            pagination={false}
            rowKey={({ key }) => key}
        />
    )        
}
ResourceTable.propTypes = {
    resource: PropTypes.object
}