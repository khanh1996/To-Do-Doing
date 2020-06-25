import React, { Component } from 'react';

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy : '',
            sortValue : 1
        }
    }
    onSort = (sortBy,sortValue) => {
        //console.log(sortBy + ' - ' + sortValue);
        this.props.onSort(sortBy,sortValue);
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
          });
        //console.log(this.state);
    }
    render() {
        var {sortBy , sortValue} = this.state;
        console.log(sortBy);
        console.log(sortValue);
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                <button 
                    type="button" 
                    className="btn btn-primary dropdown-toggle"
                    id="dropdownMenu1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
                    Sắp xếp <i className="fas fa-caret-square-down pl-5 "></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick= { () => this.onSort('name',1) }>
                            <a role="button" >
                                <i className="fas fa-sort-alpha-down mr-5"></i>
                                Tên A-Z
                                <i className={(sortBy ==="name" && sortValue === 1) ? "fas fa-check ml-5" : '' }></i>
                                
                            </a>
                        </li>
                        <li onClick= { () => this.onSort('name',-1) }>
                            <a  role="button" >
                                <i className="fas fa-sort-alpha-up mr-5"></i>
                                Tên Z-A
                                <i className={(sortBy ==="name" && sortValue === -1) ? "fas fa-check ml-5" : '' }></i>
                                
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick= { () => this.onSort('status',1) }>
                            <a role="button">
                                Trạng thái kich hoạt
                                <i className={(sortBy ==="status" && sortValue === 1) ? "fas fa-check ml-5" : '' }></i>
                            </a>
                        </li>
                        <li onClick= { () => this.onSort('status',-1) }>
                            <a role="button">
                                Trạng thái Ẩn
                                <i className={(sortBy ==="status" && sortValue === -1) ? "fas fa-check ml-5" : '' }></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sort;