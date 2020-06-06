const e = React.createElement;

const Header = () => <div className='header'>
    <img src='favicons/android-chrome-192x192.png' className='logo'/>
    <div className='content'>
        <h2>Hopf Fibration Visualization</h2>
        <div className='subtitle'>Made with {'<3'} by Samuel J. Li</div>
    </div>
</div>

class Instructions extends React.PureComponent {
    state = {shown: true};

    render() {
        return <React.Fragment>
            <div id='instructions-container' className={this.state.shown ? 'visible' : 'hidden'}><div className='instructions'>
                <Header/>
                <p className='mobile'>Tap on the sphere to add points. Drag to move the camera, and pinch to zoom.</p>
                <p className='desktop'>Click on the sphere to add points. Drag to move the camera, and scroll to zoom.</p>
                <p>The main view shows the fibers over the selected points under the Hopf map, stereographically projected into three-space.</p>
                <button className='accept' onClick={() => this.setState({shown: false})}>Got it!</button>
            </div></div>
            <button id='help' onClick={() => this.setState({shown: true})}>?</button>
        </React.Fragment>;
    }
}

const domContainer = document.querySelector('#react');
ReactDOM.render(e(Instructions), domContainer);
