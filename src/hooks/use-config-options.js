import { useState } from "react";
import PropTypes from 'prop-types';

export const useConfigOptions = () => {
    const [options, setOptions] = useState({})

    const updateOptions = (key, value) => {
        setOptions(prevOptions => {
            return {
                ...prevOptions,
                [key]: value
            }
        })
    }

    return [options, updateOptions];
}

useConfigOptions.propTypes = {
    prefix: PropTypes.string.isRequired
}