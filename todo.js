class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
        this.textId = React.createRef();
    }

    handleClickEdit = ()=>{
        this.setState({isEdit: true});
    }

    handleClickDelete = () =>{
        alert(`Pressed delete ${this.props.children}`);
        this.props.deleteTask(this.props.index);
    }

    renderView= ()=> {
        return (
            <div className='box'>
                <div>{this.props.children}</div>
                <button onClick={this.handleClickEdit} className='btn light'>Edit</button>
                <button onClick={this.handleClickDelete} className={'btn red'}>Delete</button>
            </div>
        );
    }

    handleClickSave =()=>{
        const task = this.textId.current.value;
        console.log(this.textId);
        alert(task);
        this.props.updateTask(this.props.index, task);
        this.setState({isEdit:false});
        console.log(this.props);
    }

    renderEdit = () => {
        return(
            <div className='box'>
                <textarea ref={this.textId} defaultValue={this.props.children}></textarea>
                <button className="btn success" onClick={this.handleClickSave}>Save</button>
            </div>
        );
    }



    render() {
        return (
            this.state.isEdit ? this.renderEdit() : this.renderView()

        )
    }
}

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: ["Task1","Task2","Task3"],
            isAdd: false,
        }
        this.textId = React.createRef();
    }

    handleClickAddNewTask =()=>{
        const task = this.textId.current.value;
        this.addTask(task);
        this.setState({isAdd:false});
    }


    renderNew = () => {
        return(
            <div className='box'>
                <textarea ref={this.textId} placeholder={"Write new task!"}></textarea>
                <button className="btn success" onClick={this.handleClickAddNewTask}>Save</button>
            </div>
        );
    }

    addTask = (content) => {

        this.state.tasks.push(content);
        const tasks = this.state.tasks;
        this.setState({tasks})
    }

    deleteTask = index => {
        const tasks =[...this.state.tasks];
        tasks.splice(index, 1);
        this.setState({tasks});
    }

    updateTask = (index, content) => {
        const tasks =[...this.state.tasks]
        tasks[index] = content;
        this.setState({tasks});
    }

    render () {
        return (
            <div className={"field"}>
                {this.state.tasks.map((t,i) => <Task key={i+1}
                                                     index={i}
                                                     deleteTask={this.deleteTask}
                                                     updateTask={this.updateTask}>{t}</Task>)}
                {this.state.isAdd && this.renderNew()}
                <button className={"btn new"} onClick={() => this.setState({isAdd: true}) }> Add Task</button>

            </div>


        )
    }
}

ReactDOM.render(<TaskList/>, root)
