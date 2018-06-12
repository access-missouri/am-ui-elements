import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import * as d3c from 'd3-collection';
import * as d3a from 'd3-array';
import * as d3NestSearch from './utils/d3-nest-search';


function daysInMonth (month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function sanitizeDateTZString(dateIn){
    let dt = new Date(dateIn);
    console.log(`${dt.getUTCFullYear()}-${dt.getUTCMonth()+1}-${dt.getUTCDate()}`);
    return `${dt.getUTCFullYear()}-${dt.getUTCMonth()+1}-${dt.getUTCDate()}`;
}

export class AMBillActionCalendar extends React.Component {
    constructor(props){
        super(props);

        // D3 can be confusing, so here's what's happening:
        // 1. We tell it we want to use D3 built in "nesting" (think pivot tables)
        // 2. We say we want to nest by the date property on each object.
        // 3. We use .rollup() to say we want the "value" attribute to be the number of objects.
        // 4. We tell d3 where to find the collection of objects.
        let nest = d3c.nest()
            .key(function(d){
                return d.date;
            })
            .rollup(function(d){
                return d.length;
            })
            .entries(this.props.actions);
        nest.forEach(function(d){
            let dt = new Date(d.key);
            // Fun fact: In JavaScript, months are apparently zero indexed.
            d.date = `${dt.getUTCFullYear()}-${dt.getUTCMonth()+1}-${dt.getUTCDate()}`;
            d.count = d.value;
        });

        let year = nest[0].date.split("-")[0];

        let monthlyNestedData = d3c.nest()
            .key(function(d){
                let dText = d.key.split("-");
                return `${dText[0]}-${parseInt(dText[1])}`;
            })
            .entries(nest);

        let min = d3a.min(monthlyNestedData, function(d){
            let dt = new Date(d.key);
            return new Date(`${dt.getUTCFullYear()}-${dt.getUTCMonth()+1}-${dt.getUTCDate()}`);
        });

        let max = d3a.max(monthlyNestedData, function(d){
            let dt = new Date(d.key);
            return new Date(`${dt.getUTCFullYear()}-${dt.getUTCMonth()+1}-${dt.getUTCDate()}`);
        });

        let months = [];

        let iter = {
            month: min.getMonth(), // Still zero indexed
            year: min.getFullYear()
        };

        while(iter.year <= max.getFullYear()){
            while((iter.year < max.getFullYear() && (iter.month <= 11))
            || (iter.month <= max.getMonth())){ // Zero indexed months!!!!

                // If it's there in the nest, gimme the values.
                // If not, give me an empty array.
                let searchResult = d3NestSearch.searchD3NestByKey(monthlyNestedData, `${iter.year}-${iter.month+1}`)
                let datArr = (searchResult ? searchResult.values : []);

                months.push({
                    // This one looks really ugly, but it's not that bad.
                    // Since the generator signposts a day late, we want to make sure we pad that out.
                    // "If we're in January, set the start to the last day of December of last year.
                    // otherwise, we can go with the end of the last month."
                    monthStart: sanitizeDateTZString(
                        (iter.month > 0 ?
                                `${iter.year}-${iter.month}-${daysInMonth(iter.month-1, iter.year)}` :
                                `${iter.year-1}-12-${daysInMonth(11, iter.year-1)}`
                        )),
                    monthEnd: sanitizeDateTZString(`${iter.year}-${iter.month + 1}-${daysInMonth(iter.month, iter.year)}`),
                    data: datArr
                });

                iter.month = iter.month + 1;
            }
            iter.year = iter.year + 1;
            iter.month = 0;
        }


        this.state = {
            nestedData: nest,
            monthlyNestedData: monthlyNestedData,
            vizStartDate: new Date(`${year}-01-01`),
            vizEndDate: new Date(`${year}-12-31`),
            months: months
        };
    }

    render(){
        return (
            <div className={"calendar-heatmap calendar-heatmap-legislative"}>
                {
                    this.state.months.map(function(month, i){
                        return (
                            <div className={"calendar-heatmap-month"}>
                                <h3>{(new Date(month.monthEnd)).toLocaleString("en-us", {month: 'long', year: 'numeric'})}</h3>
                                <CalendarHeatmap
                                    startDate={month.monthStart}
                                    endDate={month.monthEnd}
                                    values={month.data}
                                    horizontal={false}
                                    monthLabels={false}
                                />
                            </div>);
                    })
                }
            </div>
        )
    }
}