import React, { Component } from 'react';

class TaskItem extends Component {

    onUpdate = () =>{
        this.props.onUpdate(this.props.task.id);
    }
    onDelete = () => {
        this.props.onDelete(this.props.task.id);
        // localStorage.removeItem();
    }

    onUpdateStatus = () => {
        //console.log(this.props.task.id) lấy id
        this.props.onUpdateStatus(this.props.task.id);
    }
    render() {
        var { task, index } = this.props; // task và index là 2 props truyền sang từ 1 component
        //console.log(task);
        return (
            <tr>
                <td>{index + 1}</td>
                <td>
                    {task.name}
                </td>
                <td className="text-center">
                    <span onClick={this.onUpdateStatus} className={task.status === true ? 'label label-danger cur-point' : 'label label-success cur-point'}>{task.status === true ? "Kích hoạt" : "Ẩn"}</span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick={this.onUpdate}
                    >
                        <i className="fas fa-edit mr-5"></i>Sửa
                    </button>&nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={ this.onDelete }>
                        <i className="fas fa-trash mr-5"></i>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;