//mock
class TaskService{
    
    constructor(){
        this.tasks = [
            {id:1,description:"Tarefa 1",whenToDo:"2030-01-01",done:false},
            {id:2,description:"Tarefa 2",whenToDo:"2030-01-02",done:true},
            {id:3,description:"Tarefa 3",whenToDo:"2030-01-03",done:false}
        ]

    }
    list(){
        return this.tasks;
    }
    load(id){
        return this.tasks.filter(t=> t.id===id)[0];
    }

    delete(id){
        this.tasks = this.tasks.filter(task=> task.id !== id);
    }
    save(task) {
        if (task.id!==0) {
            this.tasks = this.tasks.map(t => task.id !== t.id ? t:task )
        }
        else {
            const ids = this.tasks.map(t => t.id);
            const max  = Math.max(...ids);
            task.id = max+1;
            this.tasks.push(task);
        }
    }

}

export default new TaskService();