import PropTypes from 'prop-types';
import { 
    CarryOutOutlined, 
    // CheckOutlined, 
    // FormOutlined 
} from '@ant-design/icons';
import { Tree , Input } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { debounce } from '@utils/debounce';
import { ComponentSpinner } from '@components/spinners';

export const ResourceTree = ({ 
    resources,
    // onHandleSelectedResources,
    onHandleResourceDetails
}) => {
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [treeData, setTreeData] = useState([]);
    
    const formattedTreeData = useMemo(() => 
        formatTreeData(resources), [resources])

    const { Search } = Input;

    useEffect(() => {
        if(searchValue==='') {
            setTreeData(formattedTreeData);
        } else {
            const newTreeData = filterTreeData(formattedTreeData, searchValue);
            setTreeData(newTreeData);
        }
        setLoading(false)
        const rt = document.getElementById('resourcetree')
        if(rt) {
            rt.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "nearest"
            })
        }
    }, [searchValue, formattedTreeData])

    const handleSearchValueChange = (e) => {
        const { value } = e.target;
        setSearchValue(value);
    }

    const debouncedHandleSearchValueChange = 
        debounce(handleSearchValueChange, 500);

    if(!loading && (treeData[0].key === "EMPTY")) {
        return <div>Select a cell to view resource data.</div>
    }

    const missingTags = (
        !loading &&
        (treeData.length > 0) && 
        (treeData[0].children.length > 0)
    )

    if(loading) {
        return <ComponentSpinner />
    }

    return (
        <div>
            <Search 
                className='mb-1'
                placeholder='Search'
                onChange={debouncedHandleSearchValueChange}
            />

            {!missingTags && (
                <>
                    <div className='text-sm'>{treeData[0].title}</div>
                    <div className='text-sm font-light'>(No Resources Missing Tags)</div>
                </>
            )}
            {missingTags && (
                <Tree
                    className='bg-inherit text-inherit'
                    showLine={true}
                    showIcon={false}
                    onSelect={(resourceId) => onHandleResourceDetails(treeData[0].title, resourceId[0])}
                    defaultExpandAll={true}
                    autoExpandParent={true}
                    treeData={treeData}
                    multiple={false}
                />
            )}
        </div>
    )
}

ResourceTree.propTypes = {
    resources: PropTypes.object,
    onHandleResourceDetails: PropTypes.func
}

const filterTreeData = (treeData, searchTerm) => {
    const {title, key, children} = treeData[0]
    return [{
        title: title,
        key: key,
        children: children.filter(r => 
            r.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }]
}

const formatTreeData = (resources) => {

    if(Object.keys(resources).length === 0) {
        return [{
            title: '',
            key: 'EMPTY',
            children: []
        }]
    }
    
    const parentName = Object.keys(resources)[0]

    if(resources[parentName].length === 0) {
        return [{
            title: parentName,
            key: parentName,
            icon: <CarryOutOutlined />,
            children: []
        }]
    }

    return [{
        title: parentName,
        key: parentName,
        children: resources[parentName].map(r => {
            return {
                title: `${r.resourceName} (${r.resourceType})`,
                key: r.resourceId,
                icon: <CarryOutOutlined />,
                type: r.resourceType
            }
        })
    }]
}