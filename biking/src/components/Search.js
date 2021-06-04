import React from "react";
import axios from 'axios';


class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value : " ",
            result : []
        };
    this.Search_result = this.Search_result.bind(this);
    }
    componentDidMount() {
        console.log("ok");
        this.handleChange(this.props)
        this.Search_result()
    };
    handleChange(e){
        this.setState({
            value: e
        });
    };

    Search_result(){
        axios.get('http://localhost:3001/Graph')
            .then((response) => {
            const result = response['data'];
            const label_result =[];
            //console.log(result[0]['StationName']);
            for (var i in result){
                if(result[i]['StationName'].indexOf(this.state.value) !== -1){
                    label_result.push(result[i]['StationName']);
                }
            }
            this.setState({result : label_result})
      })
      //.then( response => { console.log(response)})
      .catch( response => { console.log(response)});
      //console.log(this.state.labels);
    }
    render() {
        return(
            <div>
                {this.state.result}
            </div>
        );
    }
};

/*
function Search(input){
    axios.get('http://localhost:3001/Graph')
        .then((response) => {
        const result = response['data'];
        const label_result =[];
        //console.log(result[0]['StationName']);
        for (var i in result){
            if(result[i]['StationName'].indexOf(input) !== -1){
                label_result.push(result[i]['StationName']);
            }
        }
        })
        //.then( response => { console.log(response)})
        .catch( response => { console.log(response)});
        //console.log(this.state.labels);
    return(
        <div>
            {this.label_result}
        </div>
    );
}
*/
export default Search;