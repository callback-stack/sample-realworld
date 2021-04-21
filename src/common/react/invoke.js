const {FComponent} = require("./f-component");

class Invoke extends FComponent {
    constructor(props, context) {
        super(props, context);

        props.fn && props.fn(() => this.props.props);

        if (props.onMounted) {
            this.onMount(() => {
                setTimeout(() => {
                    this.props.onMounted(() => this.props.props);
                }, 0);
            });
        }
    }

    render() {
        const {next} = this.props;
        return next ? next() : null;
    }
}
exports.Invoke = Invoke;
exports.Invoke1 = Invoke;