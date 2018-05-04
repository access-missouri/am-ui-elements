import React from 'react';
import {VictoryPie, VictoryTooltip} from 'victory';

export class FinanceTypePie extends React.Component {

    constructor(props){
        super(props);

        let data = [];

        if (this.props.corp > 0){
            data.push({
                x: 'Companies',
                y: this.props.corp
            });
        }
        if (this.props.comm > 0){
            data.push({
                x: 'Committees',
                y: this.props.comm
            });
        }
        if (this.props.people > 0){
            data.push({
                x: 'People',
                y: this.props.people
            });
        }

        this.state = {
            data: data
        };
    }

    render(){
        return (
            <span>
                <VictoryPie
                    data={this.state.data}
                    innerRadius={100}
                    labelRadius={100}
                    padAngle={2}
                    labelComponent={<VictoryTooltip/>}
                    animate={{
                        duration: 2000
                    }}
                    />
            </span>
        );
    }

}