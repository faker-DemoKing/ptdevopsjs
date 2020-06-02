import React from 'react';
import { Card } from 'antd';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import { http } from 'libs';

// 获取最近14天的报警
export default class AlarmTrend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            res: []
        };
    }

    componentDidMount() {
        http.get('/api/v1/home/alarm')
            .then(res => this.setState({ res }))
            .finally(() => this.setState({ loading: false }))
    }

    render() {
        const { res, loading } = this.state; // 获取res
        
        return (
            <Card loading={loading} title="报警趋势">
                <Chart height={300} data={res} padding={[10, 10, 30, 35]} forceFit>
                    <Axis name="date" /> {/* X轴 */}
                    <Axis name="value" /> {/* Y轴 */}
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="line" position="date*value" size={2} />
                    <Geom
                        type="point"
                        position="date*value"
                        size={10}
                        shape={"circle"}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                    />
                </Chart>
            </Card>
        )
    }
}
