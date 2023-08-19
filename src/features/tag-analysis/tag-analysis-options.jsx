import PropTypes from "prop-types";
import { HeatmapPercentSwitch } from "./heatmap-percent-switch"

export const TagAnalysisOptions = ({ options, onUpdateOptions }) => {

    const toggleShowPercentages = () => {
        onUpdateOptions('showPercentages', !options.showPercentages)
    }

    return (
        <div className="
            flex
            px-4 py-2
            justify-center
            dark:bg-slate-600
        ">
            <span />
            <span className="font-light text-xs">
                <HeatmapPercentSwitch 
                    showPercentages={options.showPercentages}
                    onTogglePercentages={toggleShowPercentages}
                />
            </span>
        </div>
    )    
}

TagAnalysisOptions.propTypes = {
    options: PropTypes.object.isRequired,
    onUpdateOptions: PropTypes.func.isRequired
}