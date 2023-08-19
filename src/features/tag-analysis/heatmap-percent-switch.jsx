import PropTypes from "prop-types";
import { Space, Switch } from 'antd';

export const HeatmapPercentSwitch = ({ showPercentages, onTogglePercentages }) => {
    return (
        <>
            <Space direction="verticle">
                <span className="text-base font-semibold text-xl" style={{ fontFamily: 'Inter' }}>Show Percentages</span>
                <Switch 
                    className="
                        bg-slate-100	
                        dark:bg-slate-500
                    "
                    style={{ transform: [{ scaleX: 1.78 }, { scaleY: 1.78 }] }}

                    onClick={onTogglePercentages}
                    checked={showPercentages}
                />
            </Space>
        </>
    )
}

HeatmapPercentSwitch.propTypes = {
    showPercentages: PropTypes.bool,
    onTogglePercentages: PropTypes.func
}