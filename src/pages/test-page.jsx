// import { TestMap } from "@features/test"
import Highcharts from 'highcharts'
import HighchartsReact from "highcharts-react-official";

const options = {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'My chart'
    },
    series: [
        {
            data: [1, 2, 1, 4, 3, 6]
        }
    ]
};
export const TestPage = () => {
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            {/* TEST */}
        </div>
    )
    // return (
    //     <div className="flex flex-col divide-y-4">
    //         {/* <TestMap /> */}
    //         TEST2
    //     </div>
    // )
}