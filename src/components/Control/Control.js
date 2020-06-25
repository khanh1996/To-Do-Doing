import React, { Component } from 'react';
import Sort from './Sort';
import Search from './Search';

class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                {/* SEARCH */}
                <Search onSearch={this.props.onSearch} />
                {/* SORT */}
                <Sort onSort={this.props.onSort}/>
            </div>
        );
    }
}

export default Control;