var rawexport=[];


function toJSONString( form ) {
    let obj = {};
    let elements = form.querySelectorAll( "input, select, textarea" );
    console.log(elements);
    for( var i = 0; i < elements.length; ++i ) {
        let element = elements[i];
        let name = element.id;
        let value = element.value;

        if( name ) {
            console.log(name);
            obj[ name ] = value;
        }
    }
    return JSON.stringify( obj );
}
class ManageExport extends React.Component{
    constructor(props) {
        super(props);
    }
}