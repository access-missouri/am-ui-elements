import React from 'react';
import {debounce} from "../utils/debounce";
import {getRepresentationArrayFromTypeWithin} from "../utils/dom-toolkit/rep-array-type-within";


export class AMFixedElementSearchFilter extends React.Component {
    constructor(props){
        super(props);

        this.debouncedRunFilter = debounce(this.runFilter, 250);

        this.state = {};
    }


    componentDidMount(){
        let targetDOMElement = document.querySelector(`#${this.props.target}`);
        let filterTargetsArray = getRepresentationArrayFromTypeWithin(this.props.filterElementsOfType, targetDOMElement);

        this.setState({
            targetDOMElement: targetDOMElement,
            filterTargetsArray: filterTargetsArray
        })
    }

    runFilter(){
        let phrase = this.refs.searchQuery.value;
        for (let el of this.state.filterTargetsArray){
            el.hideOnlyIfNotContains(phrase);
        }
    }

    render() {
        return (
          <div className="amui-fixed-search-filter">
              <input type="text"
                     name="searchQuery"
                     ref="searchQuery"
                     placeholder={"Filter"}
                     onKeyDown={this.debouncedRunFilter.bind(this)}
                     />
          </div>
        );
    }
}