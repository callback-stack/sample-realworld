const {createElement: h, Component} = require("react");

function redirect(location) {
    class RedirectRoute extends Component {
        constructor(props, context) {
            super(props, context);

            props.history.push(location);
        }
        render() {
            return null;
        }
    }

    return (props) => h(RedirectRoute, props);
}
exports.redirect = redirect;
