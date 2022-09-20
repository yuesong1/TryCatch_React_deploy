import { bindActionCreators } from "redux";

const defaltState ={
    num:1
}

export default(state=defaltState,action)=>{
    //deep copy 
    let newState=JSON.parse(JSON.stringify(state))
    /*
    if(action.type=="addNum"){
        newState.num+=action.value;
        console.log(newState.num)
    }
    */
    switch(action.type){
        case 'addNum':
            newState.num+=action.value
    }
    return newState;


}