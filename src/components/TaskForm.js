import React, { Component } from 'react';
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : "",
      name : "",
      status : false
    }
  }
  // khi thực hiện gắn 1 component thì hàm sẽ dc thực thi, nhưng chỉ thực thi duy nhất 1 lần khi form đã mở
  componentWillMount = () => {
    //console.log(this.props.taskEditing);
    if(this.props.taskEditing){
      this.setState({
        id : this.props.taskEditing.id,
        name : this.props.taskEditing.name,
        status : this.props.taskEditing.status
      });
    }
  }
  // thực thi khi truyền
  componentWillReceiveProps(nextProps){
    //console.log(nextProps);
    // nextProps là chả về tất cả các props trong 1 component
    if(nextProps && nextProps.taskEditing){
      this.setState({
        id : nextProps.taskEditing.id,
        name : nextProps.taskEditing.name,
        status : nextProps.taskEditing.status
      });
    }else if( nextProps && nextProps.taskEditing === null ){
      // reset giá trị form đã dc mở, có nghĩa là chuyển sửa thành thêm
      //console.log("sửa -> thêm");
      this.setState({
        id : "",
        name : "",
        status : false
      });
    }
    
  }

  // lấy sự kiện chang ở ác ô input
  onHandleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    // ép kiểu chuỗi thành boolean 
    //console.log(name);
    if(name === "status"){
      if(value === "true"){
        value = true;
      }else{
        value = false;
      }
    }
    

    this.setState({
      [name] : value
    });
  }
  // thực hiện submit form
  onHandleSubmit = (event) => {
    event.preventDefault(); // ngăn không cho submit
    this.props.onHandleSubmit(this.state); // chuyền sang component cha
    // sau khi submit thì nó xóa dữ liệu đã nhập ở form và  sẽ đóng form lại
    this.onClear()
    this.onCloseForm();

  }

  // truyền onclick sang app
  onCloseForm = (param) => {
    this.props.onCloseForm(param);
  }

  onClear = () => {
    this.setState({
      name : "",
      status : false
    });
    // sau khi hủy bỏ thì sẽ đóng form lại
    this.onCloseForm();
  }
    render() {
      var { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    {id !== '' ? "Cập Nhật Công Việc" : "Thêm Công việc"}
                    
                    <button 
                      type="button" 
                      className="bg-bor-transparent text-right"
                      onClick={ this.onCloseForm }
                      >
                        <i className="fas fa-times-circle"></i>
                    </button>
                  </h3>
                </div>
                <div className="panel-body">
                  {/* FORM */}
                  <form onSubmit = {this.onHandleSubmit }>
                    <div className="form-group">
                      <label >Tên : </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        value={this.state.name}
                        onChange={this.onHandleChange}
                        />
                    </div>
                    <label >Trạng thái : </label>
                   <select 
                      name="status" 
                      className="form-control"
                      value={this.state.status}
                      onChange={this.onHandleChange}

                      >
                     <option value={true}> Kích hoạt</option>
                     <option value={false}> Ẩn</option>
                   </select> <br></br>
                   
                    <button type="submit" className="btn btn-warning">
                      <span className="fa fa-plus mr-5"></span>Lưu lại
                    </button> &nbsp;

                    <button 
                      type="button" 
                      className="btn btn-danger"
                      onClick={ this.onClear }
                      >
                      <i className="fas fa-times mr-5"></i>Hủy bỏ
                    </button>
                  </form>
                  
                </div>
            </div>
        );
    }
}

export default TaskForm;