// import requiredTags, { required_tags2 } from './required-tags';
import { required_tags2 } from './required-tags';

export const formatTagData = (jsonData) => {
    // console.log('jsonData: ', jsonData)
    let data; 
    let tagData = {}; 
    let resources;

    //see if the data can be parsed as JSON, otherwise throw an error
    try {
        data = JSON.parse(JSON.stringify(jsonData));
    } catch (e) {
        console.error("Error parsing JSON data: ", e);
    }

    // console.log('requiredTags2: ', required_tags2);

    data.map((d) => {
        const [first] = Object.keys(d);
        if(resources && !resources.includes(first)) {
            const newResources = [
                ...resources,
                first
            ]
            resources = newResources;
        }
    })

    // console.log('resources: ', resources);

    data.map(d => {
        const resourceType = d.resource_type
        const requiredTagsForResource = required_tags2[resourceType];
        const resource = d[resourceType].common
        const accountName = resource.account
        const accountId = resource.account_id
        const resourceId = resource.resource_id
        const resourceName = resource.resource_name
        const tagNames = resource.tags ? Object.keys(resource.tags) : []
        const missingTags = requiredTagsForResource.filter(tag => !tagNames.includes(tag))

        const newTagData = {
            accountName: accountName,
            accountId: accountId,
            resourceId: resourceId,
            resourceName: resourceName, 
            resourceType: resourceType,
            currentTags: tagNames,
            missingTags: missingTags,
            numMissingTags: missingTags.length,
        }

        // console.log('newTagData: ', newTagData);

        if(tagData[accountName]) {
            tagData = {
                ...tagData,
                [accountName]: [
                    ...tagData[accountName],
                    newTagData
                ] 
            }
        } else {
            tagData = {
                ...tagData,
                [accountName]: [
                    newTagData
                ]
            }
        }
        // if(tagData[first]) {
        //     tagData = {
        //         ...tagData,
        //         [first]: [
        //             ...tagData[first],
        //             newTagData
        //         ] 
        //     }
        // } else {
        //     tagData = {
        //         ...tagData,
        //         [first]: [
        //             newTagData
        //         ]
        //     }
        // }
        // console.log('tagData inside map: ', tagData);
    })
    // console.log('tagData: ', tagData)
    return tagData;
}
