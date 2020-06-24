import React from "react"

class Test extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount (){
        fetch("https://script.google.com/macros/s/AKfycbxnbB1gBhrCiH86K6wHf3FBFw_wVBPOKK-2gHv5fmWlz-SZhxyd/exec?name=viraj&age=17")
    }
    render() {
        return (
            <div>Test div</div>
        )
    }
}

export default Test;