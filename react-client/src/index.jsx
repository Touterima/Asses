import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AddPhrase from './components/AddPhrase.jsx';




import Practice from './components/Practice.jsx';
import PhraseList from './components/PhraseList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'phrases'
    };
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  render() {
    return (
      <div>
        <div className="nav">
          <span className="logo">Korean Tutor</span>
          <span className={this.state.view === 'phrases'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('phrases')}>
            Phrase List
          </span>
          <span className={this.state.view === 'practice'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('practice')}>
            Practice
          </span>
          <span className={this.state.view === 'add'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('add')}>
          Add Phrase
          </span>

        </div>

        <div className="main">
          {this.state.view === 'phrases'
            ? <PhraseList />
            : this.state.view ==='Practice'? (<Practice/>) 
            :this .state.view === 'add' ? (<AddPhrase/>)
            :null
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));