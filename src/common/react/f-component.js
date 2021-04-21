const React = require("react");
const {addRemove} = require("../utils/collections");

class FComponent extends React.Component {

    constructor(props, context, updater) {
        super(props, context, updater);

        this.onUnmounts = [];
        this.onChangeds = [];
        this.onMounts = [];
        this.mounted = false;

        this.onMount = addRemove(this.onMounts);
        this.onUnmount = addRemove(this.onUnmounts);
        this.onChanged = addRemove(this.onChangeds);
    }

    componentDidMount() {
        this.mounted = true;
        this.onMounts.forEach((l)=> l());
    }

    componentWillUnmount() {
        this.mounted = false;
        this.onUnmounts.forEach((l)=> l());
    }

    componentDidUpdate(prevProps) {
        this.onChangeds.forEach((l)=> l(prevProps));
    }

    setState(newState, cb) {
        if (this.mounted) {
            super.setState(newState, cb);
        } else {
            this.state = Object.assign(this.state, newState);
            cb && cb();
        }
    }

    forceUpdate() {
        if (this.mounted) {
            super.forceUpdate();
        }
    }

    onChanged1(f) {
        const done = f();
        if (done) {
            return;
        }

        const removeListener = this.onChanged(() => {
            const done = f();
            if (done) {
                removeListener();
            }
        });
    };
}
exports.FComponent = FComponent;
