import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword : ''
    }
  }
  // thực hiện click nút search
  onSearch = () => {
    //console.log(this.state.keyword);
    this.props.onSearch(this.state.keyword);
  }
  // xử lý ô input
  onHandleChange = (event) =>{
    var target =  event.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name] : value
    });
  }
  
  render() {
      return (
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control"
                      name="keyword"
                      placeholder="Nhập từ khóa"
                      defaultValue={ this.state.keyword }
                      onChange= {this.onHandleChange}
                    />
                    <span className="input-group-btn">
                      <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={ this.onSearch } 
                      >
                        <span className="fa fa-search mr-5"></span>Tìm
                      </button>
                    </span>
                  </div>
            </div>
      );
  }
}

export default Search;