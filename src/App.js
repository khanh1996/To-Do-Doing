import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control/Control';
import TaskList from './components/TaskList';
import _ from 'lodash'; // import tất cả thư viện trong lodash

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : [], // có id, name, status
      isDisplayForm : false,
      taskEditing : null,
      filter : {
        name : '',
        status : -1
      },
      keyword : '',
      sortBy : 'name',
      sortValue : 1
    }
  }
  // hàm này sẽ chạy khi refesh lại web
  componentWillMount(){
    // kiểm tra dữ liệu có k?
    if(localStorage && localStorage.getItem('tasks')){
      // đưa dữ liệu string về object
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      });
    }
  }
  // khởi tạo data
  onGenerateData = () => {
    var tasks = [
      {
        id :  this.generateID(),
        name : "Học react js",
        status : true
      },
      {
        id : this.generateID(),
        name : "Đi bơi",
        status : false
      },
      {
        id : this.generateID(),
        name : "Ngủ",
        status : true
      }
    ];
    this.setState({
      tasks : tasks
    });
    //localStorage.setItem('tasks', tasks);// lưu dữ liệu vào localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks)); // JSON.stringify(tasks) chuyển từ object về chuỗi localStorage
  }
  
  // tạo các chuỗi random
  partRandownID(){
    return Math.floor((1+Math.random() * 0x10000)).toString(16).substring(1);
  }
  // tạo id cho task
  generateID(){
    return this.partRandownID() + this.partRandownID() + '-' + this.partRandownID() + '-' + this.partRandownID() + '-' + this.partRandownID() + '-' + this.partRandownID() + '-' + this.partRandownID() + this.partRandownID() + this.partRandownID() ;
  }

  // hiển thị form thêm công việc
  onDisplayForm = () => {
    //console.log('onDisplayForm');
   
    if(this.state.isDisplayForm === true && this.state.taskEditing !== null){
       // trường hợp form đang mở mà chuyển từ edit sang add
      this.setState({
        isDisplayForm : true,
        taskEditing : null
      });
    }
    else{
      // trường hợp form đã đóng thì thành mở và mở thì thành đóng
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditing : null
      });
    }
  }

  //  close form 
  onCloseForm = () => {
    this.setState({
      isDisplayForm : false
    });
  }

  //  open form 
  onOpenForm = () => {
    this.setState({
      isDisplayForm : true
    });
  }

  onHandleSubmit = (data) => {
    //data là task mà muốn thêm vào dữ liệu
    //console.log(data);
    var arrTasks = this.state.tasks; // dữ liệu ban đầu
    // phần thêm task
    if(data.id === ""){
      data.id = this.generateID(); // tạo id cho task
      arrTasks.push(data); // thêm task mới vào mảng 
    }
    else{
      // phần sửa task
      var index = this.findIndex(data.id); // tìm ra vị trí cần update
      arrTasks[index] = data;
      // console.log(index);
      // console.log(arrTasks[index]);
    }
    //console.log(arrTasks);
    // ghi mảng vào state
    this.setState({
      tasks : arrTasks,
      taskEditing : null
    });
    //console.log(this.state);
    localStorage.setItem('tasks', JSON.stringify(arrTasks)); // lưu dữ liệu vào localStorage
    
  }

  // lấy id của từng id truyền từ TaskItem
  onUpdateStatus = (id) => {
    var tasks = this.state.tasks;
    //console.log(tasks);  
    //var index = this.findIndex(id); // trả về vị trí cần tìm

    // -------------------------------------------
    // sử dụng thư viện lodash để viết 
    var index = _.findIndex(tasks, (task) => {
      return task.id === id;
    });
    //------------------------------------------

    //console.log(index);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      // cập nhật lại state
      this.setState({
        tasks : tasks
      });
      // lưu dữ liệu vào localStorage
      localStorage.setItem("tasks",JSON.stringify(tasks));
    }
  }
  onDelete = (id) => {
    console.log(id);
    var tasks = this.state.tasks;
    //console.log(tasks);  
    var index = this.findIndex(id); // trả về vị trí cần tìm
    console.log(index);
    if(index !== -1){
      tasks.splice(index,1); // hàm này lấy ra 1 phần từ tại vị trí index trong mảng tasks
      // cập nhật lại state
      this.setState({
        tasks : tasks
      });
      console.log(tasks);
      // lưu dữ liệu vào localStorage
      localStorage.setItem("tasks",JSON.stringify(tasks));
    }
    this.onCloseForm(); // đóng form thêm khi xóa
  }
  // tìm vị trí của status cần thay đổi
  findIndex = (id) => {
    var tasks = this.state.tasks;
    var result = -1;
    tasks.forEach((task,index) => {
      if(task.id === id){
        result = index;
      }
    });
    return result;
  }
  // cập nhật công việc
  onUpdate = (id) => {
    //console.log(id);
    this.onOpenForm(); // khi click vào input sửa thì mở form sử ra
    let { tasks } = this.state; // lấy tát cả các dữ liệu
    //console.log(tasks);
    let index = this.findIndex(id); // tìm phần tử có id
    //console.log(index);
    let taskEditing = tasks[index]; // tìm dc phần tử có index là
    //console.log(taskEditing);
    this.setState({
      taskEditing : taskEditing
    });
    //console.log(this.state);
    this.onOpenForm();
  }

  onFilter = (filterName, filterStatus) => {
    // console.log(filterName + ' - ' + filterStatus); 
    // console.log(typeof filterName + ' - ' + typeof parseInt(filterStatus));
    filterStatus =  parseInt(filterStatus) // chuyển về kiểu number
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    });
    //console.log(this.state.filter);
  }

  // tìm kiếm 
  onSearch = (keyword) => {
    //console.log(keyword);
    this.setState({
      keyword : keyword
    });
    
  }
  // sắp xếp bySort là tên kiểu săp xếp, byValue là giá trị sắp xếp. VD: 1 là A -> Z, 2 là Z -> A
  // hàm sort đầu tiên là do bất đồng bộ trong js,hàm console.log sẽ được ưu tiên thực hiện trước hàm setSate cho nên nếu các bạn muốn tiếp tục làm theo hướng như này thì thêm async await như sau :
  onSort = async (sortBy,sortValue) =>{
    //console.log(bySort + " = " + byValue);
    await this.setState({
            sortBy : sortBy,
            sortValue : sortValue
          });
    //console.log(this.state.sortBy + " = " + this.state.sortValue);
  } 
  
  render() {
    // Khởi tạo các biến state
    var {tasks, isDisplayForm, taskEditing, filter , keyword ,sortBy, sortValue} = this.state; // giống như var tasks = this.state.tasks
    
    // kiểm tả filter
    //console.log(filter.name);
    // hàm filter giốn như map nhưng nó trả về true, false, nếu tìm đúng thì trả về true, tìm sai thì trả về false
    if(filter){
      if(filter.name){ // kiểm tra null, khác undefiend, !== 0
        tasks = tasks.filter((task) => {
          // hàm indexOf tìm ký tự đầu tiên trong chuỗi trả về số 
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      // kiểm tra phầm trạng thái
      tasks = tasks.filter((task) => {
        if(filter.status === -1){
          // trường hợp có tất cả
          return task;
        }
        else{
          //console.log(filter.status === 1 ? true : false);
          // trường hợp 1 or 0
          if(filter.status === 1){
            // trả về status kích hoạt
            //console.log('th1 - ' + task.status + ' - ' + filter.status);
            let result = task.status === true;
            return result;
           
          }else{
            // trả về status ẩn
            //console.log('th2 - ' + task.status + ' - ' + filter.status);
            let result = task.status === false;
            return result;
          }
        }
      });
    }
    // tìm kiếm theo keyword
    if(keyword){
      tasks = tasks.filter( (task,index) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;  // trả về true or false
      });
      //console.log(tasks);
    }
    //--------------------------------------
    // sử dụng thư viện lodash để viết 
    // if(keyword){
    //   tasks = _.filter(tasks, (task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   });
    // }
    //--------------------------------------

    // chức năng sắp xếp
    //  Có 4 TH : name : 1, name : -1, sattus : 1, status : -1
    // 1 là tăng dần, -1 là giảm dần
    if(sortBy && sortBy === "name"){
      tasks.sort((a, b)=>{
        if(a.name > b.name ){
          return sortValue;
        }else if (a.name < b.name){
          return -sortValue;
        }else{
          return 0;
        }
        //console.log(a.name > b.name); so sánh nếu ký tự đầu tiên xếp theo bảng unicode
      });
    }else{
      // trường hợp sort theo trạng thái
      tasks.sort((a, b)=>{
        if(a.status > b.status ){
          return -sortValue;
        }else if (a.status < b.status){
          return sortValue;
        }else{
          return 0;
        }
        //console.log(a.name > b.name); so sánh nếu ký tự đầu tiên xếp theo bảng unicode
      });
    }



    // tạo ra 1 element để hiện thị taskForm
    var elementTaskForm = isDisplayForm ?  <TaskForm  onCloseForm={ this.onCloseForm }  onHandleSubmit={ this.onHandleSubmit } taskEditing={ taskEditing } /> : "";
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr/>
        </div>
        
        <div className="row">
          <div className={isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : " "}>
            {/* ADD TASK */}
            {elementTaskForm}
            
          </div>
          <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={ this.onDisplayForm }
              >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <button type="button" className="btn btn-danger ml-5" onClick={ this.onGenerateData }>
            <span className="fas fa-database mr-5"></span>Generate Data
            </button>
            {/* SEARCH - SORT */}
            <Control onSearch={ this.onSearch }  onSort={this.onSort}/>
            {/* LIST */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {/* TABLE */}
                <TaskList tasks={tasks} onUpdateStatus={ this.onUpdateStatus } onDelete={ this.onDelete } onUpdate={this.onUpdate} onFilter = { this.onFilter } /> {/* thay vì tasks= {this.state.tasks} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;