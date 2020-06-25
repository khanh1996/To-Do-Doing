import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1 // -1 all, 0 ẩn,1 kích hoạt
        }
    }
    // lấy giá trị các ô input
    onHandleChange = (event) => {
        var target = event.target; // lấy ra các event target
        var name = target.name; // lấy ra name của ô input
        var value = target.type === "checkbox" ? target.checked : target.value ; // lấy ra value của từng ô input, trường hợp là checkbox thì phải lấy target.checked
        this.props.onFilter(
            name === "filterName" ? value : this.state.filterName,
            name === "filterStatus" ? value : this.state.filterStatus
        );
        this.setState({
            [name] : value // xét giá trị vào state
        });
        
    }
    

    render() {
        var tasks = this.props.tasks
        // var { tasks } = this.props // var tasks = this.props.tasks
        var elementTasks = tasks.map((task,index) => {
            //console.log(task);
            return <TaskItem key={task.id} index={index} task={task} onUpdateStatus={ this.props.onUpdateStatus } onDelete={this.props.onDelete} onUpdate={this.props.onUpdate}  />
        }); 
        return (
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td>
                    <input 
                        type="text"
                        className="form-control"
                        name="filterName"
                        value = { this.state.filterName }
                        onChange = { this.onHandleChange }
                        />
                    </td>
                    <td>
                    <select 
                        name="filterStatus" 
                        className="form-control"
                        value = { this.state.filterStatus }
                        onChange = { this.onHandleChange }
                    >
                        <option value={-1}>Tất cả</option>
                        <option value={0}>Ẩn</option>
                        <option value={1}>Kích hoạt</option>
                    </select>
                    </td>
                    <td>
                    
                    </td>
                </tr>

                {elementTasks}
                </tbody>
            </table>
        );
    }
}

export default TaskList;