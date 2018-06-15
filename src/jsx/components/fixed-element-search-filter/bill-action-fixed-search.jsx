import React from 'react';
import {AMFixedElementSearchFilter} from "./fixed-element-search-filter";

export class AMBillActionSearchFilter extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <span>
                <AMFixedElementSearchFilter
                    target={("actions-list-" + this.props.bill_id)}
                    filterElementsOfType={"tr"}
                />
            </span>
        );
    }
}